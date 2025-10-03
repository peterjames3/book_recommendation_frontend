// app/ui/add-to-cart-button.tsx
'use client';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/context/cart-store';
import { Book } from '@/context/books-store';

interface AddToCartButtonProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function AddToCartButton({ 
  book, 
  size = 'md', 
  variant = 'primary' 
}: AddToCartButtonProps) {
  const { addToCart, cart, isLoading: isCartLoading } = useCartStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!book || !book.price) return;
    
    setIsAddingToCart(true);
    try {
      await addToCart(book.id);
    } catch (error) {
      // Error is already handled in the store
    } finally {
      setIsAddingToCart(false);
    }
  };

  const isInCart = cart.items.some(item => item.bookId === book.id);
  const cartItem = cart.items.find(item => item.bookId === book.id);

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  const disabledClasses = 'bg-gray-400 text-white cursor-not-allowed';

  // Button content based on state
  const getButtonContent = () => {
    if (isAddingToCart || isCartLoading) {
      return (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Adding...
        </>
      );
    }

    if (isInCart) {
      return (
        <>
          <ShoppingCart className="h-4 w-4" />
          Added ({cartItem?.quantity})
        </>
      );
    }

    return (
      <>
        <ShoppingCart className="h-4 w-4" />
        Add to Cart
      </>
    );
  };

  // Determine if button should be disabled
  const isDisabled = 
    isAddingToCart || 
    isCartLoading || 
    !book.price || 
    book.availability !== 'available';

  // Determine button classes
  const buttonClasses = `
    flex items-center gap-2 rounded-lg transition-colors font-medium
    ${sizeClasses[size]}
    ${isDisabled ? disabledClasses : variantClasses[variant]}
  `;

  if (book.availability !== 'available') {
    return (
      <button
        disabled
        className={buttonClasses}
      >
        <ShoppingCart className="h-4 w-4" />
        {book.availability === 'out_of_stock' ? 'Out of Stock' : 'Pre-order'}
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={buttonClasses}
      aria-label={isInCart ? `Added to cart, quantity: ${cartItem?.quantity}` : 'Add to cart'}
    >
      {getButtonContent()}
    </button>
  );
}