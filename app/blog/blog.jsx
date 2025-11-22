"use client";
import { db } from "@/lib/firebaseconfig";
import { CircularProgress } from "@mui/material";
import { collection, getDocs, doc, deleteDoc, onSnapshot, updateDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardTab } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Search, TrendingUp, Sparkles } from "lucide-react";
import { FaLaptopCode, FaPaintBrush, FaNewspaper, FaStar, FaUserAlt, FaFire, FaFilm, FaPenNib, FaLandmark, FaDove, FaMoneyBill, FaChartBar, FaCoffee, FaTrashAlt} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { FaHeart, FaEye } from "react-icons/fa";


export default function BlogPage() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  // Fetch all blogs
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blog"), (snapshot) => {
      const blogList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
      setLoading(false);
     });
     return () => unsubscribe();
    }, []);

    // Delete post only by owner
    const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(db, "blog", id));
        setConfirmDelete(null);
      } catch (error) {
       console.error("Error deleting document:", error);
       alert("Oops, an error occurred. Please try again!"); 
      }
    };
    // Like System
    const handleLike = async (id) => {
      if (!session?.user?.email) {
        alert ("You must be logged in to like posts.");
        return;
      }
      const blog = blogs.find((b) => b.id === id);
      const userEmail = session.user.email;
      const alreadyLiked = blog.likedBy?.includes(userEmail);

      const blogRef = doc(db, "blog", id);
      try {
        await updateDoc(blogRef, {
          likes: alreadyLiked
          ? (blog.likes || 0) - 1
          : (blog.likes || 0) + 1,

          likedBy: alreadyLiked
          ? blog.likedBy.filter((email) => email !== userEmail)
          : [...(blog.likedBy || []), userEmail],
        });
      } catch (error) {
        console.error("Error liking post:", err);
      }
    };
    // Catergory icons
    const categories = [
      { name: "All", icon: <FaStar/> },
    { name: "Tech", icon: <FaLaptopCode/> },
    { name: "Creativity", icon: <FaPaintBrush/> },
    { name: "News", icon: <FaNewspaper/> },
    { name: "Lifestyle", icon: <FaUserAlt/> },
    { name: "Wellness", icon: <FaStar/> },
    { name: "Trending", icon: <FaFire/> },
    { name: "Entertainment", icon: <FaFilm/> },
    { name: "Celebrity Tea", icon: <FaCoffee/> },
    { name: "Writing", icon: <FaPenNib/>},
    { name: "Politics", icon: <FaLandmark/> },
    { name: "Religion", icon: <FaDove/> },
    { name: "Finance", icon: <FaMoneyBill/> },
    { name: "Business", icon: <FaChartBar/> },
    ];
    // Filters blogs (category + search)
    const filteredBlogs = blogs.filter((blog) => {
      const matchesCategory = activeCategory === "All" || blog.category?.toLowerCase() === activeCategory.toLowerCase();
  const searchTerm = search.toLowerCase();
  const matchesSearch =
   blog.title?.toLowerCase().includes(searchTerm) ||
   blog.blog?.toLowerCase().includes(searchTerm) ||
   blog.author?.toLowerCase().includes(searchTerm) ||
   blog.category?.toLowerCase().includes(searchTerm);

  return matchesCategory && matchesSearch;
});

const getCategoryCount = (cat) => {
  if (cat === "All") return blogs.length;
  return blogs.filter(
    (b) => b.category?.toLowerCase() === cat.toLowerCase()).length;
};
    
  return (
    <main className="min-h-dvh bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto">
         <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium tracking-wide uppercase opacity-90">
            Explore Blogora
          </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Discover Stories That Matter
      </h1>
      <p className="text-lg text-indigo-100 max-w-2xl">
        Browse through {blogs.length} engaging articles written by creators across various categories.
      </p>
      </div>
      </div>
      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-24">
              {/* Search */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-blue-100/50">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Search blogs..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
        </div>
      </div>
      {/* Categories */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100/50">
       <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
        Categories
       </h2>
       <div className="space-y-1">
        {categories.map((cat) => (
          <button key={cat.name}
          onClick={() => setActiveCategory(cat.name)}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${activeCategory === cat.name ? 
            "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
          }`} >
            <span className="flex items-center gap-3 font-medium">
              <span className="text-lg text-blue-600">{cat.icon}</span>
              {cat.name}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${activeCategory === cat.name
              ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700"
            }`} >
              {getCategoryCount(cat.name)}
            </span>
            </button>
        ))}
       </div>
      </div>
      </div>
      </aside>
      {/* Main content */}
      <main className="flex-1">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {activeCategory === "Trending" && (
              <TrendingUp className="w-6 h-6 text-blue-600" />
            )}
            <h2 className="text-3xl font-bold text-gray-800">
              {activeCategory === "All" ? "All Blogs" : activeCategory} 
            </h2>
        </div>
        <p className="text-gray-600">
          {filteredBlogs.length}{""}
          {filteredBlogs.length === 1 ? "blog" : "blogs"} found
        </p>
        </div>
        {/* Loader */}
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <CircularProgress size={50} thickness={4} color="success" />
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <article key={blog.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1 relative">
              {/* Header */}
             <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-100">
               <img
                src={blog.img || "/AI.jpg"}
                 alt={blog.author}
                 className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                 />
                 <div className="flex-1 min-w-0">
                 <h3 className="font-semibold text-gray-800 truncate">{blog.author}</h3>
                 <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mt-1">
                  {blog.category}
                 </span>
                  </div>
                  {/* Show Delete button only for author */}
                  {session?.user?.email === blog.authorEmail && (
                    <button
                      onClick={() => setConfirmDelete(blog.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete this post"
                    >
                      <FaTrashAlt/>
                    </button>
                  )}
                  </div>
                  {/* body */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">
                      {blog.title || "Untitled Post"}
                    </h3>
                  <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
                    {blog.blog}
                  </p>
                  {/* Likes + Views */}
                  <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
                        <span><FaEye /> {blog.views || 0} views</span>

                        <button
                          onClick={() => handleLike(blog.id)}
                          className="flex items-center gap-1 hover:text-red-600 transition"
                        >
                          <FaHeart /> {blog.likes || 0}
                        </button>
                      </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {blog.timestamp}
                    </span>
                    <Link href={`/blog/${blog.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors group-hover:gap-3 duration-300">
                      Read More 
                      <MdOutlineKeyboardTab className="text-lg ml-1" />
                    </Link>
                    </div>
                  </div>
                  {/* Delete Confirmation modal */}
                  {confirmDelete === blog.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-md">
                      <div className="bg-white p-5 rounded shadow-md text-center">
                        <p className="text-gray-700 font-medium mb-4">
                          Are you sure you want to delete this post?
                        </p>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              ))}
              </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </main>
      </div>
      </div>
    </main>
  );
};
