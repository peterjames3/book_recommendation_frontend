import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  imageUrl?: string;
  price?: number;
  availability: 'available' | 'out_of_stock' | 'pre_order';
}

export interface CartItem {
  id: string;
  userId: string;
  bookId: string;
  book: Book;
  quantity: number;
  createdAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartState {
  cart: Cart;
  isLoading: boolean;
  error: string | null;
}

interface CartActions {
  loadCart: () => Promise<void>;
  addToCart: (bookId: string, quantity?: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartCount: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      cart: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      },
      isLoading: false,
      error: null,

      // Actions
      loadCart: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await cartApi.getCart();
          
          if (response.success && response.data) {
            set({
              cart: response.data,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || 'Failed to load cart');
          }
        } catch (error: any) {
          // If user is not authenticated, just set empty cart
          if (error.response?.status === 401) {
            set({
              cart: {
                items: [],
                totalItems: 0,
                totalPrice: 0,
              },
              isLoading: false,
              error: null,
            });
          } else {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to load cart';
            set({
              isLoading: false,
              error: errorMessage,
            });
          }
        }
      },

      addToCart: async (bookId: string, quantity: number = 1) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await cartApi.addToCart(bookId, quantity);
          
          if (response.success) {
            // Reload cart to get updated data
            await get().loadCart();
            toast.success('Book added to cart!');
          } else {
            throw new Error(response.message || 'Failed to add book to cart');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to add book to cart';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
          throw error;
        }
      },

      updateCartItem: async (itemId: string, quantity: number) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await cartApi.updateCartItem(itemId, quantity);
          
          if (response.success) {
            // Reload cart to get updated data
            await get().loadCart();
            toast.success('Cart updated!');
          } else {
            throw new Error(response.message || 'Failed to update cart item');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to update cart item';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
          throw error;
        }
      },

      removeFromCart: async (itemId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await cartApi.removeFromCart(itemId);
          
          if (response.success) {
            // Reload cart to get updated data
            await get().loadCart();
            toast.success('Book removed from cart!');
          } else {
            throw new Error(response.message || 'Failed to remove book from cart');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to remove book from cart';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
          throw error;
        }
      },

      clearCart: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await cartApi.clearCart();
          
          if (response.success) {
            set({
              cart: {
                items: [],
                totalItems: 0,
                totalPrice: 0,
              },
              isLoading: false,
              error: null,
            });
            toast.success('Cart cleared!');
          } else {
            throw new Error(response.message || 'Failed to clear cart');
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Failed to clear cart';
          set({
            isLoading: false,
            error: errorMessage,
          });
          toast.error(errorMessage);
          throw error;
        }
      },

      getCartCount: async () => {
        try {
          const response = await cartApi.getCartCount();
          
          if (response.success && response.data) {
            // Update only the total items count
            set((state) => ({
              cart: {
                ...state.cart,
                totalItems: response.data.count,
              },
            }));
          }
        } catch (error: any) {
          // Silently fail for cart count - not critical
          console.error('Failed to get cart count:', error);
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);

// Helper functions
export const getCartItemCount = (cart: Cart): number => {
  return cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const getCartTotal = (cart: Cart): number => {
  return cart.items.reduce((total, item) => {
    const price = item.book.price || 0;
    return total + (price * item.quantity);
  }, 0);
};

export const isBookInCart = (cart: Cart, bookId: string): boolean => {
  return cart.items.some(item => item.bookId === bookId);
};

export const getCartItemByBookId = (cart: Cart, bookId: string): CartItem | undefined => {
  return cart.items.find(item => item.bookId === bookId);
};