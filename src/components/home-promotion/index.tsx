import React from "react";

const HomePromotion = () => {
  return(
    <div className="relative my-12">
      <img src="https://laptopworld.vn/media/news/2911_Banner-anh3.jpg" alt="" className="w-full h-80 object-fill object-top rounded-2xl" />
      <div className="absolute top-[25%] px-8 py-6">
        <h2 className="text-white font-bold text-2xl">Siêu khuyến mãi tháng 7</h2>
        <p className="text-white text-lg my-4">Giảm đến 30% cho tất cả laptop gaming và văn phòng. Số lượng có hạn!</p>
        <div className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full w-fit cursor-pointer">
          Xem ngay
        </div>
      </div>
    </div>
  )
}

export default HomePromotion;