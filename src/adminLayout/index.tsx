import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[250px] bg-slate-800 h-screen flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-green-600 text-center py-6">
          <NavLink to="/" className="w-12 h-12 rounded-[50%] cursor-pointer">
            <p>HOME</p>
          </NavLink>
        </h1>
        <NavLink
          to="/admin/product-management"
          className={`text-white transition-colors cursor-pointer whitespace-nowrap bg-green-600 hover:bg-green-500 rounded-md py-2 px-3 font-bold w-[230px] ml-[10px]`}
        >
          Quản lý sản phẩm
        </NavLink>
        <NavLink
          to="/admin/order-management"
          className={`text-white transition-colors cursor-pointer whitespace-nowrap bg-green-600 hover:bg-green-500 rounded-md py-2 px-3 font-bold w-[230px] ml-[10px]`}
        >
          Quản lý đơn hàng
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
