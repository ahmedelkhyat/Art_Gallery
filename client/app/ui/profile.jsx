"use client"; // مكون عميل

import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // جلب بيانات المستخدم من localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchUserProducts(storedUser.user_id); // جلب منتجات المستخدم
    }
  }, []);

  const fetchUserProducts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/products`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if (!user) return <div>جاري التحميل...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">مرحباً، {user.name}</h1>
      <p className="text-lg mb-4">البريد الإلكتروني: {user.email}</p>

      <h2 className="text-2xl font-bold mb-4">منتجاتك:</h2>
      {products.length === 0 ? (
        <p>لا توجد منتجات متاحة حالياً.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.product_id} className="mb-2">
              {product.title} - {product.price}$
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
