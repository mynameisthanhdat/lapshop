import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { IHotProduct } from "./hotProduct.interface";

interface Props {
  item: IHotProduct;
}

const ProductCard = (props: Props) => {
  const { item } = props;
  return (
    <div className="rounded-xl bg-white shadow-md hover:shadow-xl transition-transform cursor-pointer">
      <div className="relative">
        <img className="rounded-xl" src={item.image} alt="" />
        <div className="absolute top-3 left-3 bg-red-500 rounded text-white px-2 py-1 text-xs font-bold">
          Giảm {item.discount}%
        </div>
        {item.isHot && (
          <div className="absolute top-3 right-3 bg-yellow-500 rounded text-white px-2 py-1 text-xs font-bold">
            HOT
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="text-lg font-semibold mb-2">{item?.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-blue-600">
              {item.price}đ
            </span>
            <span className="text-sm text-gray-500 line-through ml-2">
              {item.oldPrice}đ
            </span>
          </div>
          <div className="py-1 px-2 bg-blue-500 rounded-full cursor-pointer hover:opacity-70">
            <ShoppingCartOutlined className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
