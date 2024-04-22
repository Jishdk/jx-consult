import { create } from "zustand";
import type {} from "@redux-devtools/extension";
import { produce } from "immer";

interface State {
  message: string;
  setMessage(message: string): void;
  close(): void;
}

const useAlertStore = create<State>()((set) => ({
  message: "",

  setMessage(message) {
    set((state) => {
      return produce(state, (draft) => {
        draft.message = message;
      });
    });
  },

  close() {
    set((state) => {
      return produce(state, (draft) => {
        draft.message = "";
      });
    });
  },
}));

export default useAlertStore;
