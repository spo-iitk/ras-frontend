import create from "zustand";

const useStore = create((set) => ({
  role: 0,
  setRole: (role: number) => set((state) => ({ ...state, role })),
}));
export default useStore;
