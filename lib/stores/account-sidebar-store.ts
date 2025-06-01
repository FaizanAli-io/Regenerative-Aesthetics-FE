import { create } from 'zustand';

interface AccountSidebarStore {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const useAccountSidebarStore = create<AccountSidebarStore>(set => ({
  activeIndex: 0,
  setActiveIndex: (index: number) => set({ activeIndex: index }),
}));

export default useAccountSidebarStore;
