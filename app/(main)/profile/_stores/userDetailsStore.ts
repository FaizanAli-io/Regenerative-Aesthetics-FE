// lib/stores/user-dialog-store.ts
import { create } from 'zustand';
import { UserDetailsRes } from '@/lib/services/user-contact-service';

interface UserDialogState {
  address: UserDetailsRes | null;
  dialogOpen: boolean;
  setAddress: (address: UserDetailsRes | null) => void;
  setDialogOpen: (open: boolean) => void;
}

export const useUserDialogStore = create<UserDialogState>(set => ({
  address: null,
  dialogOpen: false,
  setAddress: address => set({ address }),
  setDialogOpen: dialogOpen => set({ dialogOpen }),
}));
