import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductCart {
  productId: string,
  name: string,
  price: number,
  thumbnail: string,
  quantity: number,
  _id: string,
}

type Store = {
  countQuantityCart: number;
  products: ProductCart[] | [];
  setQuantityCart: (totalProducts: number) => void;
  setProductCart: (products: ProductCart[]) => void;
}

export const useUserCart = create<Store>()(
  persist(
    (set, get) => ({
      countQuantityCart: 0,
      products: [],
      setQuantityCart: (totalProducts) => set({ countQuantityCart: totalProducts }),
      setProductCart: (products) => set({ products: products }),
    }),
    {
      name: "userCart", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
