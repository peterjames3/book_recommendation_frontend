
export interface FormValues {
  street:string;
  city: string;
  town:string;
  zipCode:string;
  country:string;
  paymentMethod: string;
  customerEmail:string;
  customerPhone: string;
  notes: string;
} 

export const customerInfoValidation = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if(!values.street){
    errors.street = 'street is required'
  }
    if(!values.city){
    errors.city = 'City is required'
  } else if (!/^[A-Za-z]+$/.test(values.city)) {
    errors.city = "City must only contain letters (no numbers or symbols)";
  }
    if(!values.town){
    errors.town = 'Town is required'
  } else if (!/^[A-Za-z]+$/.test(values.town)) {
    errors.town = "Town must only contain letters (no numbers or symbols)";
  }
     if(!values.zipCode){
    errors.zipCode = 'zipCode is required'
  }

  if (!values.customerEmail) {
    errors.customerEmail = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.customerEmail)) {
    errors.customerEmail = "Invalid email address";
  }
    if (!values.customerPhone) {
    errors.customerPhone = "Phone is required";
  } 

  if (!values.paymentMethod) {
    errors.paymentMethod = "Password is required";
  } 


  return errors;
};
