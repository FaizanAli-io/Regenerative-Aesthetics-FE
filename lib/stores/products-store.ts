import { create } from 'zustand';

enum ProductSort {
  rating = 'rating',
  popularity = 'popularity',
  price = 'price',
  date = 'date',
}

interface BearState {
  priceFilter: {
    min: number;
    max: number;
  };
  setPriceFilter: (min: number, max: number) => void;

  sortBy?: ProductSort;
  setSortBy?: (sortBy: ProductSort) => void;
}

const useProductsStore = create<BearState>()(set => ({
  priceFilter: {
    min: 1,
    max: 50,
  },
  setPriceFilter: (min: number, max: number) =>
    set(() => ({
      priceFilter: {
        min,
        max,
      },
    })),

  sortBy: ProductSort.rating,
  setSortBy: (sortBy: ProductSort) =>
    set(() => ({
      sortBy,
    })),
}));

export { useProductsStore, ProductSort };
