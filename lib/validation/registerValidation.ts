
export interface FormValues {
  firstName: string;  
  lastName: string;
  email: string;
  password: string;
} 

export const validateRegister = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if(!values.firstName){
    errors.firstName = 'Firstname is required'
  } else if (!/^[A-Za-z]+$/.test(values.firstName)) {
    errors.firstName = "FirstName must only contain letters (no numbers or symbols)";
  }
    if(!values.lastName){
    errors.lastName = 'LastName is required'
  } else if (!/^[A-Za-z]+$/.test(values.lastName)) {
    errors.lastName = "LastName must only contain letters (no numbers or symbols)";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
