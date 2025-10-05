import { InputField } from '../auth/input-fields';
import { Home, MapPin, Navigation, Globe } from 'lucide-react';
import { FormikProps } from 'formik';
import { FormValues } from '@/lib/validation/customerInfoValidation';



interface DeliveryAddressProps {
  formik: FormikProps<FormValues>;
}

export default function DeliveryAddress({ formik }: DeliveryAddressProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
      <div className="space-y-4">
        <InputField
          id="street"
          label="Street Address"
          type="text"
          icon={Home}
          field={formik.getFieldProps("street")}
          error={formik.errors.street}
          touched={formik.touched.street}
          placeholder="123 Moi Avenue"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            id="city"
            label="City"
            type="text"
            icon={MapPin}
            field={formik.getFieldProps("city")}
            error={formik.errors.city}
            touched={formik.touched.city}
            placeholder="Nairobi"
          />
          <InputField
            id="town"
            label="Town"
            type="text"
            icon={Navigation}
            field={formik.getFieldProps("town")}
            error={formik.errors.town}
            touched={formik.touched.town}
            placeholder="Westlands"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            id="zipCode"
            label="ZIP Code"
            type="text"
            icon={MapPin}
            field={formik.getFieldProps("zipCode")}
            error={formik.errors.zipCode}
            touched={formik.touched.zipCode}
            placeholder="00100"
          />
          <InputField
            id="country"
            label="country"
            type="text"
            icon={Globe}
            field={formik.getFieldProps("country")}
            error={formik.errors.country}
            touched={formik.touched.country}
            placeholder="Kenya"
          />
          <div>
           
            <div className="relative">
             
            
            </div>
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.country}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
