"use client"; // مكون عميل

import { useEffect, useState } from "react";
import Link from "next/link";

const MensClothing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // جلب البيانات من Fake Store API لفئة ملابس الرجال
        const response = await fetch("https://fakestoreapi.com/products/category/men's clothing");
        const data = await response.json();
        setProducts(data); // تخزين المنتجات في الحالة
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // إنهاء التحميل
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Men's Clothing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:scale-105">
            <Link href={`/products/${product.id}`}>
              <div className="relative">
                <img
                  src={product.image}
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
                <p className="text-xl font-bold text-gray-900 mt-4">${product.price}</p>
                <button className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">إضافة إلى السلة</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MensClothing;
