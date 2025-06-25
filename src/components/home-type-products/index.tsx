import React, { useState } from "react";
import { products } from "./fakeData";
import ProductCard from "../hot-products/productCard";
import { dataOptions, IProduct, IOption } from "./homeTypeProducts.interface";

const HomeTypeProducts = () => {
  const [optionSelected, setOptionSelected] = useState<IOption>(dataOptions[0]);
  // optionSelected.value => gaming/ofice/design/student

  const [data, setData] = useState<IProduct[]>(
    products.filter((x) => x.category === optionSelected.value)
  );

  console.log('data: ', data);

  // có 2 cách để lọc dữ liệu
  // cách 1: filter/lọc trực tiếp ở mapping products
  // cách 2: tạo 1 state data chỉ chứa những product cần filter/lọc

  return (
    <div>
      <h2>Sản Phẩm Theo Danh Mục</h2>
      <div className="flex justify-center w-full">
        <div className="flex gap-2 shadow-md rounded-full p-1 w-fit border-red-100 border">
          {dataOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setOptionSelected(item);
                setData(products.filter((x) => x.category === item.value))
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
        {products
          .filter((x) => x.category === optionSelected.value)
          .map((item: IProduct, index: number) => (
            <ProductCard key={index} item={item} />
          ))}
          {/* {data.map((item: IProduct, index: number) => (
            <ProductCard key={index} item={item} />
          ))} */}
      </div>
    </div>
  );
};

export default HomeTypeProducts;
