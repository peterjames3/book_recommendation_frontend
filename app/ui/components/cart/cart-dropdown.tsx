// app/ui/cart-dropdown.tsx
'use client';
import { useCartStore } from '@/context/cart-store';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface CartDropdownProps {
  onClose: () => void;
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  const { cart, updateCartItem, removeFromCart, clearCart, isLoading } = useCartStore();

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeFromCart(itemId);
    } else {
      await updateCartItem(itemId, newQuantity);
    }
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading cart...</p>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Your cart is empty</p>
            <Link
              href="/explore"
              onClick={onClose}
              className="inline-block mt-3 px-4 py-2 bg-primary text-white rounded hover:bg-button-hover transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-100">
                  <Image
                    src={item.book.imageUrl || '/default-book-image.png'}
                    alt={item.book.title}
                    width={50}
                    height={70}
                    className="w-12 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.book.title}</h4>
                    <p className="text-xs text-gray-500">
                      {item.book.authors?.join(', ')}
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      ${(item.book.price || 0)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={isLoading}
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={isLoading}
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    disabled={isLoading}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">${cart.totalPrice}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleClearCart}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Clear Cart
                </button>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-center"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}