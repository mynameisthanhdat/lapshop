import React from "react";
import { relatedProducts } from "./fakeData";
import ProductCard from "../../components/hot-products/productCard";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";

const productImages = [
  "https://readdy.ai/api/search-image?query=modern%20gaming%20laptop%20with%20RGB%20keyboard%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20minimalist%20studio%20lighting%2C%20high-end%20technology%20device%20showcase&width=600&height=400&seq=1&orientation=landscape",
  "https://readdy.ai/api/search-image?query=laptop%20side%20view%20showing%20ports%20and%20connections%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20minimalist%20studio%20lighting%2C%20detailed%20hardware%20showcase&width=600&height=400&seq=2&orientation=landscape",
  "https://readdy.ai/api/search-image?query=laptop%20screen%20display%20showing%20vibrant%20colors%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20minimalist%20studio%20lighting%2C%20display%20quality%20demonstration&width=600&height=400&seq=3&orientation=landscape",
  "https://readdy.ai/api/search-image?query=laptop%20keyboard%20close-up%20with%20backlit%20keys%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20minimalist%20studio%20lighting%2C%20premium%20keyboard%20detail&width=600&height=400&seq=4&orientation=landscape",
];

const items = [
  {
    href: "/",
    title: <HomeOutlined />,
  },
  {
    title: "Sản phẩm",
  },
  {
    title: "ASUS TUF Gaming F15",
  },
];

const ProductDetail = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-white">
      {/* Breadcrumb */}
      <Breadcrumb items={items} className="mt-6" />

      {/* Product Section */}
      <div className="mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[0]}
                alt="Product"
                className="w-full h-96 object-cover object-top"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border border-gray-200`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ASUS TUF Gaming F15 FX506LH-HN188W
            </h1>

            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-blue-600">
                  22.990.000₫
                </span>
                <span className="text-xl text-gray-500 line-through">
                  25.990.000₫
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  -12%
                </span>
              </div>
              <p className="text-sm text-gray-600">Đã bao gồm VAT</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-shopping-cart mr-2"></i>
                Thêm vào giỏ hàng
              </button>
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                Mua ngay
              </button>
            </div>

            {/* Key Features */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">
                Đặc điểm nổi bật:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>CPU Intel Core i5-10300H</li>
                <li>RAM 8GB DDR4 (có thể nâng cấp)</li>
                <li>SSD 512GB NVMe</li>
                <li>VGA NVIDIA GTX 1650 4GB</li>
                <li>Màn hình 15.6" Full HD 144Hz</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap border-blue-500 text-blue-600`}
            >
              Thông số kỹ thuật
            </div>
          </div>

          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Cấu hình CPU & RAM
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPU:</span>
                      <span className="text-gray-900">
                        Intel Core i5-10300H
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RAM:</span>
                      <span className="text-gray-900">8GB DDR4 2933MHz</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ổ cứng:</span>
                      <span className="text-gray-900">512GB SSD NVMe</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Màn hình
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kích thước:</span>
                      <span className="text-gray-900">15.6 inch</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Độ phân giải:</span>
                      <span className="text-gray-900">
                        1920 x 1080 (Full HD)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tần số quét:</span>
                      <span className="text-gray-900">144Hz</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Card đồ họa
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">GPU:</span>
                      <span className="text-gray-900">NVIDIA GTX 1650</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VRAM:</span>
                      <span className="text-gray-900">4GB GDDR6</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Kết nối
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">USB:</span>
                      <span className="text-gray-900">
                        3x USB 3.2, 1x USB-C
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">HDMI:</span>
                      <span className="text-gray-900">1x HDMI 2.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">WiFi:</span>
                      <span className="text-gray-900">WiFi 6 (802.11ax)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Pin & Kích thước
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pin:</span>
                      <span className="text-gray-900">48Wh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trọng lượng:</span>
                      <span className="text-gray-900">2.3kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kích thước:</span>
                      <span className="text-gray-900">359 x 256 x 22.8mm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, idx) => (
              <ProductCard key={idx} item={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
