import {create} from 'zustand';

interface CounterState {
  count: number;
  decrement: () => void;
  getCount: () => number;
}

let count = 10;

export const useCounterStore = create<CounterState>((set, get) => ({
  count,
  decrement: () => set(() => {
    if (count > 0) {
      count -= 1;
    }
    return { count };
  }),
  getCount: () => get().count,
}));