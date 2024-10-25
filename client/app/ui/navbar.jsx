"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { BiCart } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

const Navbar = () => {
  const { userData, logout } = useAuth();
  const [query, setQuery] = useState("");

  const [isMenuOpen, setMenuOpen] = useState(false);

  const itemList = [
    { name: "All Categories", path: "/" },
    { name: "Painting", path: "/customer/Painting" },
    { name: "Sculpture", path: "/customer/Sculpture" },
    { name: "Photography", path: "/customer/Photography" },
    { name: "Digital Art", path: "/customer/DigitalArt" },
  ];

  return (
    <>
      <div className="bg-gray-800 text-white py-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold">
            <Image
              src={"/logo_1.avif"}
              className="rounded-full bg-yellow-600 p-2"
              alt={`Logo`}
              width={120}
              height={120}
            />
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          <div
            className={`flex items-center w-[50%] ${
              isMenuOpen ? "block" : "hidden"
            } md:flex`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a product..."
              className="w-80 p-2 rounded-l-md outline-none text-black"
            />
            <button className="bg-yellow-400 p-2 rounded-r-md hover:bg-yellow-500">
              <CgSearch size="24px" className="text-black" />
            </button>
          </div>
          <div className="flex items-center space-x-6">
            {userData ? (
              <>
                <Link href="/Profile" className="hover:underline">
                  {userData.name}
                </Link>
                <span
                  className="hover:underline cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <Link href="/customer/login" className="hover:underline">
                  Login
                </Link>
                <Link href="/customer/signup" className="hover:underline">
                  Sign Up
                </Link>
              </>
            )}
            <Link href="/cart">
              <div className="relative cursor-pointer flex items-center">
                <BiCart size="32px" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`bg-gray-700 text-white py-2 ${
          isMenuOpen ? "block" : "hidden"
        } md:flex`}
      >
        <div className="container mx-auto flex justify-center space-x-4 overflow-x-auto">
          {itemList.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className="hover:bg-gray-600 px-4 py-2 rounded-md"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
