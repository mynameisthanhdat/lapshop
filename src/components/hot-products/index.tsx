import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
// import { isDesktop } from "react-device-detect";

interface IHotProduct {
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
  isHot: boolean;
}

const dataHotProducts: IHotProduct[] = [
  {
    name: "Dell XPS 15 (2025)",
    image:
      "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/44/333886/dell-inspiron-15-3520-i5-n5i5057w1-2-638724479214886489-750x500.jpg",
    discount: 10,
    price: 35990000,
    oldPrice: 39990000,
    isHot: true,
  },
  {
    name: "Asus ROG Zephyrus G14",
    image:
      "https://cdn.tgdd.vn/Products/Images/44/302466/asus-gaming-rog-zephyrus-g14-ga402rj-r7-l8030w-glr-fix-2-750x500.jpg",
    discount: 7,
    price: 32490000,
    oldPrice: 34990000,
    isHot: true,
  },
  {
    name: "MacBook Pro 16 M3 Pro",
    image:
      "https://cdn.tgdd.vn/Products/Images/44/236131/laptopapplemacbookprom1-1-750x500.jpg",
    discount: 7,
    price: 52990000,
    oldPrice: 56990000,
    isHot: false,
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    image:
      "https://cdn.tgdd.vn/Products/Images/44/292926/lenovo-thinkpad-x1-carbon-gen-10-i7-21cb00a8vn-2-1-750x500.jpg",
    discount: 9,
    price: 29990000,
    oldPrice: 32990000,
    isHot: false,
  },
];

const HotProducts = () => {
  return (
    <div className="mt-12 pb-5">
      <h1 className="text-2xl font-bold mb-4">Sản Phẩm Nổi Bật</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {dataHotProducts.map((item: IHotProduct, index: number) => (
          <div
            key={index}
            className="rounded-xl bg-white shadow-md hover:shadow-xl transition-transform cursor-pointer"
          >
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
                  {/* {isDesktop ? (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {item.oldPrice}đ
                    </span>
                  ) : (
                    <p className="text-sm text-gray-500 line-through">
                      {item.oldPrice}đ
                    </p>
                  )} */}
                </div>
                <div className="py-1 px-2 bg-blue-500 rounded-full cursor-pointer hover:opacity-70">
                  <ShoppingCartOutlined className="text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotProducts;
