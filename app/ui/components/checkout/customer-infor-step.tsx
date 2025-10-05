'use client';
import { useCheckoutStore } from '@/context/checkout-store';
import { useFormik } from 'formik';
import { customerInfoValidation } from '@/lib/validation/customerInfoValidation';

// Subcomponents
import ContactInfo from './contact-info';
import DeliveryAddress from './delivery-address';
import PaymentMethod from './paymentMethod';
import OrderNotes from './order-notes';

export default function CustomerInfoStep() {
  const { setCustomerInfo, placeOrder, isLoading } = useCheckoutStore();

  const formik = useFormik({
    initialValues: {
      customerEmail: '',
      customerPhone: '',
      street: '',
      city: '',
      town: '',
      zipCode: '',
      country: 'Kenya',
      paymentMethod: 'cash_on_delivery',
      notes: ''
    },
    validate: customerInfoValidation,
    onSubmit: async (values) => {
      setCustomerInfo(values);
      await placeOrder();
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Customer Information</h2>
        <p className="text-gray-600">
          We&apos;ll use this information to deliver your order and contact you.
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800">Payment on Delivery</h3>
        <p className="text-sm text-blue-700 mt-1">
          You&apos;ll pay for your order when it&apos;s delivered to your address.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <ContactInfo formik={formik} />
        <DeliveryAddress formik={formik} />
        <PaymentMethod formik={formik} />
        <OrderNotes formik={formik} />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className="bg-button-default text-white px-8 py-3  hover:cursor-pointer rounded-lg hover:bg-button-hover transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
