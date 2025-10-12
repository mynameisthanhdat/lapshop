import React, { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useUserInfo } from "../../store/useUserInfo";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { IProduct } from "../../components/home-type-products/homeTypeProducts.interface";
import { showMessage } from "../../utils/showMessage";

const Payment = () => {
  const { userInfo } = useUserInfo();
  const { productId } = useParams();
  const { state } = useLocation();
  const quantity = state.quantity;

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [quantityOrder, setQuantityOrder] = useState(quantity);
  const [productDetail, setProductDetail] = useState<IProduct>();
  const [formData, setFormData] = useState({
    fullName: userInfo?.name,
    phone: userInfo?.phone,
    // email: "",
    address: userInfo?.address,
    // note: "",
  });
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const items = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "/",
      title: "ASUS TUF Gaming F15 FX506LH-HN188W",
    },
    {
      title: "Thanh toán",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getProductDetail = async () => {
    const url = `https://lapshop-be.onrender.com/api/product/${productId}`;
    axios
      .get(url)
      .then(function (res) {
        setProductDetail(res.data.product);
      })
      .catch(function (error) {
        // console.log("THAT BAI");
      });
  };

  const handleOrderProduct = () => {
    const payload = {
      userId: userInfo?.id,
      shippingAddress: {
        name: formData?.fullName,
        phone: formData.phone,
        address: formData.address,
      },
      products: [
        {
          productId: productDetail?._id,
          name: productDetail?.name,
          thumbnail: productDetail?.thumbnail,
          discount: productDetail?.discount,
          price: productDetail?.price,
          quantity: quantityOrder,
          specs: {
            cpu: productDetail?.specs.cpu,
            ram: productDetail?.specs.ram,
            storage: productDetail?.specs.storage,
            gpu: productDetail?.specs.gpu,
          },
        },
      ],
    };
    console.log("payload: ", payload);
    const url = "https://lapshop-be.onrender.com/api/order";
    axios
      .post(url, payload)
      .then(function (response) {
        showMessage("success", "Đặt sản phẩm thành công!");
      })
      .catch(function (error) {
        showMessage("error", "Đặt sản phẩm thất bại. Vui lòng thử lại!");
      });
  };

  const handleChangeQuantity = (val: string) => {
    const valNumber = parseInt(val);
    if (valNumber <= 0) {
      setQuantityOrder(1);
    } else {
      setQuantityOrder(valNumber);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [productId]);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb items={items} className="mt-6" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Thanh toán đơn hàng
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Thông tin giao hàng
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập email"
                  />
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ giao hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập địa chỉ chi tiết"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                  ></textarea>
                </div> */}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Phương thức thanh toán
              </h2>

              {/* Payment Method Selection */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="payment-method"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <label
                    htmlFor="cod"
                    className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    <i className="fas fa-money-bill-wave mr-2 text-orange-600"></i>
                    Thanh toán khi nhận hàng (COD)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment-method"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                    disabled={true}
                  />
                  <label
                    htmlFor="credit-card"
                    className="ml-3 text-sm font-medium text-gray-400"
                  >
                    <i className="fas fa-credit-card mr-2 text-blue-600"></i>
                    Thẻ tín dụng / Thẻ ghi nợ
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bank-transfer"
                    name="payment-method"
                    value="bank-transfer"
                    checked={paymentMethod === "bank-transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                    disabled={true}
                  />
                  <label
                    htmlFor="bank-transfer"
                    className="ml-3 text-sm font-medium text-gray-400"
                  >
                    <i className="fas fa-university mr-2 text-green-600"></i>
                    Chuyển khoản ngân hàng
                  </label>
                </div>
              </div>

              {/* Payment Method Details */}
              {paymentMethod === "credit-card" && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số thẻ
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày hết hạn
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardData.expiryDate}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên chủ thẻ
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardData.cardName}
                        onChange={handleCardInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="NGUYEN VAN A"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
                    <i className="fab fa-cc-mastercard text-2xl text-red-600"></i>
                    <i className="fab fa-cc-amex text-2xl text-blue-500"></i>
                  </div>
                </div>
              )}

              {paymentMethod === "bank-transfer" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Thông tin chuyển khoản
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngân hàng:</span>
                      <span className="font-medium">Vietcombank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số tài khoản:</span>
                      <span className="font-medium">1234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Chủ tài khoản:</span>
                      <span className="font-medium">CONG TY TECHSTORE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nội dung:</span>
                      <span className="font-medium">TechStore DH001</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    <i className="fas fa-info-circle mr-2"></i>
                    Vui lòng chuyển khoản đúng nội dung để đơn hàng được xử lý
                    nhanh chóng.
                  </div>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-truck text-orange-600 mt-1"></i>
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-1">
                        Thanh toán khi nhận hàng
                      </p>
                      <p>
                        Bạn sẽ thanh toán bằng tiền mặt khi nhận được sản phẩm.
                        Phí COD: 30.000₫
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Đơn hàng của bạn
              </h2>

              {/* Product Info */}
              <div className="space-y-4 mb-6">
                <div className="flex space-x-4 pb-4 border-b border-gray-200">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={productDetail?.thumbnail}
                      alt={productDetail?.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      {productDetail?.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      RAM: {productDetail?.specs.ram}
                    </p>
                    <div className="flex justify-between items-center">
                      {/* <span className="text-sm text-gray-600">
                        Số lượng: {quantity}
                      </span> */}
                      <input
                        className="border border-gray-400 w-16 rounded-xl p-2"
                        type="number"
                        value={quantityOrder}
                        onChange={(e) => handleChangeQuantity(e.target.value)}
                      />
                      <span className="font-medium text-gray-900">
                        {productDetail?.price}₫
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="text-gray-900">
                    {(productDetail?.price as number) * quantityOrder}₫
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="text-gray-900">Miễn phí</span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí COD:</span>
                    <span className="text-gray-900">30.000₫</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Tổng cộng:
                    </span>
                    <span className="text-lg font-semibold text-red-600">
                      {/* {paymentMethod === "cod" ? "23.020.000₫" : "22.990.000₫"} */}
                      {(productDetail?.price as number) * quantityOrder + 30000}
                      đ
                    </span>
                  </div>
                </div>
              </div>

              {/* Confirm Order Button */}
              <button
                onClick={handleOrderProduct}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-check-circle mr-2"></i>
                Xác nhận đặt hàng
              </button>

              {/* Security Info */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-green-800">
                  <i className="fas fa-shield-alt"></i>
                  <span>Thanh toán an toàn & bảo mật</span>
                </div>
              </div>

              {/* Support Info */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Cần hỗ trợ?</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <i className="fas fa-phone mr-1"></i>1900 1234
                  </a>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <i className="fas fa-envelope mr-1"></i>Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
