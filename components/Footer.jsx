import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <main className="bg-stone-200 p-3 flex max-lg:flex-col max-lg:gap-5 items-center justify-between">
      <Link href={"/"} className="flex items-center gap-2 z-50">
        <Image
          src={"/blog logo.png"}
          alt="blog logo"
          width={1000}
          height={1000}
          className="w-10 h-10"
        />
        <p className="text-2xl">Blogora</p>
      </Link>

      <div className="flex max-lg:flex-col items-center gap-5">
        <Link href={"#"} className="text-sm hover:underline">Help</Link>
        <Link href={"#"} className="text-sm hover:underline">Developers</Link>
        <Link href={"#"} className="text-sm hover:underline">About Us</Link>
        <Link href={"#"} className="text-sm hover:underline">Privacy Policy</Link>
        <Link href={"#"} className="text-sm hover:underline">Terms of Service</Link>
      </div>

      <div className="flex gap-3 text-lg">
        <FaFacebookF/>
        <FaInstagram/>
        <FaTiktok />
        <BsTwitterX />
      </div>
    </main>
  );
};

export default Footer;