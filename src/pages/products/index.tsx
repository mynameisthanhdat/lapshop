import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Select } from "antd";

const items = [
  {
    href: "/",
    title: <HomeOutlined />,
  },
  {
    title: "Sản phẩm",
  },
];

const Products = () => {
  return (
    <div>
      <Breadcrumb items={items} />
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="label"
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "tom",
            label: "Tom",
          },
        ]}
      />
      <p>PRODUCTS</p>
    </div>
  );
};

export default Products;
