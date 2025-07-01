import { CheckboxOptionType } from "antd";

export const categories = [
  { id: "all", name: "Tất cả" },
  { id: "gaming", name: "Gaming" },
  { id: "office", name: "Văn phòng" },
  { id: "design", name: "Đồ họa" },
  { id: "student", name: "Sinh viên" },
];

export const brands: CheckboxOptionType<string>[] = [
  { label: "Dell", value: "dell" },
  { label: "HP", value: "hp" },
  { label: "Lenovo", value: "lenovo" },
  { label: "Asus", value: "asus" },
  { label: "Acer", value: "acer" },
  { label: "MSI", value: "msi" },
  { label: "Apple", value: "apple" },
  { label: "Gigabyte", value: "gigabyte" },
];

export const configuration = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "i3",
    label: "Intel Core i3",
  },
  {
    value: "i5",
    label: "Intel Core i5",
  },
  {
    value: "i7",
    label: "Intel Core i7",
  },
  {
    value: "i9",
    label: "Intel Core i9",
  },
  {
    value: "ryzen5",
    label: "AMD Ryzen 5",
  },
  {
    value: "ryzen7",
    label: "AMD Ryzen 7",
  },
  {
    value: "ryzen9",
    label: "AMD Ryzen 9",
  },
  {
    value: "m1",
    label: "Apple M1",
  },
  {
    value: "m2",
    label: "Apple M2",
  },
  {
    value: "m3",
    label: "Apple M3",
  },
];

export const ram = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "8gb",
    label: "8GB",
  },
  {
    value: "16gb",
    label: "16GB",
  },
  {
    value: "24gb",
    label: "24GB",
  },
  {
    value: "32gb",
    label: "32GB",
  },
];

export const gpu = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "integrated",
    label: "Card onboard",
  },
  {
    value: "gtx",
    label: "NVIDIA GTX Series",
  },
  {
    value: "rtx",
    label: "NVIDIA RTX Series",
  },
  {
    value: "radeon",
    label: "AMD Radeon",
  },
  {
    value: "apple",
    label: "Apple GPU",
  },
];

export const storage = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: "256gb",
    label: "SSD 256GB",
  },
  {
    value: "512gb",
    label: "SSD 512GB",
  },
  {
    value: "1tb",
    label: "SSD 1TB",
  },
  {
    value: "2tb",
    label: "SSD 2TB",
  },
];

export const sorting = [
  {
    value: "newest",
    label: "Mới nhất",
  },
  {
    value: "price-asc",
    label: "Giá tăng dần",
  },
  {
    value: "price-desc",
    label: "Giá giảm dần",
  },
]