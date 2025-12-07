import React, { useState } from "react";
import { OrderItem } from "../../../components/order-card/card.interface";
import axios from "axios";
import { showMessage } from "../../../utils/showMessage";
import { Button, Select } from "antd";

interface Props {
  orderSelected: OrderItem;
  refetch: () => void; // hàm refetch để cập nhật danh sách đơn hàng
  setIsOpen: (val: boolean) => void; // dùng function setIsOpen để tắt modal
}

const optionStatus = [
  {
    label: "Đang xử lý",
    value: "pending",
  },
  {
    label: "Đang giao",
    value: "processing",
  },
  {
    label: "Đã giao",
    value: "shipped",
  },
];

const EditOrder = (props: Props) => {
  const { orderSelected, refetch, setIsOpen } = props;
  const [statusSelected, setStatusSelected] = useState<string>(
    orderSelected.status
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  const handleEditOrder = () => {
    setIsUpdating(true);
    const url = `https://lapshop-be.onrender.com/api/admin/order/${orderSelected?._id}`;
    axios
      .put(
        url,
        {
          status: statusSelected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        showMessage("success", "Cập nhật trạng thái đơn hàng thành công!");
        setIsUpdating(false);
        setIsOpen(false);
        refetch();
      })
      .catch(function (error) {
        showMessage("error", "Cập nhật trạng thái đơn hàng thất bại!");
        setIsUpdating(false);
      });
  };

  return (
    <div>
      <p className="mt-2">
        Sản phẩm:{" "}
        <span className="font-bold">{orderSelected?.products[0].name}</span>
      </p>
      <p className="mt-2">
        Khách hàng:{" "}
        <span className="font-bold">
          {orderSelected?.shippingAddress?.name}
        </span>
      </p>
      <p className="mt-2">
        Số điện thoại:{" "}
        <span className="font-bold">
          {orderSelected?.shippingAddress?.phone}
        </span>
      </p>
      <p className="mt-2">
        Địa chỉ giao hàng:{" "}
        <span className="font-bold">
          {orderSelected?.shippingAddress?.address}
        </span>
      </p>
      <p className="mt-2">
        Giá:{" "}
        <span className="font-bold text-red-700">
          {orderSelected?.totalPrice}
        </span>
      </p>
      <div className="flex justify-start gap-4">
        <p className="mt-3 font-bold">Trạng thái: </p>
        <Select
          options={optionStatus}
          value={statusSelected}
          onChange={(value) => {
            setStatusSelected(value);
          }}
          className="mt-2"
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button type="primary" loading={isUpdating} onClick={handleEditOrder}>
          Cập nhật
        </Button>
      </div>
    </div>
  );
};

export default EditOrder;
