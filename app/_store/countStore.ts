import {create} from 'zustand';

interface CounterState {
    count: number;
    decrement: () => void;
    getCount: () => number;
}

export const useCounterStore = create<CounterState>((set, get) => ({
    count: 10, // Initial count, for example
    decrement: () => set((state) => ({ count: state.count - 1 })),
    getCount: () => get().count,
}));