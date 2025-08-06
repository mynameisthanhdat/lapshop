import { create } from 'zustand'

type Store = {
  countQuantityCart: number;
  incQuantityCart: () => void;
}

export const useStore = create<Store>()((set) => ({
  countQuantityCart: 0,
  incQuantityCart: () => set((state) => ({ countQuantityCart: state.countQuantityCart + 1 })),
}))
