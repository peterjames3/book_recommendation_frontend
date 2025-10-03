// app/ui/cart-icon.tsx
'use client';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/context/cart-store';
import { useState, useEffect } from 'react';
import CartDropdown from './cart-dropdown';

export default function CartIcon() {
  const { cart, loadCart } = useCartStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load cart on component mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative p-2 text-gray-600 hover:text-text transition-colors hover:cursor-pointer"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-6 w-6" />
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-background text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cart.totalItems > 99 ? '99+' : cart.totalItems}
          </span>
        )}
      </button>
      
      {isDropdownOpen && (
        <CartDropdown onClose={() => setIsDropdownOpen(false)} />
      )}
    </div>
  );
}