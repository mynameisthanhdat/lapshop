import React, { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler, FieldArrayPath } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export enum CategoryEnum {
  OFFICE = "OFFICE",
  GAMING = "GAMING",
  STUDENT = "STUDENT",
  DESIGN = "DESIGN",
}

/** ==== Schema & Types ==== */
export const productSchema = z.object({
  name: z.string().min(2, "Tên tối thiểu 2 ký tự"),
  thumbnail: z.string().url("Thumbnail phải là URL hợp lệ"),
  images: z.array(z.string().url("Mỗi ảnh phải là URL hợp lệ")).min(1, "Cần ít nhất 1 ảnh"),
  discount: z.number().min(0, "Tối thiểu 0%").max(100, "Tối đa 100%").default(0),
  price: z.number().positive("Giá phải > 0"),
  oldPrice: z
    .number()
    .optional()
    .nullable()
    .transform(v => (v === null ? undefined : v))
    .refine(v => v === undefined || v > 0, { message: "oldPrice phải > 0" }),
  isHot: z.boolean().default(false),
  specs: z.object({
    cpu: z.string().optional(),
    ram: z.string().optional(),
    storage: z.string().optional(),
    gpu: z.string().optional(),
  }),
  brand: z.string().min(1, "Chọn thương hiệu"),
  category: z.nativeEnum(CategoryEnum).default(CategoryEnum.OFFICE),
  quantity: z.number().int().min(0, "Số lượng không âm"),
});

export type ProductFormValues = z.input<typeof productSchema>;

/** Dữ liệu để Edit (nếu có) */
export type ProductItem = ProductFormValues;

type Props = {
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
  item?: ProductItem; // có -> Edit, không -> Create
  brands?: string[];
  categories?: Array<z.infer<typeof productSchema.shape.category>>;
};

/** ==== Default values ==== */
const defaultValues: ProductFormValues = {
  name: "",
  thumbnail: "",
  images: [""],
  discount: 0,
  price: 0,
  oldPrice: undefined,
  isHot: false,
  specs: { cpu: "", ram: "", storage: "", gpu: "" },
  brand: "",
  category: CategoryEnum.OFFICE,
  quantity: 0,
};

/** Chuẩn hoá dữ liệu item sang ProductFormValues an toàn */
const mapFromItem = (item: ProductItem): ProductFormValues => {
  const allowedCats = ["OFFICE", "GAMING", "STUDENT", "DESIGN"] as const;
  const category = allowedCats.includes(item.category as any)
    ? (item.category as (typeof allowedCats)[number])
    : "OFFICE";

  return {
    name: item.name ?? "",
    thumbnail: item.thumbnail ?? "",
    images: Array.isArray(item.images) && item.images.length ? item.images : [""],
    discount: typeof item.discount === "number" ? item.discount : 0,
    price: typeof item.price === "number" ? item.price : 0,
    oldPrice: item.oldPrice ?? undefined,
    isHot: Boolean(item.isHot),
    specs: {
      cpu: item.specs?.cpu ?? "",
      ram: item.specs?.ram ?? "",
      storage: item.specs?.storage ?? "",
      gpu: item.specs?.gpu ?? "",
    },
    brand: item.brand ?? "",
    category: category as CategoryEnum,
    quantity: typeof item.quantity === "number" ? item.quantity : 0,
  };
};

/** ==== Component ==== */
export const ProductForm: React.FC<Props> = ({
  onSubmit,
  item,
  brands = ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI", "Other"],
  categories = ["OFFICE", "GAMING", "STUDENT", "DESIGN"],
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
    mode: "onBlur",
  });

  
