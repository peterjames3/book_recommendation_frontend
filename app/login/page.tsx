"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/context/auth-store";
import { validateLogin } from "@/lib/validation/loginValidation";
import { InputField } from "@/app/ui/components/auth/input-fields";
import { PasswordField } from "@/app/ui/components/auth/password-field";
import { Mail } from "lucide-react";

export default function LoginPage() {
  const { login, isLoading, clearError } = useAuthStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: validateLogin,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        clearError();
        formik.resetForm()
        await login(values);
        router.push("/dashboard");
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
    <div className="min-h-screen w-full flex items-center bg-accent2">
      <div className="w-full mx-auto max-w-[840px] xl:max-w-[1040px] px-4 mt-[7rem] py-12 md:flex items-center gap-10">
        <div className="w-full md:w-1/2 px-2">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[2.25rem] font-bold text-text mb-2">LitKenya</h1>
            <p className="text-normalText text-lg">Explore books. Experience worlds.</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <Link href="/login" className="flex-1 text-center py-2 font-semibold border-b-2 border-normalText">Log in</Link>
            <Link href="/register" className="flex-1 text-center py-2 text-gray-600 hover:text-gray-800">Sign Up</Link>
          </div>

          {/* Welcome */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Sign in to continue your reading journey</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <InputField
              id="email"
              label="Email"
              type="email"
              icon={Mail}
              field={formik.getFieldProps("email")}
              error={formik.errors.email}
              touched={formik.touched.email}
              placeholder="johndoe@gmail.com"
            />
            <PasswordField
              id="password"
              label="Password"
              field={formik.getFieldProps("password")}
              error={formik.errors.password}
              touched={formik.touched.password}
              disabled={isLoading}
              placeholder='Enter Your password'
            />
            <button
              type="submit"
              disabled={isLoading || !formik.isValid || formik.isSubmitting}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-button-hover disabled:opacity-50 transition"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>

        <figure className="w-full md:w-1/2">
          <Image src="/cuate.png" alt="Lady reading book" width={600} height={900} className="h-[40rem] object-fit" priority />
        </figure>
      </div>
    </div>
  );
}
