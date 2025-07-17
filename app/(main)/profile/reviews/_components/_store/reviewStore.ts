import { create } from 'zustand';
import { UserDetailsRes } from '@/lib/services/user-contact-service';

interface ReviewStore {
  productId: number | null;
  setProductId: (id: number) => void;

  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

export const useReviewStore = create<ReviewStore>(set => ({
  productId: null,
  setProductId: productId => set({ productId }),

  dialogOpen: false,
  setDialogOpen: dialogOpen => set({ dialogOpen }),
}));
