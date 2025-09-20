import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { dataHotProducts, IHotProduct } from "./hotProduct.interface";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../home-type-products/homeTypeProducts.interface";

const HotProducts = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<IProduct[]>([]);

  const getProducts = async () => {
    const url =
      `https://lapshop-be.onrender.com/api/product?page=1&limit=100`;
    handleFilterProducts(url);
  };

  const handleFilterProducts = async (url: string) => {
    // setIsLoading(true);
    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      console.log("KET QUA HOT: ", result);
      // filter nhung san pham isHot = true
      const hotProducts = result.data.filter((item: IProduct) => item.isHot === true);
      console.log('hotProducts: ', hotProducts);
      // lay 4 san pham dau tien cua hotProducts
      const fourHotProducts = hotProducts.slice(0,4)
      console.log('fourHotProducts: ', fourHotProducts);
      // luu 4 san pham nay vao productData
      setProductData(fourHotProducts);
      // setIsLoading(false);
    } catch (error: any) {
      console.error(error.message);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className="mt-12 pb-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Sản Phẩm Nổi Bật</h1>
        <p
          onClick={() => navigate("/products")}
          className="text-blue-700 hover:text-blue-400 cursor-pointer text-sm font-semibold"
        >
          Xem thêm <ArrowRightOutlined />
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {productData.map((item: IProduct, index: number) => (
          <ProductCard key={index} item={item} isHot={true} />
        ))}
      </div>
    </div>
  );
};

export default HotProducts;
