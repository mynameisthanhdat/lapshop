import React, { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Checkbox, GetProp, Select } from "antd";
import {
  brands,
  categories,
  configuration,
  gpu,
  ram,
  sorting,
  storage,
} from "./products.interface";
import { products, newestProducts } from "./fakeData";
import { IProduct } from "../../components/home-type-products/homeTypeProducts.interface";
import ProductCard from "./productCard";

const items = [
  {
    href: "/",
    title: <HomeOutlined />,
  },
  {
    title: "Sản phẩm",
  },
];

const Products = () => {
  const [categorySelected, setCategorySelected] = useState("");
  const [priceSorting, setPriceSorting] = useState("newest");
  const [productData, setProductData] = useState(products);

  const onChangeBrand: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
    const newListProducts = filterProductsByBrands(
      products,
      checkedValues as string[]
    );
    // console.log("newListProducts: ", newListProducts);
    setProductData(newListProducts);
  };

  const filterProductsByBrands = (products: IProduct[], brands: string[]) => {
    return products.filter((product) => brands.includes(product.brand));
  };

  const handleFilterCategory = (val: string) => {
    setCategorySelected(val);
    // categorySelected
    if(!val) { // !val bang voi val === ""
      setProductData(newestProducts);
    } else {
      const newProductsByBrand = products.filter((x) => x.category === val);
      setProductData(newProductsByBrand);
    }
  };

  const handlePriceSorting = (val: string) => {
    setPriceSorting(val);
    if (val === "price-asc") {
      const newListProducts = productData.sort((a, b) => a.price - b.price);
      setProductData(newListProducts);
    } else if (val === "price-desc") {
      const newListProducts = productData.sort((a, b) => b.price - a.price);
      setProductData(newListProducts);
    } else if (val === "newest") {
      const newListProducts = newestProducts.filter(
        (x) => x.category === categorySelected
      );
      setProductData(newListProducts);
    }
  };

  // const [hihi, setHihi] = useState<string[]>([]);

  // const onSetHihi = (value: string) => {
  //   console.log("value selected = ", value);
  //   console.log("hihi chưa cập nhật: ", hihi);
  //   let checkedValues = [] as string[]

  //   const isExistedVal = hihi.find((item) => item === value); // giá trị này dùng để kiểm tra xem value vừa chọn đã tồn tại trong mảng hihi hay chưa
  //   if (isExistedVal) {
  //     // nếu đã tồn tại rồi
  //     console.log("co VALUE");
  //     const newVal = hihi.filter((item) => item !== value); // filter - lọc những giá trị ko phải là value vừa được chọn
  //     setHihi(newVal); // cập nhật lại list hihi
  //     console.log("hihi đã cập nhật với ĐK 1: ", newVal);
  //     // console.log("vinh ne: ", hihi);
  //     checkedValues = newVal;
  //   } else {
  //     console.log("ko co VALUE");
  //     setHihi(hihi.concat(value)); // lưu trực tiếp vào hihi => DÙNG CONCAT ĐỂ NỐI MẢNG CŨ VỚI GIÁ TRỊ VỪA CHỌN
  //     console.log("hihi đã cập nhật với ĐK 2: ", hihi.concat(value));
  //     // console.log("dat ne: ", hihi);
  //     checkedValues = hihi.concat(value)
  //   }
  //   return checkedValues
  // };

  return (
    <div className="mt-4">
      <Breadcrumb items={items} />
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold text-gray-800">Laptop</h1>
        <p className="text-gray-600 mt-2">
          Tìm kiếm và mua sắm laptop phù hợp với nhu cầu của bạn
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden md:block w-full md:w-1/4 lg:w-1/5">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Danh mục</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleFilterCategory(category.value)}
                      className={`flex items-center w-full text-left py-1 px-2 rounded-md cursor-pointer whitespace-nowrap hover:bg-gray-50 ${
                        categorySelected === category.value
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Thương hiệu</h3>
              <Checkbox.Group
                className="flex flex-col gap-2"
                options={brands}
                defaultValue={[""]}
                onChange={onChangeBrand}
              />

              {/* <p>CODE HTML CSS THUẦN - KHÔNG DÙNG THƯ VIỆN</p> */}
              {/* {options.map((brand) => (
                <li key={brand.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand.id}`}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    // checked={activeBrands.includes(brand.id)}
                    onChange={() => onSetHihi(brand.value)}
                  />
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className="ml-2 text-gray-700 cursor-pointer"
                  >
                    {brand.label}
                  </label>
                </li>
              ))} */}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Cấu hình</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">CPU</h4>
                  <Select
                    showSearch
                    placeholder="Chọn cấu hình"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    options={configuration}
                    value={configuration[0].value}
                    className="w-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">RAM</h4>
                  <Select
                    showSearch
                    placeholder="Chọn cấu hình"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    options={ram}
                    value={ram[0].value}
                    className="w-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Card đồ họa
                  </h4>
                  <Select
                    showSearch
                    placeholder="Chọn cấu hình"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    options={gpu}
                    value={gpu[0].value}
                    className="w-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Ổ cứng</h4>
                  <Select
                    showSearch
                    placeholder="Chọn cấu hình"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    options={storage}
                    value={storage[0].value}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <button
              className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              // onClick={resetFilters}
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
        {/* Product List */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Sắp xếp theo:</span>
              <Select
                showSearch
                placeholder="Mới nhất"
                optionFilterProp="label"
                className="w-[160px]"
                options={sorting}
                onChange={(val) => handlePriceSorting(val)}
                value={priceSorting}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productData.map((product: IProduct, index: number) => (
              <ProductCard item={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
