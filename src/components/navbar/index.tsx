import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/imgs/logo.png";
import { useUserCart } from "../../store/useUserCart";
import { useNavigate, useLocation } from "react-router-dom";
import { Popover } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

const Navbar = () => {
  const { countQuantityCart } = useUserCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [navSelected, setNavSelected] = useState("/");

  // console.log('hihi 121212: ', window.location);
  // const newPathName = window.location.pathname;
  // console.log('newPathName: ', newPathName);

  // localStorage.getItem("user") => no la string
  const userInfo = JSON.parse(localStorage.getItem("user") as string); // chuyen string thanh object
  console.log("userInfo: ", userInfo);

  const hanldeLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  const content = (
    <div>
      <p className="font-bold text-center text-purple-500 mb-2">
        {userInfo?.name}
      </p>
      <hr />
      <div onClick={() => {
        navigate(`/order/${userInfo.id}`)
      }} className="flex gap-2 m-1 cursor-pointer">
        <p className="text-green-700 font-bold">Đơn hàng</p>
        <ShoppingOutlined className="text-green-700" />
      </div>
      <hr />
      <button
        onClick={hanldeLogout}
        className="mt-4 bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
      >
        Đăng xuất
      </button>
    </div>
  );

  useEffect(() => {
    // UPDATING => CHAY KHI CO SU THAY DOI O DEPENDENCIES
    // console.log('thay doi ne');
    setNavSelected(location.pathname);
  }, [location]); // dependencies

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            {/* <i className="fas fa-laptop mr-2"></i> */}
            <NavLink to="/" className="w-12 h-12 rounded-[50%] cursor-pointer">
              <img src={Logo} alt="" width={40} height={40} />
            </NavLink>
            {/* LapShop */}
          </h1>
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={`font-medium ${
              navSelected === "/" ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap`}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/products"
            className={`font-medium ${
              navSelected === "/products" ||
              navSelected.includes("product-detail")
                ? "text-blue-600"
                : "text-gray-700"
            } hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap`}
          >
            Sản phẩm
          </NavLink>
          <NavLink
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Khuyến mãi
          </NavLink>
          <NavLink
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Tin tức
          </NavLink>
          <NavLink
            to="/contact"
            className={`font-medium ${
              navSelected === "/contact" ? "text-blue-600" : "text-gray-700"
            } hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap`}
          >
            Liên hệ
          </NavLink>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm laptop..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 text-gray-500 cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-5">
          {userInfo ? (
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/cart")}
                className="text-gray-700 hover:text-blue-600 relative cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {countQuantityCart}
                </span>
              </button>
              <Popover content={content}>
                <button className="text-gray-700 hover:text-blue-600 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-user text-xl"></i>
                </button>
              </Popover>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
