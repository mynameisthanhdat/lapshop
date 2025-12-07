import React, { useEffect, useState } from "react";
import { Button, Modal, Tag } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import EditOrder from "./components/EditOrder";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import {
  OrderItem,
} from "../../components/order-card/card.interface";

const OrderManagement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderSelected, setOrderSelected] = useState<OrderItem>();

  const renderTagStatus = (status: string) => {
    switch (status) {
      case "pending":
        return  <Tag color="blue">Đang xử lý</Tag>;
      case "processing":
        return <Tag color="purple">Đang giao</Tag>;
      default:
        return <Tag color="green">Đã giao</Tag>;
    }
  }

  const getOrders = () => {
    setIsLoading(true);
    const url = `https://lapshop-be.onrender.com/api/admin/order`;
    axios
      .get(url)
      .then(function (response) {
        const listItems = response.data?.data;
        setOrders(listItems);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("THAT BAI");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="overflow-auto">
      <div className="flex w-[calc(100vw_-_282px)] justify-between p-4">
        <p className="text-2xl font-bold text-slate-800">Quản lý đơn hàng</p>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <FadeLoader color={"#1859db"} />
        </div>
      ) : (
        <div className="p-4 pt-0">
          <table>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Địa chỉ giao hàng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
            {orders.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <img
                    src={item.products[0].thumbnail}
                    alt=""
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td>{item.products[0].name}</td>
                <td>{item.products[0].quantity}</td>
                <td>{item.products[0].price}</td>
                <td>{item.shippingAddress.address}</td>
                <td>{renderTagStatus(item.status)}</td>
                <td>
                  <div className="flex gap-2">
                    <EditOutlined
                      onClick={async () => {
                        await setOrderSelected(item);
                        await setIsOpen(true);
                      }}
                      className="text-green-700 hover:text-green-800 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
      <Modal
        centered
        open={isOpen}
        footer={false}
        onCancel={() => {
          setIsOpen(false);
          setOrderSelected(undefined);
        }}
        title="Cập nhật trạng thái"
        width={600}
      >
        <EditOrder
          orderSelected={orderSelected as OrderItem}
          refetch={getOrders}
          setIsOpen={setIsOpen}
        />
      </Modal>
    </div>
  );
};

export default OrderManagement;
