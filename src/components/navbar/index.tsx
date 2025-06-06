import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/imgs/logo.png";

const Navbar = () => {
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
            className="font-medium text-blue-600 cursor-pointer whitespace-nowrap"
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/"
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
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
            className="font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
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
          <button className="text-gray-700 hover:text-blue-600 relative cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-shopping-cart text-xl"></i>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="text-gray-700 hover:text-blue-600 cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-user text-xl"></i>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
            Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
