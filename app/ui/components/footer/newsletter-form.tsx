"use client";
import { useState } from "react";
import { useFormik } from "formik";
import useToast from "@/app/ui/useToast";
import emailjs from "@emailjs/browser";
import { ToastContainer } from "react-toastify";

interface FormValaues {
  email?: string;
}

const validate = (value: FormValaues) => {
  const errors: FormValaues = {};
  if (!value.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};
export default function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { notifySuccess, notifyError } = useToast();
  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID as string;
  const templateId = process.env.NEXT_PUBLIC_CONTACTUS_TEMPLATE_ID as string;
  const publicKey = process.env.NEXT_PUBLIC_KEY as string;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      setIsSubmitting(true);

      emailjs.send(serviceId, templateId, values, publicKey).then(
        () => {
          notifySuccess(" You are now subscribed to our newsletter");
          setIsSubmitting(false);
          formik.resetForm();
        },
        (error) => {
          notifyError(`Subscription failed! ${error.message}`);
          setIsSubmitting(false);
          console.log(error);
        },
      );
    },
  });
  return (
    <div className="">
      <h3 className="mb-2 text-center text-2xl font-semibold">
        Subscribe to Our Newsletter
      </h3>
      <p className="mb-6 text-center text-gray-300">
        Stay updated with the latest in solar technology and energy solutions
      </p>

      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col justify-between gap-3 sm:flex-row"
      >
        {/* Email Field */}
        <div className="w-full sm:w-2/3">
          <div className="flex items-center justify-between">
            <label
              htmlFor="email"
              className="p-text text-background block font-medium"
            >
              Email
            </label>
            {formik.touched.email && formik.errors.email ? (
              <p
                className="p-text text-error font-medium"
                id="email-error"
                role="alert"
              >
                {formik.errors.email}
              </p>
            ) : null}
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="bg-textColor focus:ring-tertiary-white w-full flex-1 rounded-md border border-gray-700 px-4 py-3 text-white focus:ring-2 focus:outline-none"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-required="true"
            aria-invalid={!!(formik.touched.email && formik.errors.email)}
            aria-describedby={formik.errors.email ? "email-error" : undefined}
          />
        </div>
        <div className="w-full sm:flex sm:w-1/3 sm:items-end">
          <button
            type="submit"
            disabled={isSubmitting}
            value="Subscribe"
            className={`text-secondary w-full cursor-pointer rounded-md px-6 py-[13px] font-medium transition-all delay-300 ${
              isSubmitting ? "bg-secondary" : "btn hover:cursor-pointer"
            } hover:bg-secondary`}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}