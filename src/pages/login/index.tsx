import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Logic xử lý đăng nhập thực tế sẽ ở đây
    console.log("Thông tin:", { username, password });
    const loginUrl = "https://lapshop-be.onrender.com/api/auth/login";

    // const payload = {
    //   username: username,
    //   password: password
    // }

    axios
      .post(loginUrl, {
        username, // username: 'value'
        password, // password: 'value'
      })
      .then(function (response) {
        console.log("THANH CONG: ", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      })
      .catch(function (error) {
        console.log("THAT BAI");
      });
  };

  return (
    // Nền gradient toàn màn hình (trending)
    <div
      className="min-h-screen flex items-center justify-center p-4 
                    bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200"
    >
      {/* Khối Glassmorphism (Kính mờ) */}
      <div
        className="w-full max-w-md p-8 
                      bg-white border border-gray border-opacity-30 
                      rounded-2xl shadow-2xl transition duration-500 hover:shadow-3xl"
      >
        <h2 className="text-4xl text-purple-900 text-center mb-8 tracking-wider font-bold">
          Lapshop
        </h2>

        <form>
          {/* Input: Username */}
          <label className="text-gray-400 text-sm">Tên đăng nhập</label>
          <div className="mb-6 mt-1">
            <Input
              placeholder="Tên đăng nhập hoặc Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 
                         border border-blue-600 border-opacity-20 focus:outline-none focus:ring-2 
                         focus:ring-white focus:ring-opacity-50 transition duration-300
                         font-light"
            />
          </div>

          {/* Input: Password */}
          <label className="text-gray-400 text-sm">Mật khẩu</label>
          <div className="mb-8 mt-1">
            <Input.Password
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 
                         border border-blue-600 border-opacity-20 focus:outline-none focus:ring-2 
                         focus:ring-white focus:ring-opacity-50 transition duration-300
                         font-light"
            />
          </div>
        </form>

        {/* Button: Đăng nhập */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full p-3 bg-gray-100 text-purple-600 rounded-lg font-bold 
                       hover:bg-gray-200 hover:shadow-lg transition duration-300 transform 
                       hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
        >
          Đăng nhập
        </button>
        <div className="w-full h-2 border-b border-purple-400 mt-6" />

        {/* Liên kết Đăng ký và Quên mật khẩu */}
        <div className="flex justify-between mt-6 text-sm text-purple-500 font-bold">
          {/* Link Đăng ký */}
          <a
            href="/register"
            className="opacity-80 hover:opacity-100 hover:underline transition duration-300"
          >
            Tạo tài khoản mới (Đăng ký)
          </a>

          {/* Link Quên mật khẩu */}
          <a
            href="/forgot-password"
            className="opacity-80 hover:opacity-100 hover:underline transition duration-300"
          >
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
