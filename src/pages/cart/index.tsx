import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserCart } from "../../store/useUserCart";

const Cart = () => {
  const navigate = useNavigate()
  const { products } = useUserCart();

  // const removeItem = (_id: string) => {
  //   setCartItems((items) => items.filter((item) => item._id !== _id));
  // };

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8">
        <div className="bg-white shadow-sm mb-5">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Giỏ hàng của bạn
                </h1>
                <p className="text-gray-600 mt-1">{products.length} sản phẩm</p>
              </div>
              <button onClick={() => navigate("/products")} className="bg-blue-600 text-white px-6 py-3 !rounded-button hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                <i className="fas fa-arrow-left mr-2"></i>
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-6 max-w-5xl mx-auto">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-gray-100 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    {/* <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <i className="fas fa-microchip mr-2 text-blue-600"></i>
                        {item.specs.cpu}
                      </p>
                      <p>
                        <i className="fas fa-memory mr-2 text-green-600"></i>
                        {item.specs.ram}
                      </p>
                      <p>
                        <i className="fas fa-hdd mr-2 text-purple-600"></i>
                        {item.specs.storage}
                      </p>
                    </div> */}
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      {item.price}
                    </p>

                    <div className="flex items-center space-x-3 mb-4">
                      <p>Số lượng: </p>
                      <div className="py-2 px-4 bg-gray-200 rounded-lg">
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div onClick={() => navigate(`/payment/${item._id}`)} className="py-1 px-2 bg-blue-500 rounded-md cursor-pointer hover:opacity-60">
                        <p className="text-white font-semibold text-sm">Mua</p>
                      </div>
                    <button
                      // onClick={() => removeItem(item._id)}
                      className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                    >
                      <i className="fas fa-trash mr-1"></i>
                      Xóa
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
