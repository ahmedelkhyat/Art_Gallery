"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Nav from "../ui/navbar";
import Footer from "../ui/Footer";

const Profile = () => {
  const { loading, error, userData, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-lg text-red-600">{error}</div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center mt-20 text-lg">User data not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Nav />
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
              alt="Profile"
              className="rounded-full w-28 h-28 border-4 border-blue-500"
            />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Welcome, {userData.name}
          </h1>
          <div className="text-gray-700 text-lg mb-6">
            <p>
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {userData.address}
            </p>
            <p>
              <span className="font-semibold">Phone Number:</span>{" "}
              {userData.phone_number}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {userData.gender}
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
            aria-label="Go to Home"
          >
            Go to Home
          </button>
          <button
            onClick={logout}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            aria-label="Log Out"
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
