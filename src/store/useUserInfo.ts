import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserInfo {
  address?: string;
  email?: string;
  id: string;
  name: string;
  phone: string;
  role: string;
}

type Store = {
  useInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
};

export const useUserInfo = create<Store>()(
  persist(
    (set, get) => ({
      useInfo: null,
      setUserInfo: (info) => set({ useInfo: info }),
    }),
    {
      name: "userInfo", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
