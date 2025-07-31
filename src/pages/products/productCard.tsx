import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Props } from "./products.interface";
import { useNavigate } from "react-router-dom";

const ProductCard = (props: Props) => {
  const navigate = useNavigate();
  const { item } = props;
  return (
    <div
      onClick={() =>
        navigate(`/product-detail/${item.id}`, {
          state: {
            productIdState: item.id,
            name: "DAT",
            age: 18,
            privateUrl: "abcxyz",
          },
        })
      }
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover object-top"
        />
        {item.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Giảm {item.discount}%
          </div>
        )}
        {item.isHot && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            HOT
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex items-center mb-1">
            <span className="font-medium mr-1">CPU:</span> {item.specs.cpu}
          </div>
          <div className="flex items-center mb-1">
            <span className="font-medium mr-1">RAM:</span> {item.specs.ram}
          </div>
          <div className="flex items-center mb-1">
            <span className="font-medium mr-1">Ổ cứng:</span>{" "}
            {item.specs.storage}
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">VGA:</span> {item.specs.gpu}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-blue-600">
              {item.price}
            </span>
            {item.oldPrice > item.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {item.oldPrice}
              </span>
            )}
          </div>
          <button className="py-1 px-2 bg-blue-500 rounded-full cursor-pointer hover:opacity-70">
            <ShoppingCartOutlined className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
