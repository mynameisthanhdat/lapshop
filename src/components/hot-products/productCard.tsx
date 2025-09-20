import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { IHotProduct } from "./hotProduct.interface";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../home-type-products/homeTypeProducts.interface";

interface Props {
  item: IHotProduct | IProduct; // REQUIRED PROP => BAT BUOC PHAI TRUYEN
  isHot?: boolean; // OPTIONAL PROP => CO THE THE TRUYEN - CO / KO => neu khong truyen qua thi prop nay luon bang undefined
}

const ProductCard = (props: Props) => {
  const { item, isHot } = props;
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/product-detail/${item?.id}`)} className="rounded-xl bg-white shadow-md hover:shadow-xl transition-transform cursor-pointer">
      <div className="relative">
        <img className="rounded-t-xl" src={item.thumbnail} alt="" />
        {isHot && (
          <div className="absolute top-3 left-3 bg-red-500 rounded text-white px-2 py-1 text-xs font-bold">
            Giảm {item.discount}%
          </div>
        )}
        {isHot && item.isHot && (
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
            {isHot && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {item.oldPrice}đ
              </span>
            )}
          </div>
          {isHot ? (
            <div className="py-1 px-2 bg-blue-500 rounded-full cursor-pointer hover:opacity-70">
              <ShoppingCartOutlined className="text-white" />
            </div>
          ) : (
            <div className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">Thêm giỏ hàng</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
