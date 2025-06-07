import React from "react";
import { Carousel } from "antd";

const HomeBanner = () => {
  return (
    <Carousel autoplay arrows={true}>
      <div className="relative h-[500px] overflow-hidden">
        <img
          src="https://laptop678.vn/wp-content/uploads/2024/05/slide5.jpg"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-lg text-white">
              <h2 className="text-4xl font-bold mb-4">
                Laptop Gaming Mới Nhất
              </h2>
              <p className="text-lg mb-6">
                Trải nghiệm hiệu năng vượt trội với bộ sưu tập laptop gaming cao
                cấp 2025
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  Khám phá ngay
                </button>
                {/* <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  Xem thêm
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[500px] overflow-hidden">
        <img
          src="https://teratron.tech/wp-content/uploads/2023/06/banner-laptop-thanh-ly-gia-re-final.jpg"
          alt="Laptop Văn Phòng Cao Cấp"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-lg text-white">
              <h2 className="text-4xl font-bold mb-4">
                Laptop Văn Phòng Cao Cấp
              </h2>
              <p className="text-lg mb-6">
                Mỏng nhẹ, thời trang và hiệu suất mạnh mẽ cho công việc hàng
                ngày
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  Mua ngay
                </button>
                {/* <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  Tìm hiểu thêm
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[500px] overflow-hidden">
        <img
          src="https://phuongtin.vn/wp-content/uploads/2025/03/banner-phuong-tin-laptop-do-hoa.jpg"
          alt="Laptop Đồ Họa Chuyên Nghiệp"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-lg text-white">
              <h2 className="text-4xl font-bold mb-4">
                Laptop Đồ Họa Chuyên Nghiệp
              </h2>
              <p className="text-lg mb-6">
                Màn hình sắc nét, hiệu suất mạnh mẽ dành cho các nhà thiết kế
                sáng tạo
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  Xem sản phẩm
                </button>
                {/* <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                  So sánh mẫu
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default HomeBanner;
