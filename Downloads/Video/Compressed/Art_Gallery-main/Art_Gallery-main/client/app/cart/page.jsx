"use client"; // استخدم العميل، لأننا نحتاج للـ useEffect

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // لتحريك المستخدم إذا لم يكن مسجل الدخول

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  // تحقق إذا كان المستخدم مسجل الدخول
  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('userToken'); // تحقق من وجود توكن تسجيل الدخول
    if (!isLoggedIn) {
      router.push('/login'); // إعادة توجيه إلى صفحة تسجيل الدخول
    } else {
      // جلب المنتجات من الـ localStorage إذا كان المستخدم مسجل الدخول
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCart);
    }
  }, [router]);

  if (cartItems.length === 0) {
    return <p>سلة التسوق فارغة</p>;
  }

  return (
    <div>
      <h1>سلة التسوق</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <p>{item.title}</p>
            <p>السعر: ${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