const { fields, append, remove, replace } =
useFieldArray<ProductFormValues, FieldArrayPath<ProductFormValues>>({
  control,
  name: "images" as FieldArrayPath<ProductFormValues>,
});

  // Load dữ liệu Edit
  useEffect(() => {
    if (item) {
      const mapped = mapFromItem(item);
      reset(mapped);
      replace(mapped.images);
    } else {
      reset(defaultValues);
      replace(defaultValues.images);
    }
  }, [item, reset, replace]);

  // Tính giá sau giảm để hiển thị
  const price = watch("price");
  const discount = watch("discount");
  const discountedPrice =
    typeof price === "number" && typeof discount === "number"
      ? Math.round(price * (1 - discount / 100))
      : 0;

  const onSubmitForm: SubmitHandler<ProductFormValues> = async (values) => {
    const payload: ProductFormValues = {
      ...values,
      images: values.images.map((u) => u.trim()),
      thumbnail: values.thumbnail.trim(),
      brand: values.brand.trim(),
    };
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left */}
      <div className="space-y-4">
        <div>
          <label className="font-medium">Tên sản phẩm</label>
          <input className="border rounded px-3 py-2 w-full" {...register("name")} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="font-medium">Thumbnail (URL)</label>
          <input className="border rounded px-3 py-2 w-full" {...register("thumbnail")} />
          {errors.thumbnail && <p className="text-red-600 text-sm">{errors.thumbnail.message}</p>}
        </div>

        <div>
          <label className="font-medium">Hình ảnh (URLs)</label>
          <div className="space-y-2">
            {fields.map((f, idx) => (
              <div key={f.id} className="flex gap-2">
                <input
                  className="border rounded px-3 py-2 w-full"
                  {...register(`images.${idx}` as const)}
                />
                <button
                  type="button"
                  className="px-3 py-2 border rounded"
                  onClick={() => remove(idx)}
                  disabled={fields.length === 1}
                >
                  Xoá
                </button>
              </div>
            ))}
            <button type="button" className="px-3 py-2 border rounded" onClick={() => append("")}>
              + Thêm ảnh
            </button>
          </div>
          {errors.images && (
            <p className="text-red-600 text-sm">
              {errors.images.message?.toString() ||
                (Array.isArray(errors.images) && errors.images[0]?.message?.toString())}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="font-medium">Giá (VND)</label>
            <input
              type="number"
              className="border rounded px-3 py-2 w-full"
              {...register("price", {
                valueAsNumber: true,
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
            />
            {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
          </div>
          <div>
            <label className="font-medium">Giảm (%)</label>
            <input
              type="number"
              className="border rounded px-3 py-2 w-full"
              {...register("discount", {
                valueAsNumber: true,
                setValueAs: (v) => (v === "" ? 0 : Number(v)),
              })}
            />
            {errors.discount && <p className="text-red-600 text-sm">{errors.discount.message}</p>}
          </div>
          <div>
            <label className="font-medium">Giá cũ (VND)</label>
            <input
              type="number"
              className="border rounded px-3 py-2 w-full"
              {...register("oldPrice", {
                valueAsNumber: true,
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
            />
            {errors.oldPrice && <p className="text-red-600 text-sm">{errors.oldPrice.message}</p>}
          </div>
        </div>

        <div>
          <label className="font-medium">Số lượng</label>
          <input
            type="number"
            className="border rounded px-3 py-2 w-full"
            {...register("quantity", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? 0 : Number(v)),
            })}
          />
          {errors.quantity && <p className="text-red-600 text-sm">{errors.quantity.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isHot" {...register("isHot")} />
          <label htmlFor="isHot">Sản phẩm nổi bật (isHot)</label>
        </div>
      </div>

      {/* Right */}
      <div className="space-y-4">
        <div>
          <label className="font-medium">Thương hiệu</label>
          <select className="border rounded px-3 py-2 w-full" {...register("brand")}>
            <option value="">-- Chọn brand --</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.brand && <p className="text-red-600 text-sm">{errors.brand.message}</p>}
        </div>

        <div>
          <label className="font-medium">Danh mục</label>
          <select className="border rounded px-3 py-2 w-full" {...register("category")}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-600 text-sm">{String(errors.category.message)}</p>}
        </div>

        <fieldset className="border rounded p-3">
          <legend className="font-medium">Thông số (specs)</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="font-medium">CPU</label>
              <input className="border rounded px-3 py-2 w-full" {...register("specs.cpu")} />
            </div>
            <div>
              <label className="font-medium">RAM</label>
              <input className="border rounded px-3 py-2 w-full" {...register("specs.ram")} />
            </div>
            <div>
              <label className="font-medium">Storage</label>
              <input className="border rounded px-3 py-2 w-full" {...register("specs.storage")} />
            </div>
            <div>
              <label className="font-medium">GPU</label>
              <input className="border rounded px-3 py-2 w-full" {...register("specs.gpu")} />
            </div>
          </div>
        </fieldset>

        <div className="bg-gray-50 rounded p-3">
          <div className="text-sm text-gray-700">
            Giá sau giảm (xem trước):{" "}
            <b>
              {Number.isFinite(discountedPrice)
                ? discountedPrice.toLocaleString("vi-VN")
                : "-"}
            </b>{" "}
            VND
          </div>
        </div>

        {/* Nút submit + điền mẫu nhanh */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang lưu..." : item ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}
          </button>

          {!item && (
            <button
              type="button"
              className="px-4 py-2 rounded border"
              onClick={() => {
                // Auto-fill bằng mẫu bạn đưa trong câu hỏi
                const sample: ProductFormValues = {
                  name: "Apple MacBook Air M2 2024",
                  thumbnail:
                    "https://cdn2.cellphones.com.vn/insecure/rs:fill:58:58/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/n/vn0d33_1.jpg",
                  images: [
                    "https://cdn2.cellphones.com.vn/insecure/rs:fill:58:58/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/n/vn0d33_1.jpg",
                    "https://cdn2.cellphones.com.vn/insecure/rs:fill:58:58/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/n/vn_mac_1_2.jpg",
                    "https://cdn2.cellphones.com.vn/insecure/rs:fill:58:58/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/n/vn380f_1.jpg",
                    "https://cdn2.cellphones.com.vn/insecure/rs:fill:58:58/q:90/plain/https://cellphones.com.vn/media/catalog/product/v/n/vne2da_1.jpg",
                  ],
                  discount: 5,
                  price: 19500000,
                  oldPrice: 24000000,
                  isHot: true,
                  specs: { cpu: "Apple M2", ram: "8GB", storage: "256GB", gpu: "Apple GPU" },
                  brand: "Apple",
                  category: CategoryEnum.OFFICE,
                  quantity: 10,
                };
                reset(sample);
                replace(sample.images);
              }}
            >
              Điền dữ liệu mẫu
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
