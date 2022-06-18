/* eslint-disable no-unused-vars */
import create from "zustand";

export interface StateType {
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

const useStore = create<StateType>()((set) => ({
  role: 0,
  setRole: (role: number) => set({ role }),
  rcId: 0,
  setRcId: (rcId: number) => set({ rcId }),
  rcName: "",
  setRCName: (rcName: string) => set({ rcName }),
  userID: "",
  setUserID: (userID: string) => set({ userID }),
  token: "",
  setToken: (token: string) => set({ token }),
  name: "",
  setName: (name: string) => set({ name }),
}));
export default useStore;
