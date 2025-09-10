import { CheckboxOptionType } from "antd";
import { IProduct } from "../../components/home-type-products/homeTypeProducts.interface";

export interface Props {
  item: IProduct;
}

export const categories = [
  { id: "all", name: "Tất cả", value: "" },
  { id: "gaming", name: "Gaming", value: "GAMING" },
  { id: "office", name: "Văn phòng", value: "OFFICE" },
  { id: "design", name: "Đồ họa", value: "DESIGN" },
  { id: "student", name: "Sinh viên", value: "STUDENT" },
];

export const brands: CheckboxOptionType<string>[] = [
  { label: "Dell", value: "Dell" },
  { label: "HP", value: "HP" },
  { label: "Lenovo", value: "Lenovo" },
  { label: "Asus", value: "ASUS" },
  { label: "Acer", value: "Acer" },
  { label: "MSI", value: "MSI" },
  { label: "Apple", value: "Apple" },
  { label: "Gigabyte", value: "Gigabyte" },
  { label: "Windown", value: "Windown" },
];

export const configuration = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "i3",
    label: "Intel Core i3",
  },
  {
    value: "i5",
    label: "Intel Core i5",
  },
  {
    value: "i7",
    label: "Intel Core i7",
  },
  {
    value: "i9",
    label: "Intel Core i9",
  },
  {
    value: "ryzen5",
    label: "AMD Ryzen 5",
  },
  {
    value: "ryzen7",
    label: "AMD Ryzen 7",
  },
  {
    value: "ryzen9",
    label: "AMD Ryzen 9",
  },
  {
    value: "m1",
    label: "Apple M1",
  },
  {
    value: "m2",
    label: "Apple M2",
  },
  {
    value: "m3",
    label: "Apple M3",
  },
];

export const ram = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "8GB",
    label: "8GB",
  },
  {
    value: "12GB",
    label: "12GB",
  },
  {
    value: "16GB",
    label: "16GB",
  },
  {
    value: "24GB",
    label: "24GB",
  },
  {
    value: "32GB",
    label: "32GB",
  },
];

export const gpu = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "integrated",
    label: "Card onboard",
  },
  {
    value: "gtx",
    label: "NVIDIA GTX Series",
  },
  {
    value: "rtx",
    label: "NVIDIA RTX Series",
  },
  {
    value: "radeon",
    label: "AMD Radeon",
  },
  {
    value: "apple",
    label: "Apple GPU",
  },
];

export const storage = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "256GB",
    label: "SSD 256GB",
  },
  {
    value: "512GB",
    label: "SSD 512GB",
  },
  {
    value: "1TB",
    label: "SSD 1TB",
  },
  {
    value: "2TB",
    label: "SSD 2TB",
  },
];

export const sorting = [
  {
    value: "newest",
    label: "Mới nhất",
  },
  {
    value: "price-asc",
    label: "Giá tăng dần",
  },
  {
    value: "price-desc",
    label: "Giá giảm dần",
  },
]