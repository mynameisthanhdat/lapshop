export const dataOptions:IOption[] = [
  {
    id: 1,
    label: "Gaming",
    value: 'gaming',
  },
  {
    id: 2,
    label: "Văn phòng",
    value: 'office',
  },
  {
    id: 3,
    label: "Đồ hoạ",
    value: 'design',
  },
  {
    id: 4,
    label: "Sinh viên",
    value: 'student',
  },
];

export interface IOption {
  id: string | number;
  label: string;
  value: string;
}

interface ISpec {
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
}

export interface IProduct {
  name: string;
  image: string;
  discount: number;
  price: number;
  oldPrice: number;
  isHot: boolean;
  // specs: {
  //   cpu: string,
  //   ram: string,
  //   storage: string,
  //   gpu: string,
  // },
  specs: ISpec;
  brand: string;
  category: string;
}