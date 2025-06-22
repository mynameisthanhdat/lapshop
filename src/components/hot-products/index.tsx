import React from "react";
import ProductCard from "./productCard";
import { dataHotProducts, IHotProduct } from "./hotProduct.interface";

const HotProducts = () => {
  return (
    <div className="mt-12 pb-5">
      <h1 className="text-2xl font-bold mb-4">Sản Phẩm Nổi Bật</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {dataHotProducts.map((item: IHotProduct, index: number) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HotProducts;
