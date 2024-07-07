import create from 'zustand';

interface CounterState {
    count: number;
    decrement: () => void;
    getCount: () => number;
    setCount: (newCount: number) => void;
}

export const useCounterStore = create<CounterState>((set, get) => ({
    count: 10, // Initial count, for example
    decrement: () => set((state) => ({ count: state.count - 1 })),
    getCount: () => get().count, // Using get() to access current state
    setCount: (newCount: number) => set({ count: newCount }), // Setter method for count
}));