"use client";
import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const Page = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().min(10, "Message too short").required("Message is required"),
  });
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    resetForm();
    alert("Thank you for your feedback!");
  };
  return (
    <main>
      <section className="min-h-dvh  bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center px-5 py-15">
        <div className="p-10 max-w-6xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold text-center text-indigo-700 mb-3">Contact Us</h1>
          <p className="text-center text-gray-700 mb-10">Have questions, feedback, or collaboration ideas? We'd love to hear from you...</p>
          <div className="grid md:grid-cols-2 gap-10">
            {/* left Text section */} 
            <div className="text-gray-800 font-medium leading-relaxed">
              <p className="mb-5">
                Whether you're a reader, writer, or partner, we value your thoughts and ideas.
              </p>
              <p>
                Reach out via email at{" "}
                <a
                  href="mailto:hello@blogora.com"
                  className="text-indigo-600 underline hover:text-indigo-800"
                >
                  hello@blogora.com
                </a>
              </p>
              <div className="mt-5">
                <p>Connect with us on social media:</p>
                <ul className="space-y-2 mt-3">
                  <li>
                    <a href="#" className="inline-block text-indigo-600 hover:text-indigo-800 transition">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#" className="inline-block text-indigo-600 hover:text-indigo-800 transition">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="inline-block text-indigo-600 hover:text-indigo-800 transition">
                      Twitter
                    </a>
                  </li>
                </ul>
              </div>
              <p className="text-gray-600 mt-5 text-sm italic">
                We usually respond within 24–48 hours.
              </p>
            </div>
            {/* Form section*/}
            <div className="shadow-md bg-white rounded-xl p-8">
              <p className="text-center text-2xl font-extrabold text-indigo-700 mb-6">
                Send us a Message
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Your Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      rows="5"
                      placeholder="Write your message..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Submit Message
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Page;
