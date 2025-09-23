import React, { useEffect, useState } from "react";
// import { products } from "./fakeData";
import ProductCard from "../hot-products/productCard";
import { dataOptions, IProduct, IOption } from "./homeTypeProducts.interface";
import { useNavigate } from "react-router-dom";

const HomeTypeProducts = () => {
  const navigate = useNavigate();

  const [optionSelected, setOptionSelected] = useState<IOption>(dataOptions[0]);
  // optionSelected.value => gaming/ofice/design/student
  // const [data, setData] = useState<IProduct[]>(
  //   products.filter((x) => x.category === optionSelected.value)
  // );
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [productDataOriginal, setProductDataOriginal] = useState<IProduct[]>([]);

  // console.log("data: ", data);

  console.log('optionSelected value: ', optionSelected.value);
  
  const getProductsByCategory = async (categorySelected: string) => { 
    const url =
      `https://lapshop-be.onrender.com/api/product?page=1&limit=100&category=${categorySelected}`;
    handleFilterProducts(url);
  }; // CACH 1

  const handleFilterProducts = async (url: string) => {
    // setIsLoading(true);
    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      console.log("KET QUA HOT: ", result);
      
      // const fourHotProducts = result.data.slice(0,4)
      // console.log('fourHotProducts: ', fourHotProducts);
      // luu 4 san pham nay vao productData
      setProductDataOriginal(result.data);
      // setIsLoading(false);
    } catch (error: any) {
      console.error(error.message);
      // setIsLoading(false);
    }
  };

  const getProductsByCategory2 = async () => {
    const url =
      `https://lapshop-be.onrender.com/api/product?page=1&limit=100`;
    handleFilterProducts(url);
  }; // CACH 2

  useEffect(() => {
    getProductsByCategory2();
  }, []) // CACH 2

  useEffect(() => {
    console.log('productDataOriginal: ', productDataOriginal);
    
    console.log('thang nay co su thay doi: ', optionSelected);
    const filterProducts = productDataOriginal.filter((item) => item.category === optionSelected.value);
    console.log('gia tri sau khi filter: ', filterProducts);
    setProductData(filterProducts.slice(0,4));
    
  }, [optionSelected, productDataOriginal]) // CACH 2 => NÓ SẼ LẮNG NGHE SỰ THAY ĐỔI CỦA 1 TRONG 2 GIÁ TRỊ NÀY ĐỂ FILTER PRODUCTS


  // có 2 cách để lọc dữ liệu
  // cách 1: filter/lọc trực tiếp ở mapping products
  // cách 2: tạo 1 state data chỉ chứa những product cần filter/lọc

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sản Phẩm Theo Danh Mục</h2>
      <div className="flex justify-center w-full">
        <div className="flex gap-2 shadow-md rounded-full p-1 w-fit border-red-100 border">
          {dataOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setOptionSelected(item);
                // getProductsByCategory(item.value); - CACH 1
              }}
              className={`px-4 py-3 text-md font-semibold rounded-full cursor-pointer ${
                optionSelected.id === item.id
                  ? "bg-blue-600 text-white"
                  : "text-black bg-white"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-8">
        {productData
          .map((item: IProduct, index: number) => (
            <ProductCard key={index} item={item} />
          ))}
        {/* {data.map((item: IProduct, index: number) => (
            <ProductCard key={index} item={item} />
          ))} */}
      </div>
      <div
        onClick={() => {
          navigate("/products");
        }}
        className="m-auto mb-6 px-6 py-2 bg-white hover:bg-blue-100 border-blue-600 cursor-pointer border rounded-full text-blue-600 w-fit"
      >
        Xem thêm sản phẩm
      </div>
    </div>
  );
};

export default HomeTypeProducts;
