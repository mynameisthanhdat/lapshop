import React, { useState } from "react";

const dataOptions = [
  {
    id: 1,
    label: "Gaming",
  },
  {
    id: 2,
    label: "Văn phòng",
  },
  {
    id: 3,
    label: "Đồ hoạ",
  },
  {
    id: 4,
    label: "Sinh viên",
  },
];

const HomeTypeProducts = () => {
  const [optionSelected, setOptionSelected] = useState<number>(1)
  
  return (
    <div>
      <h2>Sản Phẩm Theo Danh Mục</h2>
      <div className="flex justify-center w-full">
        <div className="flex gap-2 shadow-md rounded-full p-1 w-fit border-red-100 border">
          {dataOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => setOptionSelected(item.id)}
              className={`px-4 py-3 text-md font-semibold rounded-full cursor-pointer ${optionSelected === item.id ? "bg-blue-600 text-white" : "text-black bg-white"}`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTypeProducts;
