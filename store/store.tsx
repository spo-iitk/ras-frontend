/* eslint-disable no-unused-vars */
import create from "zustand";
import { persist } from "zustand/middleware";

interface StateType {
  role: number;
  token: string;
  userID: string;
  rcId: number;
  rcName: string;
  name: string;
  setRole: (role: number) => void;
  setToken: (token: string) => void;
  setUserID: (user_id: string) => void;
  setRcId: (rcId: number) => void;
  setRCName: (rcName: string) => void;
  setName: (name: string) => void;
}

const useStore = create<StateType>()(
  persist(
    (set, get) => ({
      role: 0 || get()?.role,
      setRole: (role: number) => set({ role }),
      rcId: 0 || get()?.rcId,
      setRcId: (rcId: number) => set({ rcId }),
      rcName: "" || get()?.rcName,
      setRCName: (rcName: string) => set({ rcName }),
      userID: "" || get()?.userID,
      setUserID: (userID: string) => set({ userID }),
      token: "" || get()?.token,
      setToken: (token: string) => set({ token }),
      name: "" || get()?.name,
      setName: (name: string) => set({ name }),
    }),
    {
      name: "store",
    }
  )
);
export default useStore;
