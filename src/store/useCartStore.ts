import { create } from 'zustand';
import { Product } from '../types/product';
import { storage } from '../utils/storage';
import { calculateOrderTotals, OrderCalculation } from '../utils/calculations';
import { initialProducts } from '../data/products';
import { sanitizeImageUrl } from '../utils/imageHelper';

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selected: boolean;
}

interface CartState {
  items: CartItem[];
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleItemSelection: (productId: string) => void;
  selectAll: (selected: boolean) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  
  // Computed
  getTotals: () => OrderCalculation;
}

// Prepopulate initial cart with items matching Bulk Order screenshot:
// 1. Dell Latitude 7450 (50 units)
// 2. Ergonomic Office Chair (100 units)
// 3. Safety Helmet with Chin Strap (200 units)
const defaultInitialCart: CartItem[] = [
  {
    productId: 'prod-1',
    product: initialProducts.find(p => p.id === 'prod-1') || initialProducts[0],
    quantity: 50,
    selected: true
  },
  {
    productId: 'prod-7',
    product: initialProducts.find(p => p.id === 'prod-7') || initialProducts[6],
    quantity: 100,
    selected: true
  },
  {
    productId: 'prod-17',
    product: initialProducts.find(p => p.id === 'prod-17') || initialProducts[16],
    quantity: 200,
    selected: true
  }
];

export const useCartStore = create<CartState>((set, get) => {
  const rawSaved = storage.get<CartItem[]>('cart_items', defaultInitialCart);
  const saved = rawSaved.map(item => ({
    ...item,
    product: {
      ...item.product,
      image: sanitizeImageUrl(item.product?.image)
    }
  }));

  return {
    items: saved,

    addItem: (product, quantity = 1) => {
      const current = get().items;
      const existing = current.find(item => item.productId === product.id);
      let updated: CartItem[];

      if (existing) {
        updated = current.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity, selected: true }
            : item
        );
      } else {
        updated = [...current, { productId: product.id, product, quantity, selected: true }];
      }

      storage.set('cart_items', updated);
      set({ items: updated });
    },

    updateQuantity: (productId, quantity) => {
      const q = Math.max(0, quantity);
      const updated = get().items.map(item =>
        item.productId === productId ? { ...item, quantity: q } : item
      );
      storage.set('cart_items', updated);
      set({ items: updated });
    },

    toggleItemSelection: (productId) => {
      const updated = get().items.map(item =>
        item.productId === productId ? { ...item, selected: !item.selected } : item
      );
      storage.set('cart_items', updated);
      set({ items: updated });
    },

    selectAll: (selected) => {
      const updated = get().items.map(item => ({ ...item, selected }));
      storage.set('cart_items', updated);
      set({ items: updated });
    },

    removeItem: (productId) => {
      const updated = get().items.filter(item => item.productId !== productId);
      storage.set('cart_items', updated);
      set({ items: updated });
    },

    clearCart: () => {
      storage.set('cart_items', []);
      set({ items: [] });
    },

    getTotals: () => {
      const selectedItems = get().items.filter(item => item.selected && item.quantity > 0);
      const itemsForCalc = selectedItems.map(item => ({
        unitPrice: item.product.price,
        quantity: item.quantity
      }));
      return calculateOrderTotals(itemsForCalc);
    }
  };
});
