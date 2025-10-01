// app/signup/page.tsx
'use client';

import { Mail,  User } from 'lucide-react'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/context/auth-store';
import Image from 'next/image';
import { validateRegister } from "@/lib/validation/registerValidation"
import { InputField } from '@/app/ui/components/auth/input-fields'
import { PasswordField } from "@/app/ui/components/auth/password-field";
export default function SignupPage() {
const { register, isLoading, clearError } = useAuthStore();
 const router = useRouter();

 const formik = useFormik({
     initialValues: { firstName: '', lastName: '', email: "", password: "" },
     validate: validateRegister,
     onSubmit: async (values, { setSubmitting, setErrors }) => {
       try {
         clearError();
         formik.resetForm()
         await register(values);
         router.push("/onboarding");
       } catch (error: unknown) {
         const errorMessage = (error as { message?: string })?.message || "Login failed";
         if (errorMessage.toLowerCase().includes("invalid")) {
           setErrors({ email: "Invalid email or password", password: "Invalid email or password" });
         } else {
           setErrors({ email: "Login failed", password: "Login failed" });
         }
       } finally {
         setSubmitting(false);
       }
     },
   });
 


  return (
    <div className="min-h-screen bg-accent2 flex items-center justify-center p-4">
      <div className='w-full mx-auto max-w-full md:max-w-[840px] xl:max-w-[1040px] px-4 md:px-0 mt-[7rem] py-12 md:flex items-center gap-10'>
        <div className="w-full md:w-1/2 px-2">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              LitKenya
            </h1>
            <p className="text-gray-600 text-lg">
              Explore books. Experience worlds.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <Link
              href="/login"
              className="flex-1 text-center py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="flex-1 text-center py-2 text-normalText font-semibold border-b-2 border-normalText"
            >
              Sign Up
            </Link>

          </div>

          {/* Form */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Begin your adventure
            </h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <InputField
              id='firstName'
              label='firstName'
              icon={User}
              field={formik.getFieldProps('firstName')}
              placeholder='John'
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
            />
            <InputField
              id='lastName'
              label='lastName'
              icon={User}
              field={formik.getFieldProps('lastName')}
              placeholder='Doe'
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              icon={Mail}
              field={formik.getFieldProps("email")}
              placeholder='johndoe@gmail.com'
              error={formik.errors.email}
              touched={formik.touched.email}
            />
            <PasswordField
              id="password"
              label="Password"
              field={formik.getFieldProps("password")}
              placeholder='Enter your password'
              error={formik.errors.password}
              touched={formik.touched.password}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || !formik.isValid || formik.isSubmitting}
              aria-disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-button-hover focus:ring-2 focus:ring-button-active focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating account...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Already have an account?{' '}
              <Link href="/login" className="text-normalText hover:text-button-active font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>
        <figure className='w-full md:w-1/2' >
          <Image
            src='/cuate.png'
            alt=' a picture of a lady reading book'
            width={600}
            height={900}
            className=' h-[40rem] object-fit' />


        </figure>
      </div>


    </div>
  );
}