import React, { useEffect, useState } from "react";
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
import { FadeLoader } from "react-spinners";
import { Pagination } from "antd";
import { useLocation } from "react-router-dom";
import { useUserInfo } from "../../store/useUserInfo";

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
  const { state } = useLocation(); // CACH 1
  const { brandSelectedStore, setBrandSelectedStore } = useUserInfo();
  const [categorySelected, setCategorySelected] = useState("");
  const [priceSorting, setPriceSorting] = useState("newest");
  const [productData, setProductData] = useState<IProduct[]>([]);

  const [ramSelected, setRamSelected] = useState("");
  const [storageSelected, setStorageSelected] = useState("");
  const [brandSelected, setBrandSelected] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });

  const onChangeBrand: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    // arr = ["dell", "hp", "lenovo", "asus", "acer", "msi", "apple", "gigabyte"]
    // string = "dell,hp,lenovo,asus,acer,msi,apple,gigabyte"
    const brandJoined = checkedValues.join(",");
    console.log("brandJoined: ", brandJoined);
    setBrandSelected(brandJoined);
    // const url = `https://lapshop-be.onrender.com/api/product?page=${pagination.page}&limit=10&brand=${brandJoined}`;
    const url = `https://lapshop-be.onrender.com/api/product?page=${pagination.page}&limit=10&category=${categorySelected}&brand=${brandJoined}&specs[ram]=${ramSelected}&specs[storage]=${storageSelected}`;
    handleFilterProducts(url);
  };

  const handleFilterCategory = async (val: string) => {
    setCategorySelected(val);
    const url = `https://lapshop-be.onrender.com/api/product?page=${pagination.page}&limit=10&category=${val}&brand=${brandSelected}&specs[ram]=${ramSelected}&specs[storage]=${storageSelected}`;
    // https://lapshop-be.onrender.com/api/product?category=GAMING&page=${pagination.page}&limit=10&brand=Apple,ASUS&specs[ram]=16GB&specs[storage]=512GB
    handleFilterProducts(url);
  };

  const handlePriceSorting = async (val: string) => {
    setPriceSorting(val);
    if (val === "price-asc") {
      const newListProducts = productData.sort((a, b) => a.price - b.price);
      setProductData(newListProducts);
    } else if (val === "price-desc") {
      const newListProducts = productData.sort((a, b) => b.price - a.price);
      setProductData(newListProducts);
    } else if (val === "newest") {
      const newListProducts = productData.sort(
        (a: any, b: any) =>
          convertDateStringToTimestamp(b.createdAt) -
          convertDateStringToTimestamp(a.createdAt)
      );
      setProductData(newListProducts as any);
    }
  };

  const convertDateStringToTimestamp = (date: string) => {
    const converted = Date.parse(date);
    // console.log("converted: ", converted);
    return converted;
  };

  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    // const url =
    //   `https://lapshop-be.onrender.com/api/product?page=${pagination.page}&limit=10&brand=${state?.brandSelected || ""}`;
    // CACH 2  
    const url =
      `https://lapshop-be.onrender.com/api/product?page=${pagination.page}&limit=10&brand=${brandSelectedStore}`;
    handleFilterProducts(url);
  };

  const handleFilterProducts = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setPagination({
        page: result.pagination.page,
        total: result.pagination.total,
      });
      setProductData(result.data);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  const handleChangeRam = async (val: string) => {
    console.log("val ram: ", val);
    setRamSelected(val);
    // const url = `https://lapshop-be.onrender.com/api/product?page=${pagination.page}&limit=10&specs[ram]=${val}`;
    const url = `https://lapshop-be.onrender.com/api/product?page=${pagination.page}&limit=10&category=${categorySelected}&brand=${brandSelected}&specs[ram]=${val}&specs[storage]=${storageSelected}`;
    handleFilterProducts(url);
  };

  const handleChangeStorage = async (val: string) => {
    setStorageSelected(val);
    // const url = `https://lapshop-be.onrender.com/api/product?page=${pagination.page}&limit=10&specs[storage]=${val}`;
    const url = `https://lapshop-be.onrender.com/api/product?page=${pagination.page}&limit=10&category=${categorySelected}&brand=${brandSelected}&specs[ram]=${ramSelected}&specs[storage]=${val}`;
    handleFilterProducts(url);
  };

  const handlePagination = (pageSelected: number) => {
    const url = `https://lapshop-be.onrender.com/api/product?page=${pageSelected}&limit=10&category=${categorySelected}&brand=${brandSelected}&specs[ram]=${ramSelected}&specs[storage]=${storageSelected}`;
    handleFilterProducts(url);
  }

  useEffect(() => {
    // MOUNTING => luôn gọi đầu tiên khi vào component
    getProducts();
  }, []);

  useEffect(() => {
    // UNMOUNTING => luôn gọi khi kết thúc component => thoát khỏi component
    return() => {
      setBrandSelectedStore("");
    }
  }, [])

  return (
    <div className="mt-4 max-w-7xl mx-auto">
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
                // defaultValue={[state?.brandSelected]} // giá trị mặc định => giá trị ban đầu // state.brandSelected giá trị của brand khi navigate từ home
                defaultValue={[brandSelectedStore]} // giá trị mặc định => giá trị ban đầu // state.brandSelected giá trị của brand khi navigate từ home
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
                    onChange={handleChangeRam}
                    // onSearch={onSearch}
                    options={ram}
                    value={ramSelected}
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
                    onChange={handleChangeStorage}
                    // onSearch={onSearch}
                    options={storage}
                    value={storageSelected}
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
          {isLoading ? (
            <div className="w-full flex justify-center mt-5">
              <FadeLoader
                color={"#1859db"}
                loading={isLoading}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {productData.map((product: IProduct, index: number) => (
                <ProductCard item={product} key={index} />
              ))}
            </div>
          )}
          <div className="py-8">
            <Pagination
              align="center"
              defaultCurrent={pagination.page}
              total={pagination.total}
              onChange={(pageNumber) => handlePagination(pageNumber)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
