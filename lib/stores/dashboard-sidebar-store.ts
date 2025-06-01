import { create } from 'zustand';

interface Props {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const store = create<Props>(set => ({
  activeIndex: 0,
  setActiveIndex: (index: number) => set({ activeIndex: index }),
}));

export default store;
