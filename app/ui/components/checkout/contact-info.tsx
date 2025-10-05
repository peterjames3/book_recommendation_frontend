import { InputField } from '../auth/input-fields';
import { Mail, Phone } from 'lucide-react';
import { FormikProps } from 'formik';
import { FormValues } from '@/lib/validation/customerInfoValidation';


interface ContactInfoProps {
  formik: FormikProps<FormValues>;
}

export default function ContactInfo({ formik }: ContactInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="customerEmail"
          label="Email"
          type="email"
          icon={Mail}
          field={formik.getFieldProps("customerEmail")}
          error={formik.errors.customerEmail}
          touched={formik.touched.customerEmail}
          placeholder="johndoe@gmail.com"
        />
        <InputField
          id="customerPhone"
          label="Phone Number"
          type="tel"
          icon={Phone}
          field={formik.getFieldProps("customerPhone")}
          error={formik.errors.customerPhone}
          touched={formik.touched.customerPhone}
          placeholder="+254712345678"
        />
      </div>
    </div>
  );
}
