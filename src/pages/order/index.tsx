import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserInfo } from "../../store/useUserInfo";
import { OrderItem } from "../../components/order-card/card.interface";
import { FadeLoader } from "react-spinners";
import OrderCard from "../../components/order-card";
import { Tabs, Tag } from "antd";
import type { TabsProps } from "antd";

const Order = () => {
  const { userInfo } = useUserInfo();
  const [listOrders, setListOrders] = useState<OrderItem[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderStatusTabLabel = (label: string, total: number) => {
    return (
      <div className="flex gap-4">
        <p>{label}</p> <Tag color="processing">{total}</Tag>
      </div>
    );
  };

  const renderStatusListOrder = (list: OrderItem[]) => {
    return (
      <div className="flex flex-col gap-2">
        {list?.map((item, idx) => (
          <OrderCard key={idx} item={item} />
        ))}
      </div>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: renderStatusTabLabel("Tất cả", listOrders?.length as number),
      children: renderStatusListOrder(listOrders as OrderItem[]),
    },
    {
      key: "2",
      label: renderStatusTabLabel(
        "Đang xử lý",
        listOrders?.filter((item) => item.status === "pending")
          ?.length as number
      ),
      children: renderStatusListOrder(listOrders
        ?.filter((item) => item.status === "pending") as OrderItem[]),
    },
    {
      key: "3",
      label: renderStatusTabLabel(
        "Đang giao",
        listOrders?.filter((item) => item.status === "processing")
          ?.length as number
      ),
      children: renderStatusListOrder(listOrders?.filter((item) => item.status === "processing") as OrderItem[]),
    },
    {
      key: "4",
      label: renderStatusTabLabel(
        "Đã giao",
        listOrders?.filter((item) => item.status === "shipped")
          ?.length as number
      ),
      children: renderStatusListOrder(listOrders?.filter((item) => item.status === "shipped") as OrderItem[]),
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  const getOrders = async () => {
    setIsLoading(true);
    const url = `https://lapshop-be.onrender.com/api/order/${userInfo?.id}`;
    axios
      .get(url)
      .then(function (response) {
        setListOrders(response.data?.data);
        console.log("response.data: ", response.data);

        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh_-_467px)] py-8 relative">
      {isLoading ? (
        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
          <FadeLoader
            color={"#1859db"}
            loading={isLoading}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      )}
    </div>
  );
};

export default Order;
