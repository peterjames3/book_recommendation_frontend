// app/checkout/page.tsx
'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/context/cart-store';
import { useCheckoutStore } from '@/context/checkout-store';
import CheckoutSteps from '@/app/ui/components/checkout/checkout-steps';
import CustomerInfoStep from '@/app/ui/components/checkout/customer-infor-step';
import SuccessStep from '@/app/ui/components/checkout/success-step';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loadCart } = useCartStore();
  const { currentStep, calculateOrderSummary } = useCheckoutStore();

  // Load cart and calculate order summary on component mount
  useEffect(() => {
    loadCart().then(() => {
      if (cart.totalPrice > 0) {
        calculateOrderSummary(cart.totalPrice);
      }
    });
  }, [loadCart, calculateOrderSummary, cart.totalPrice]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0 && currentStep !== 2) {
      router.push('/dashboard');
    }
  }, [cart.items.length, currentStep, router]);

  if (cart.items.length === 0 && currentStep !== 2) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some books to your cart before checking out.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Checkout Steps */}
        <CheckoutSteps currentStep={currentStep} />
        
        {/* Step Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && <CustomerInfoStep />}
            {currentStep === 2 && <SuccessStep />}
          </div>
          
          {/* Order Summary Sidebar - Show for step 1 only */}
          {currentStep === 1 && (
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Order Summary Component
function OrderSummary() {
  const { cart } = useCartStore();
  const { orderSummary } = useCheckoutStore();

  if (!orderSummary) return null;

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
      <h3 className="title font-semibold mb-4">Order Summary</h3>
      
      {/* Items */}
      <div className="space-y-3 mb-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                {item.book.title}
              </p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-medium text-gray-900 ml-4">
              ${((item.book.price || 0) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Payment Method Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
        <p className="text-sm text-yellow-800">
          <strong>Payment on Delivery</strong> - You&apos;ll pay when your order arrives
        </p>
      </div>
      
      {/* Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${orderSummary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{orderSummary.shipping === 0 ? 'Free' : `$${orderSummary.shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${orderSummary.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>${orderSummary.total.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}