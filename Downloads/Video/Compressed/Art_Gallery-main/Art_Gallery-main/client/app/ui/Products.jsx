"use client"; // التأكد من أن المكون يعمل كعميل

import { useEffect, useState } from "react";
import Link from "next/link";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>; // عرض رسالة تحميل

  return (
    <div className="container mx-auto py-10 px-4"> {/* إضافة padding لتوسيع الحاوية */}
      <h2 className="text-4xl font-bold mb-5 text-center text-gray-800">المنتجات</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {/* إضافة عمود رابع للأجهزة الكبيرة */}
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105">
            <Link href={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110" // ضبط ارتفاع الصورة
              />
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                <p className="text-gray-600 mt-2">{product.description.slice(0, 60)}...</p>
                <p className="text-xl font-bold text-gray-900 mt-2">${product.price}</p>
                <button className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">إضافة إلى السلة</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
