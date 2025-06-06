import React from "react";
import {
  ShoppingCartOutlined
} from '@ant-design/icons';

const HotProducts = () => {
  return (
    <div className="px-12 mt-12 pb-5">
      <h1 className="text-2xl font-bold mb-4">Sản Phẩm Nổi Bật</h1>
      <div className="w-[300px] rounded-xl bg-white shadow-md hover:shadow-xl transition-transform cursor-pointer">
        <div className="relative">
          <img className="rounded-xl" src="https://readdy.ai/api/search-image?query=Dell%20XPS%2015%20laptop%20on%20minimalist%20desk%2C%20professional%20product%20photography%20with%20clean%20white%20background%2C%20high%20resolution%2C%20detailed%2C%20commercial%20quality%2C%20front%20view%20of%20laptop%20with%20screen%20on&width=300&height=200&seq=4&orientation=landscape" alt="" />
          <div className="absolute top-3 left-3 bg-red-500 rounded text-white px-2 py-1 text-xs font-bold">Giảm 10%</div>
          <div className="absolute top-3 right-3 bg-yellow-500 rounded text-white px-2 py-1 text-xs font-bold">HOT</div>
        </div>
        <div className="p-2">
          <h3 className="text-lg font-semibold mb-2">Dell XPS 15 (2025)</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-blue-600">35.990.000đ</span>
              <span className="text-sm text-gray-500 line-through ml-2">39.990.000đ</span>
            </div>
            <div className="py-1 px-2 bg-blue-500 rounded-full cursor-pointer hover:opacity-70">
              <ShoppingCartOutlined className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotProducts;
