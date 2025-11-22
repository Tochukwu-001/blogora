"use client";
import React from 'react';
import Link from 'next/link';
import { FaPenNib, FaHeart, FaFeatherAlt } from 'react-icons/fa';

const page = () => {
  return (
       <main className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/20 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          About{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
            Blogora
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-indigo-100 text-lg leading-relaxed px-6">
          Your creative hub for stories, ideas, and authentic expression.
        </p>
      </section>
      {/* About Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-lg text-gray-700 leading-relaxed mb-12">
          Blogora is your digital hub for creativity, stories, and insight —
          where ideas meet clarity and every writer finds a voice. Our platform
          was built to connect people through words, ideas, and meaningful expression.
        </p>
      </section>
      {/* Mission Section */}
      <section className="bg-white py-20 border-t border-gray-100 text-center shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-3">
          <FaPenNib className="text-indigo-600 text-3xl" /> Our Mission
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-lg px-6">
          To empower writers, thinkers, and readers by providing a simple, elegant
          space to share, discover, and grow through stories that inspire and inform.
          Blogora is designed for those who believe that knowledge, creativity, and
          authentic perspectives deserve to be seen.
        </p>
      </section>
      {/* Optional Values Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h3 className="text-2xl font-semibold mb-8 flex items-center justify-center gap-3 text-gray-800">
          <FaHeart className="text-pink-500" /> Our Core Values
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <FaFeatherAlt className="text-indigo-600 text-4xl mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Creativity</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              We celebrate the art of expression through unique stories, voices, and ideas.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <FaPenNib className="text-blue-600 text-4xl mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Clarity</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every word and story matters — we make sure voices shine clearly and powerfully.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <FaHeart className="text-purple-600 text-4xl mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Community</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              We connect readers and writers in an inclusive, inspiring digital space.
            </p>
          </div>
        </div>
      </section>
           {/* Closing section */}
           {/* <section className='bg-indigo-50 text-center py-20 px-5'>
            <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Join the Blogora Community</h2>
            <p className='text-lg text-gray-700 mb-8 leading-relaxed'>Blogora is a movement towards better digital storytelling - open, inclusive, and inspiring. Whether you're sharing personal stories, professional insights, or creative ideas, Blogora gives your words a home that feels timeless. </p>
            <Link 
            href="/post-blog" className='inline-block bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-indigo-800 transition'>
            Start Writing
            </Link> 
            </div>
           </section> */}
           {/* Closing Section */}
<section className="relative py-20 px-5 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
  <div className="max-w-4xl mx-auto text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-6 shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 2a1 1 0 00-.894.553l-3 6A1 1 0 007 10h6a1 1 0 00.894-1.447l-3-6A1 1 0 0010 2zM4 11a1 1 0 000 2h12a1 1 0 100-2H4z" />
        <path d="M4 15a1 1 0 100 2h12a1 1 0 100-2H4z" />
      </svg>
    </div>

    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
      Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Blogora Community</span>
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
      Blogora is a movement towards better digital storytelling — open, inclusive, and inspiring.
      Whether you're sharing personal stories, professional insights, or creative ideas,
      Blogora gives your words a home that feels timeless.
    </p>

    <Link
      href="/post-blog"
      className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-xl"
    >
      Start Writing
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  </div>
</section>
    </main>
  )
}

export default page
