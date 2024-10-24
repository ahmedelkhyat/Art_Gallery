"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Using useRouter from next/navigation
import Nav from "../ui/Navbar"; // Ensure the correct path
import Footer from "../ui/Footer"; // Ensure the correct path

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Using useRouter

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Error fetching user data");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          const userData = data[0];
          setUser(userData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleGoToHome = () => {
    router.push("/"); // Redirect user to the home page
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken"); // If you store the access token
    router.push("/customer/login"); // Redirect to login page
  };

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (!user) return <div className="text-center mt-20 text-lg">User data not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Nav />

      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="rounded-full w-28 h-28 border-4 border-blue-500"
            />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome, {user.name}</h1>
          <div className="text-gray-700 text-lg mb-6">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Address:</span> {user.address}</p>
            <p><span className="font-semibold">Phone Number:</span> {user.phone_number}</p>
            <p><span className="font-semibold">Gender:</span> {user.gender}</p>
          </div>

          <button
            onClick={handleGoToHome} // Update the function call here
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
          >
            Go to Home
          </button>

          <button
            onClick={handleLogout} // Call the logout function
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
