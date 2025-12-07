import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AddOrEditProduct from "./components/addOrEditProduct";
import axios from "axios";
import { IProduct } from "../../components/home-type-products/homeTypeProducts.interface";
import { FadeLoader } from "react-spinners";
import { showMessage } from "../../utils/showMessage";

const ProductManagement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productSelected, setProductSelected] = useState<IProduct>();
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  const getProductsInCart = () => {
    setIsLoading(true);
    const url = `https://lapshop-be.onrender.com/api/product/all`;
    axios
      .get(url)
      .then(function (response) {
        const listItems = response.data?.data;
        setProducts(listItems);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("THAT BAI");
        setIsLoading(false);
      });
  };

  const handleDeleteProduct = (productId: string) => {
    const url = `https://lapshop-be.onrender.com/api/product/${productId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        showMessage("success", "Xóa sản phẩm thành công!");
        getProductsInCart();
        setProductSelected(undefined);
        setIsOpenModalDelete(false);
      })
      .catch(function (error) {
        showMessage("error", "Xóa sản phẩm thất bại. Vui lòng thử lại!");
        setIsOpenModalDelete(false);
      });
  };

  const handleAddOrEditProduct = (values: any) => {
    const url = productSelected ? `https://lapshop-be.onrender.com/api/product/${productSelected?._id}` : 'https://lapshop-be.onrender.com/api/product';
    // nếu có productSelected => thì gọi api EDIT ---- còn ko có productSelected => thì gọi api ADD
    axios({
      method: productSelected ? 'put' : 'post', // nếu có productSelected => thì dùng phương thức PUT (EDIT) => ko thì POST (ADD)
      url,
      data: values,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(function (response) {
        showMessage("success", productSelected ? "Cập nhật sản phẩm thành công!" : "Thêm mới sản phẩm thành công!");
        // setIsUpdating(false);
        setIsOpen(false);
        getProductsInCart();
        setProductSelected(undefined);
      })
      .catch(function (error) {
        showMessage("error", productSelected ? "Cập nhật sản phẩm thất bại!" : "Thêm mới sản phẩm thất bại!");
        setProductSelected(undefined);
        // setIsUpdating(false);
      });
  };

  useEffect(() => {
    getProductsInCart();
  }, []);

  return (
    <div className="overflow-auto">
      <div className="flex w-[calc(100vw_-_282px)] justify-between p-4">
        <p className="text-2xl font-bold text-slate-800">Quản lý sản phẩm</p>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsOpen(true)}
        >
          Thêm sản phẩm
        </Button>
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
              <th>Thương hiệu</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
            {products.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <div className="flex gap-2">
                    <EyeOutlined
                      onClick={() => setProductSelected(item)}
                      className="text-blue-700 hover:text-blue-800 cursor-pointer"
                    />
                    <DeleteOutlined
                      onClick={() => {
                        setIsOpenModalDelete(true);
                        setProductSelected(item);
                      }}
                      className="text-red-700 hover:text-red-800 cursor-pointer"
                    />
                    <EditOutlined
                      onClick={async () => {
                        await setProductSelected(item);
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
          setProductSelected(undefined);
        }}
        width={1000}
      >
        <AddOrEditProduct
          onSubmit={(values) => {
            handleAddOrEditProduct(values);
          }}
          item={productSelected as any}
        />
      </Modal>
      <Modal
        centered
        open={isOpenModalDelete}
        onCancel={() => {
          setIsOpenModalDelete(false);
          setProductSelected(undefined);
        }}
        onOk={() => handleDeleteProduct(productSelected?._id as string)}
        okText="Xóa"
        cancelText="Hủy"
        title="Bạn chắc chắn muốn xóa sản phẩm này?"
      >
        <p>
          Sản phẩm: <span className="font-bold">{productSelected?.name}</span>
        </p>
      </Modal>
    </div>
  );
};

export default ProductManagement;
