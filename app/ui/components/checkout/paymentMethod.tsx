'use client';
import { CreditCard } from 'lucide-react';
import { FormikProps } from 'formik';
import { FormValues } from '@/lib/validation/customerInfoValidation';



interface PaymentMethodProps {
  formik: FormikProps<FormValues>;
}

export default function PaymentMethod({ formik }: PaymentMethodProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="cash_on_delivery"
            name="paymentMethod"
            value="cash_on_delivery"
            checked={formik.values.paymentMethod === 'cash_on_delivery'}
            onChange={formik.handleChange}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
          />
          <label htmlFor="cash_on_delivery" className="ml-3 flex items-center">
            <CreditCard className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <span className="block text-sm font-medium text-gray-900">
                Cash On Delivery
              </span>
              <span className="block text-sm text-gray-500">
                Pay when you receive your order
              </span>
            </div>
          </label>
        </div>
      </div>
      {formik.touched.paymentMethod && formik.errors.paymentMethod && (
        <p className="text-red-500 text-sm mt-1">{formik.errors.paymentMethod}</p>
      )}
    </div>
  );
}
