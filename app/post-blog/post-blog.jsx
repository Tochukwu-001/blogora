"use client";
import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { LuLoaderCircle } from "react-icons/lu";
import { db } from "@/lib/firebaseconfig";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostBlog = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    category: "",
    title: "",
    blog: "",
  };

  const formValidation = Yup.object({
    category: Yup.string().required("Please select a category"),
    title: Yup.string()
      .required("Please add a title")
      .min(10, "Title must be at least 10 characters"),
    blog: Yup.string()
      .required("Share your blog")
      .min(500, "Minimum of 500 characters required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      
      // ✅ FIXED: Use email as unique identifier (consistent across your app)
      const userId = session?.user?.id;
      
      const blogInfo = {
        author: session?.user?.name || "Anonymous",
        authorEmail: session?.user?.email || "N/A",
        img: session?.user?.image ?? "/df.png",
        userId: userId, // ✅ FIXED: Changed from authorId to userId
        timestamp: new Date().toLocaleString(),
        likes: 0, // ✅ ADDED: Initialize likes
        likedBy: [], // ✅ ADDED: Initialize likedBy array
        views: 0, // ✅ ADDED: Initialize views
        ...values,
      };
      
      await addDoc(collection(db, "blog"), blogInfo);
      console.log("Blog saved:", blogInfo);
      handleOpen();
      resetForm();
    } catch (error) {
      console.error("Error adding blog", error);
      alert("Oops, an error occurred while posting your blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh bg-gray-50 flex flex-col items-center justify-center px-5 py-12">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-3">
          Post your Blog Here
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Hey there! What's up with you? Got some news, thoughts, or stories to
          share?
          <br />
          Drop it below and you just might get featured on{" "}
          <span className="font-semibold text-indigo-600">Blogora</span>!
        </p>

        <section className="md:max-w-2xl w-full mx-auto shadow-md p-3 rounded-md bg-white/70">
          <Formik
            initialValues={initialValues}
            validationSchema={formValidation}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <Field
                  name="category"
                  as="select"
                  className="w-full outline-none border border-gray-300 p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    -- Select a category --
                  </option>
                  <option value="Tech">Tech</option>
                  <option value="Creativity">Creativity</option>
                  <option value="News">News</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Trending">Trending</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Celebrity Tea">Celebrity Tea</option>
                  <option value="Writing">Writing</option>
                  <option value="Politics">Politics</option>
                  <option value="Religion">Religion</option>
                  <option value="Finance">Finance</option>
                  <option value="Business">Business</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Blog Title
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter your blog title"
                  className="w-full outline-none border border-gray-300 p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 rounded-lg"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Post your blog
                </label>
                <Field
                  name="blog"
                  as="textarea"
                  rows="10"
                  className="w-full outline-none border border-gray-300 p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 rounded-lg"
                  placeholder="Start writing your story..."
                />
                <ErrorMessage
                  name="blog"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 w-full text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                  {loading ? (
                    <LuLoaderCircle className="animate-spin text-2xl mx-auto" />
                  ) : (
                    "Share your Blog"
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </section>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Post successful
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your Blog has been posted successfully.
          </Typography>
        </Box>
      </Modal>
    </main>
  );
};

export default PostBlog;