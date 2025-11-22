"use client"
import Image from "next/image";
import { db } from "@/lib/firebaseconfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardTab } from "react-icons/md";
import { Skeleton } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";

export default function Home() {
   const [blogs, setBlogs] = useState([]);
   const [loading, setLoading] = useState(true);
   const [currentWord, setCurrentWord] = useState(0);
   const [searchQuery, setSearchQuery] = useState("");
   
   const words = ['Read', 'Share', 'Discover', 'Inspire']; 

    // Animated word rotation
   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
   }, []);

    const fetchBlogs = async () => {
      try {
        const blogArray = [];
      const querySnapShot = await getDocs(collection(db, "blog"));
      querySnapShot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, "=>", doc.data());
        const blogObject = {
          id: doc.id,
          ...doc.data() };
        console.log(blogObject);
        blogArray.push(blogObject);
      });
      setBlogs(blogArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
     };
    useEffect(() => {
      fetchBlogs();
    }, []);

    // Filter blogs based on search query
    const filteredBlogs = blogs.filter(blog =>
      blog.blog?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  return (
     <main className="min-h-dvh bg-gray-50">
      {/* Hero section */}
      <section className="py-20 px-5 text-center relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white overflow-hidden">
     <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
   <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>

     <div className="relative z-10 max-w-4xl mx-auto">
       <div className="mb-6">
         <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
           Welcome to Blogora
         </span>
       </div>
       <h1 className="mb-6 tracking-tight text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          <span className="inline-block transition-all duration-500 text-yellow-300">
            {words[currentWord]}.
          </span>{' '}
          Share. Get Inspired.
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-purple-100 mb-10 leading-relaxed">
          A space where ideas, opinions, and stories come alive. Join our community of writers and readers.
        </p>
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search posts by title, author, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-lg bg-white/10 placeholder-gray-300" />
          </div>
        </div>
        {/* Quick category tags */}
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="text-purple-200 text-sm">Popular:</span>
          <button
            onClick={() => setSearchQuery('Tech')}
            className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm hover:bg-white/30 transition">
            Tech
          </button>
          <button
            onClick={() => setSearchQuery('Lifestyle')}
            className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm hover:bg-white/30 transition">
            Lifestyle
          </button>
          <button
            onClick={() => setSearchQuery('Creativity')}
            className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm hover:bg-white/30 transition">
            Creativity
          </button>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-1 bg-red-500/30 backdrop-blur-sm rounded-full text-sm hover:bg-red-500/40 transition">
              Clear Search
            </button>
          )}
        </div>
     </div>
  </section>
    {/* Blog grid section */}
  <section className="mt-15 px-5 md:px-10 py-10">
    {searchQuery && (
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          {filteredBlogs.length} result{filteredBlogs.length !== 1 ? 's' : ''} found for {""}<span className="font-semibold text-indigo-600">{searchQuery}</span>"
        </p>
      </div>
    )}
    { loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton variant="circular" width={40} height={40} animation="wave"/>
              <div className="flex-1">
                <Skeleton variant="text" width="60%" height={16} />
                <Skeleton variant="text" width="40%" height={14} />
              </div>
            </div>
            <Skeleton variant="rectangular" height={130} animation="wave" className="rounded-md mb-4"/>
            <Skeleton variant="text" width="90%" height={18} />
            <Skeleton variant="text" width="70%" height={18} />
            <Skeleton variant="text" width="50%" height={18} />
          </div>
        ))}
      </div>
     ) : filteredBlogs.length > 0 ? (
      <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.slice(0, 6).map((rev, i) => (
          <div key={i} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200">
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <img
                src={rev.img || "/AI.jpg"}
                alt="user"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{rev.author}</h3>
                <p className="text-sm text-gray-500">{rev.category}</p>
              </div>
            </div>
            <div className="p-5">
              <p className="line-clamp-4 leading-relaxed mb-4 text-gray-700">{rev.blog}</p>
              <p className="text-gray-400 mb-3 text-sm">
                {rev.timestamp?.toDate
                  ? rev.timestamp.toDate().toLocaleDateString()
                  : rev.timestamp}
              </p>
              <Link
                href={`/blog/${rev.id}`}
                className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition">
                Read More
                <span className="ml-1 text-lg group-hover:translate-x-1 transition-transform">
                  <MdOutlineKeyboardTab/>
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* View All Posts */}
      {filteredBlogs.length > 6 && !searchQuery && (
        <div className="text-center mt-12">
         <Link href="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl font-semibold"> 
        View All Posts
        <MdOutlineKeyboardTab className="text-xl" />
        </Link>
        </div>
      )}
      </>
    ) : (
      <div className="text-center mt-20">
        <p className="text-gray-500 text-lg">
          {searchQuery
            ? `No blog posts found matching "${searchQuery}". Try a different search.`
            : "No blog posts available."}
        </p>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
            Clear Search
          </button>
        )}
      </div>
    )}
  </section>
 </main>
 );
}
