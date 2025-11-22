"use client";
import React, { useEffect, useState } from 'react'
import { getDoc, doc, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from '@/lib/firebaseconfig';
import { ArrowLeft, Eye, Heart, Trash2 } from 'lucide-react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { use } from "react";

export default function BlogDetails({ params }) {
  const { id: blogId } = use(params);
  const { data: session } = useSession();
  const user = session?.user || null;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(session);

  // Fetch blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blog", blogId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = {
            id: docSnap.id,
            ...docSnap.data(),
            // Initialize likedBy and likes if they don't exist
            likedBy: docSnap.data().likedBy || [],
            likes: docSnap.data().likes || 0,
            views: docSnap.data().views || 0,
          };
          setBlog(data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
       setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  // Increment views once per browser session
 useEffect(() => {
  if (!blog || !blogId) return;

  const key = `viewed_${blogId}`;
  if (typeof window !== "undefined" && localStorage.getItem(key)) return;

  localStorage.setItem(key, "1");

  updateDoc(doc(db, "blog", blogId), {
    views: increment(1),
  }).catch((err) => console.error("Error updating views:", err));
}, [blog, blogId]);


  // Handle Like / Unlike
  const handleLike = async () => {
    if (!user) {
      alert("Login to like posts");
      return;
    }

    if (!user.id) {
      console.error("User ID is missing");
      return;
    }

    const userId = user.id;
    const blogRef = doc(db, "blog", blogId);

    // Safely check if user has already liked
    const currentLikedBy = blog.likedBy || [];
    const alreadyLiked = currentLikedBy.includes(userId);

    const newLikedBy = alreadyLiked
      ? currentLikedBy.filter((id) => id !== userId)
      : [...currentLikedBy, userId];

    const newLikes = alreadyLiked ? (blog.likes || 0) - 1 : (blog.likes || 0) + 1;

    // Optimistic UI update
    setBlog((prev) => ({
      ...prev,
      likedBy: newLikedBy,
      likes: newLikes,
    }));

    try {
      await updateDoc(blogRef, {
        likedBy: newLikedBy,
        likes: newLikes,
      });
    } catch (error) {
      console.error("Failed to update likes:", error);

      // Revert UI if failure
      setBlog((prev) => ({
        ...prev,
        likedBy: currentLikedBy,
        likes: blog.likes,
      }));

      alert("Failed to update like. Please try again.");
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!user?.id || user.id !== blog.userId) {
      alert("You are not allowed to delete this post.");
      return;
    }

    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deleteDoc(doc(db, "blog", blogId));
      window.location.href = "/blog";
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  // Loading Spinner
  if (loading) {
    return (
      <div className='h-[80vh] flex items-center justify-center'>
        <div className='animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full'></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className='text-center text-gray-600 mt-20'>Blog not found.</div>
    );
  }

  return (
    <main className='min-h-dvh bg-gray-50 py-10 px-4'>
      <div className='max-w-4xl mx-auto'>
        {/* Back button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 transition mb-6">
          <ArrowLeft className='w-5 h-5' /> Back to Blogs
        </Link>

        {/* Main Card */}
        <div className='bg-white shadow-xl rounded-2xl p-8 border border-gray-100'>
          {/* Category */}
          {blog.category && (
            <div className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 mb-4">
              {blog.category}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            {blog.title || 'Untitled Blog Post'}
          </h1>

          {/* Author Row */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src={blog.img || "/df.png"}
              alt={blog.author || "Author"}
              className='w-14 h-14 rounded-full object-cover shadow'
            />
            <div>
              <p className="font-semibold text-gray-800">{blog.author || "Anonymous"}</p>
              {blog.timestamp && (
                <p className="text-sm text-gray-500">{blog.timestamp}</p>
              )}
            </div>
          </div>

          {/* Cover Image */}
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt='Cover Image'
              className='w-full rounded-xl mb-8 shadow'
            />
          )}

          {/* Stats Row */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-6 text-gray-700'>
              {/* Likes */}
              <button
                onClick={handleLike}
                disabled={!user}
                className={`flex items-center gap-1 transition ${
                  (blog.likedBy || []).includes(user?.id)
                    ? "text-red-600"
                    : "text-gray-700"
                } ${!user ? "opacity-50 cursor-not-allowed" : "hover:text-red-600"}`}
                title={!user ? "Login to like posts" : ""}
              >
                <Heart
                  size={22}
                  fill={(blog.likedBy || []).includes(user?.id) ? "red" : "none"}
                />
                {blog.likes || 0}

              </button>

              {/* Views */}
              <div className='inline-flex items-center gap-2 text-gray-600 px-2 py-1 rounded-md bg-gray-100'>
                <span className='text-lg'>
                <Eye size={22} />
                </span>
                <span>{blog.views || 0}</span>
              </div>
            </div>

            {/* Delete button (only owner) */}
            {user?.id === blog.userId && (
              <button
                onClick={handleDelete}
                className='text-red-600 hover:text-red-800 flex items-center gap-1 transition'
              >
                <Trash2 size={22} /> Delete
              </button>
            )}
          </div>

          {/* Divider */}
          <div className='h-px w-full bg-gray-200 mb-6'></div>

          {/* Body */}
          <article className='prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line'>
            {blog.blog || "No content available."}
          </article>
        </div>
      </div>
    </main>
  );
}