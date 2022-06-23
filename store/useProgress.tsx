/* eslint-disable no-unused-vars */
import create from "zustand";

type progress_params = {
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
};
export const useProgressStore = create<progress_params>((set) => ({
  isAnimating: false,
  setIsAnimating: (isAnimating) => set(() => ({ isAnimating })),
}));

export default useProgressStore;
