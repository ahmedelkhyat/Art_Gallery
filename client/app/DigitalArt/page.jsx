"use client"; // مكون عميل

import { useEffect, useState } from "react";
import Link from "next/link";

const DigitalArt = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // لإدارة الأخطاء

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products?category_id=4"); // استخدام category_id = 4 للفن الرقمي
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message); // تخزين رسالة الخطأ
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>; // عرض رسالة الخطأ إذا حدثت

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Digital Art</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:scale-105">
            <Link href={`/products/${product.id}`}>
              <div className="relative">
                <img
                  src={`/images/${product.image}`} // تعديل مسار الصورة
                  alt={product.title}
                  className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  جديد
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                <p className="text-gray-600 mt-2">{product.description.slice(0, 60)}...</p>
                <p className="text-sm text-gray-500">{product.category}</p> {/* عرض تصنيف المنتج */}
                <p className="text-xl font-bold text-gray-900 mt-4">${product.price}</p>
                <Link href={`/products/${product.id}`} className="mt-4 inline-block bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
                  عرض المزيد
                </Link> {/* زر "عرض المزيد" */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalArt;
