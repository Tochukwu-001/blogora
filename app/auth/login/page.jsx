import React from "react";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { EmailLogin } from "@/components/EmailLogin";

const page = async () => {
  const session = await auth()

  if (session) {
    redirect("/post-blog");
  }
  console.log(session);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 flex items-center justify-center px-4">
      <section className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-white p-8 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight">
            Welcome Back to {""} <span className="text-yellow-300 drop-shadow-md">Blogora</span>
          </h1>
          <p className="text-gray-100 mb-8 mt-5">Log in to continue sharing and discovering inspiring stories</p>
          </div>
          {/* Email login */}
          <div className="mt-8"><EmailLogin/></div>
          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-4">
            <div className="w-16 h-[1px] bg-white/30" />
            <span className="text-sm text-gray-200">or</span>
            <div className="w-16 h-[1px] bg-white/30" />
            </div>
            {/* Social logins */}
            <div className="space-y-4">
          <form
            action={async () => {
              "use server"
              await signIn("google");
            }}
          >
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 transition-all rounded-full border border-white/30 text-lg font-semibold shadow-md hover:shadow-lg backdrop-blur-md">
              <FcGoogle  className="text-2xl"/>
              Continue with Google
            </button>
          </form>

          <form
            action={async () => {
              "use server"
              await signIn("github");
            }}
          >
            <button type="submit" className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 transition-all rounded-full border border-white/30 text-lg font-semibold shadow-md hover:shadow-lg">
              <FaGithub className="text-2xl text-white"/>
              Continue with Github
            </button>
          </form>
          <button disabled className="w-full flex items-center justify-center gap-3 bg-white/10 py-3 cursor-not-allowed opacity-60 transition-all rounded-full border border-white/30 text-lg font-semibold">
            <FaInstagram className="text-2xl text-pink-500" />
            Continue with Instagram (coming soon)
          </button>
          </div>
          {/* Terms */}
          <p className="text-sm text-gray-300 mt-6 leading-relaxed">
            By Signing in, it indicate that you have read and agree to our{" "}
            <a href="#" className="text-yellow-300 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-yellow-300 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          {/* Decorative glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-400/30 blur-3xl rounded-full" />
      </section>
    </main>
  );
};

export default page;
