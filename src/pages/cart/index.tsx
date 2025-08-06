import React, { useState } from "react";
import { IProduct } from "../../components/home-type-products/homeTypeProducts.interface";
import { useNavigate } from "react-router-dom";

const fakeData = [
  {
    id: 1,
    name: 'MSI Raider GE76',
    image: 'https://readdy.ai/api/search-image?query=MSI%2520Raider%2520GE76%2520gaming%2520laptop%2520with%2520RGB%2520keyboard%2520on%2520a%2520sleek%2520desk%2520with%2520blue%2520lighting%252C%2520professional%2520product%2520photography%2520with%2520dark%2520background%2520and%2520dramatic%2520lighting%252C%2520high%2520resolution%252C%2520detailed%252C%2520sharp%2520focus%252C%2520commercial%2520quality&width=400&height=300&seq=101&orientation=landscape',
    price: 45990000,
    oldPrice: 49990000,
    discount: 8,
    specs: {
      cpu: 'i9-12900HK',
      ram: '32GB',
      storage: '2TB SSD',
      gpu: 'RTX 3080'
    },
    category: 'gaming',
    brand: 'msi',
    isHot: true,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Dell XPS 15 (2025)',
    image: 'https://readdy.ai/api/search-image?query=Dell%2520XPS%252015%2520laptop%2520on%2520minimalist%2520desk%2520with%2520clean%2520white%2520background%252C%2520professional%2520product%2520photography%2520with%2520soft%2520lighting%252C%2520high%2520resolution%252C%2520detailed%252C%2520sharp%2520focus%252C%2520commercial%2520quality&width=400&height=300&seq=102&orientation=landscape',
    price: 35990000,
    oldPrice: 39990000,
    discount: 10,
    specs: {
      cpu: 'i7-12700H',
      ram: '16GB',
      storage: '1TB SSD',
      gpu: 'RTX 3050 Ti'
    },
    category: 'design',
    brand: 'dell',
    isHot: true,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Acer Predator Helios 300',
    image: 'https://readdy.ai/api/search-image?query=Acer%2520Predator%2520Helios%2520300%2520gaming%2520laptop%2520with%2520RGB%2520keyboard%2520on%2520a%2520sleek%2520desk%2520with%2520blue%2520lighting%252C%2520professional%2520product%2520photography%2520with%2520dark%2520background%2520and%2520dramatic%2520lighting%252C%2520high%2520resolution%252C%2520detailed%252C%2520sharp%2520focus%252C%2520commercial%2520quality&width=400&height=300&seq=103&orientation=landscape',
    price: 32990000,
    oldPrice: 36990000,
    discount: 11,
    specs: {
      cpu: 'i7-11800H',
      ram: '16GB',
      storage: '1TB SSD',
      gpu: 'RTX 3070'
    },
    category: 'gaming',
    brand: 'acer',
    isHot: false,
    quantity: 3,
  },
]

const Cart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<IProduct[]>(fakeData);

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

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
                <p className="text-gray-600 mt-1">4 sản phẩm</p>
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
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
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
                    </div>
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
                      <div onClick={() => navigate(`/payment/${item.id}`)} className="py-1 px-2 bg-blue-500 rounded-md cursor-pointer hover:opacity-60">
                        <p className="text-white font-semibold text-sm">Mua</p>
                      </div>
                    <button
                      onClick={() => removeItem(item.id)}
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
