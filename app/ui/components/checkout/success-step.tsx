// app/ui/checkout/success-step.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/context/cart-store';
import { useCheckoutStore } from '@/context/checkout-store';
import { CheckCircle, Truck, Phone, Mail } from 'lucide-react';

export default function SuccessStep() {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const { clearCheckout, customerInfo } = useCheckoutStore();

  // Clear cart and checkout data on success
  useEffect(() => {
    clearCart();
    // Don't clear checkout immediately so we can show the success info
  }, [clearCart]);

  const handleContinue = () => {
    clearCheckout();
    router.push('/dashboard');
  };

  return (
    <div className=" w-full mt-2  max-w-full mx-auto md:max-w-[840px] xl:max-w-[1040] lg:w-[1240px] bg-white rounded-md border border-accent3 py-4 px-2 shadow-sm ">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your order. You&apos;ll pay when your books are delivered.
        </p>
      </div>

      {/* Delivery Information */}
      {customerInfo && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Contact Details</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{customerInfo.customerEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700">{customerInfo.customerPhone}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Delivery Address</h4>
              <div className="text-gray-700">
                <p>{customerInfo.street}</p>
                <p>{customerInfo.city}, {customerInfo.town} {customerInfo.zipCode}</p>
                <p>{customerInfo.country}</p>
              </div>
            </div>
          </div>

          {customerInfo.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Delivery Notes</h4>
              <p className="text-gray-700">{customerInfo.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">What happens next?</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>We&apos;ll contact you within 24 hours to confirm your order</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>Your books will be delivered within 3-5 business days</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <span>You&apos;ll pay the delivery person when you receive your order</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-center gap-4">
       
        <button
          onClick={handleContinue}
          className="bg-button-default text-white px-6 py-3 rounded-lg hover:bg-button-hover hover:cursor-pointer transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}