"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { RxDropdownMenu } from "react-icons/rx";
import { useSession, signOut } from "next-auth/react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "About Us", url: "/about" },
    { name: "Contact Us", url: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between py-4 px-5 shadow-md bg-white/90 backdrop-blur-lg sticky top-0 z-50">
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2 z-50">
        <Image
          src={"/blog logo.png"}
          alt="blog.logo"
          width={1000}
          height={1000}
          className="w-10 h-10"
        />
        <p className="text-3xl font-semibold text-gray-800 max-lg:hidden">Blogora</p>
      </Link>

      {/* Desktop Nav */}
      <div className="flex items-center gap-8 max-lg:hidden">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className="relative group text-lg text-gray-700"
          >
            {item.name}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
        {/* Profile avatar */}
        {session ? (
          <button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <img
              // src={session?.user?.image}
              // alt={session?.user?.name?.slice(0, 1).toUpperCase()}
              src={session?.user?.image || "/Ai2.jpg"}
              alt="user"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          </button>
        ) : (
          <Link
            href={"/auth/login"}
            className="text-lg hover:text-red-700 hover:underline"
          >
            Log In
          </Link>
        )}
      </div>

      {/* Mobile Nav Toggle */}
      <div className="lg:hidden z-50">
        <button onClick={() => setNavOpen(!navOpen)} className="text-3xl">
          {navOpen ? <IoMdCloseCircle /> : <RxDropdownMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="bg-white/95 backdrop-blur-xl h-dvh w-full fixed top-0 left-0 flex flex-col items-center gap-8 pt-20 text-2xl font-medium">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="text-2xl"
                onClick={() => setNavOpen(false)}
                //  className="hover:text-red-500 transition"
              >
                {item.name}
              </Link>
            ))}

            {session ? (
              <button
                id="mobile-profile-button"
                onClick={handleClick}
                className="flex items-center flex-col"
              >
                <img
                  src={session?.user?.image || "/Ai2.jpg"}
                  alt="user"
                  // src={session?.user?.image}
                  // alt={session?.user?.name?.slice(0, 1).toUpperCase()}
                  className="w-14 h-14 rounded-full border border-gray-300"
                />
                <p className="text-base mt-1 text-gray-600">{session.user.name}</p>
              </button>
            ) : (
              <Link
                href={"/auth/signin"}
                className="text-xl hover:text-red-500 transition"
              >
                Log In
              </Link>
            )}
          </div>
      )}
      {/* Profile Dropdown Menu (single instance) */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <MenuItem onClick={handleClose}>
          <Link href={"/profile"}>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href={"/post-blog"}>Post your Blog</Link>
        </MenuItem>
        <MenuItem onClick={() => signOut()}>Log Out</MenuItem>
      </Menu>
    </nav>
  );
};

export default Navbar;
