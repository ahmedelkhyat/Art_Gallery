"use client";

import { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Image from "next/image";
import Footer from "../ui/Footer";
import Navbar from "../ui/navbar";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCreditCard } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    cardNumber: "",
    paymentMethod: "paypal" // يمكنك تغيير هذا إلى "creditCard" عند الحاجة
  });

  useEffect(() => {
    AOS.init();
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const total = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // تحقق من صحة المدخلات
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.paymentMethod === "creditCard" && !formData.cardNumber) {
      alert("Please enter your card number.");
      return;
    }

    // يمكنك هنا تنفيذ منطق الدفع باستخدام PayPal أو أي خدمة دفع أخرى
    console.log("Form Data:", formData);
    alert("Payment information submitted successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600" data-aos="fade-up">Checkout</h1>
        
        <div className="bg-white p-4 rounded-lg shadow-md mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between my-4 border-b pb-4">
              <Image src={`/images/${item.image}`} alt={item.title} width={100} height={100} />
              <div className="ml-4">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-lg font-semibold">
                  {item.quantity} × ${Number(item.price).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">Rating: {item.rating || 'N/A'}</p>
              </div>
            </div>
          ))}
          <p className="text-xl font-bold mt-4 text-right">Total: ${total.toFixed(2)}</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-lg rounded-lg p-6" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <div className="flex items-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-200">
              <FaUser className="ml-2 text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-200">
              <FaEnvelope className="ml-2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <div className="flex items-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-200">
              <FaMapMarkerAlt className="ml-2 text-gray-500" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <div className="flex items-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-200">
              <FaPhone className="ml-2 text-gray-500" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Card Number (if paying by Credit Card)</label>
            <div className="flex items-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-200">
              <FaCreditCard className="ml-2 text-gray-500" />
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 w-full"
          >
            Submit
          </button>
        </form>

        {/* PayPal button */}
        <PayPalScriptProvider options={{ "client-id": "iYVTd3pPJjvbu0i4g8JPgZSR" }}>
          <div className="my-8" data-aos="fade-up">
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                alert("Payment Successful!");
                localStorage.removeItem("cart");
                window.location.href = "/";
              }}
              onError={(err) => {
                console.error("PayPal Checkout Error", err);
              }}
            />
          </div>
        </PayPalScriptProvider>

        <div className="mt-4 text-center text-gray-500">
          <p>By proceeding, you agree to our <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

