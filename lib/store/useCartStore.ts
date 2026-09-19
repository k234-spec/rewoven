import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  sku: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  size: string;
  quantity: number;
}

export const FREE_SHIPPING_THRESHOLD = 2250;

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Drawer visibility
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Item management
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;

  // Computed calculations
  getSubtotal: () => number;
  getTotalCount: () => number;
  getFreeShippingProgress: () => {
    progress: number;
    amountNeeded: number;
    isUnlocked: boolean;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (itemToAdd) => {
        const qtyToAdd = itemToAdd.quantity ?? 1;
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.id === itemToAdd.id && item.size === itemToAdd.size
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + qtyToAdd,
            };
            return { items: updatedItems, isOpen: true };
          }

          return {
            items: [
              ...state.items,
              {
                ...itemToAdd,
                quantity: qtyToAdd,
              },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        }));
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id && item.size === size) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getTotalCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getFreeShippingProgress: () => {
        const subtotal = get().getSubtotal();
        const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
        const progress = Math.min(
          100,
          Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
        );
        return {
          progress,
          amountNeeded,
          isUnlocked: subtotal >= FREE_SHIPPING_THRESHOLD,
        };
      },
    }),
    {
      name: 'madamcutie_cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
