"use client"
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { IoMdMail } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

export function EmailLogin() {

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: { email: "" },
    onSubmit: async (values) => {
      console.log("Attempting to sign in with email:", values.email);
      const res = await signIn("nodemailer", { email: values.email, redirect: false });
      console.log("Sign in response", res);

      if (res) {
        alert("Check your email for a sign-in link!");
      } else {
        console.log(res?.error);
        alert("Authentication failed: check console");
      }
    },
    validationSchema: schema
  });

  return (
    <div className="w-full space-y-5 mt-17 max-md:px-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full p-4 border border-gray-200 outline-none 
                            ${errors.email && touched.email
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                  : 'border-gray-200 focus:border-blue-400 focus:ring-blue-200'}`}
              placeholder="Enter your email"
            />
            {!errors.email && touched.email && (
              <div className="absolute right-3 top-4">
                <FaCheck className="text-green-600 text-lg" />
              </div>
            )}
          </div>
          {errors.email && touched.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="border flex items-center justify-center border-gray-200 w-full gap-5 py-4 text-xl md:text-2xl text-white hover:bg-stone-700 mb-5"
        >
          <IoMdMail className="text-2xl mr-3 text-white" />
          Sign In with Email
        </button>
      </form>
    </div>
  );
}