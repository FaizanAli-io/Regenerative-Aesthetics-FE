import { create } from 'zustand';

enum ProductSort {
  rating = 'rating',
  popularity = 'popularity',
  price = 'price',
  date = 'date',
}

type CategoryFilter = Record<string, boolean>;

interface BearState {
  priceFilter: {
    min: number;
    max: number;
  };
  setPriceFilter: (min: number, max: number) => void;

  sortBy?: ProductSort;
  setSortBy?: (sortBy: ProductSort) => void;

  categoryFilter: CategoryFilter;
  setCategoryFilter: (category: string, value: boolean) => void;
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

  categoryFilter: {},
  setCategoryFilter: (category: string, value: boolean) =>
    set(state => ({
      categoryFilter: {
        ...state.categoryFilter,
        [category]: value,
      },
    })),
}));

export { useProductsStore, ProductSort };
