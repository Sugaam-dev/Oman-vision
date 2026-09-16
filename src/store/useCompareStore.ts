import { create } from 'zustand';
import { Product } from '../types/product';
import { storage } from '../utils/storage';
import { initialProducts } from '../data/products';

interface CompareState {
  products: Product[];
  addProduct: (product: Product) => { success: boolean; message?: string };
  removeProduct: (productId: string) => void;
  clearCompare: () => void;
  isComparing: (productId: string) => boolean;
}

// Pre-populate with 2 products matching comparison screenshot reference:
const defaultCompare: Product[] = [
  initialProducts[0], // Dell Latitude 7450
  initialProducts[1]  // HP EliteBook 840 G10
];

export const useCompareStore = create<CompareState>((set, get) => {
  const saved = storage.get<Product[]>('compare_products', defaultCompare);

  return {
    products: saved,

    addProduct: (product) => {
      const current = get().products;
      if (current.some(p => p.id === product.id)) {
        return { success: false, message: `${product.name} is already in comparison.` };
      }
      if (current.length >= 3) {
        return { success: false, message: 'You can compare a maximum of 3 products at a time.' };
      }
      const updated = [...current, product];
      storage.set('compare_products', updated);
      set({ products: updated });
      return { success: true };
    },

    removeProduct: (productId) => {
      const updated = get().products.filter(p => p.id !== productId);
      storage.set('compare_products', updated);
      set({ products: updated });
    },

    clearCompare: () => {
      storage.set('compare_products', []);
      set({ products: [] });
    },

    isComparing: (productId) => {
      return get().products.some(p => p.id === productId);
    }
  };
});
