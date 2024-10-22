"use client"; // استخدم العميل، لأننا نحتاج للـ useEffect

import { useState, useEffect } from "react";
import Link from "next/link"; // لإضافة رابط للذهاب إلى صفحة الدفع
import Image from "next/image"; // لتحسين عرض الصور
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi"; // أيقونات من react-icons
import Footer from "../ui/Footer";
import Navbar from "../ui/navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  // جلب قائمة المنتجات المتاحة من API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setAvailableProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // جلب المنتجات من الـ localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // مسح سلة التسوق
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  // إضافة منتج إلى السلة
  const addProductToCart = (product) => {
    const updatedCart = [...cartItems, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // زيادة الكمية
  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // تقليل الكمية
  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
  };

  // إزالة منتج من السلة
  const removeProduct = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <p className="min-h-screen text-center flex justify-center items-center text-4xl text-gray-500">
          سلة التسوق فارغة
        </p>
        <Footer />
      </>
    );
  }

  // حساب إجمالي السعر
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {" "}
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          سلة التسوق
        </h1>
        <div className="grid grid-cols-1 gap-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition duration-200">
                    {item.title}
                  </h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => decreaseQuantity(index)}
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      <FiMinus />
                    </button>
                    <span className="mx-2 text-lg font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(index)}
                      className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeProduct(index)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <p className="text-2xl font-bold text-green-600">
            الإجمالي: ${total.toFixed(2)}
          </p>{" "}
          {/* تغيير لون الإجمالي إلى أخضر */}
          <Link href="/checkout">
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200">
              متابعة إلى الدفع
            </button>
          </Link>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            مسح السلة
          </button>
        </div>
        <h2 className="text-2xl font-bold mt-6">إضافة منتج</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {availableProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
                className="object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-800 hover:text-yellow-600 transition duration-200">
                {product.title}
              </h3>
              <p className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => addProductToCart(product)}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
                إضافة إلى السلة
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
