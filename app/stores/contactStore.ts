import { create } from "zustand";
import type {} from "@redux-devtools/extension";
import { produce } from "immer";
import { nanoid } from "nanoid";

interface State {
  isRequestingQuote: string | null;
  setIsRequestingQuote(): void;
}

const useContactStore = create<State>()((set) => ({
  isRequestingQuote: null,

  setIsRequestingQuote() {
    set((state) => {
      return produce(state, (draft) => {
        draft.isRequestingQuote = nanoid();
      });
    });
  },
}));

export default useContactStore;
