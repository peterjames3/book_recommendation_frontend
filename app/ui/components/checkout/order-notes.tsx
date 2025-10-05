'use client';
import { FormikProps } from 'formik';
import { FormValues } from '@/lib/validation/customerInfoValidation';



interface OrderNotesProps {
  formik: FormikProps<FormValues>;
}


export default function OrderNotes({ formik }: OrderNotesProps) {
  return (
    <div>
      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
        Delivery Notes (Optional)
      </label>
      <textarea
        id="notes"
        name="notes"
        value={formik.values.notes}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Any special delivery instructions, building access codes, etc."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
      />
    </div>
  );
}
