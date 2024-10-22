"use client"; // التأكد من أن المكون يعمل كعميل

import { useEffect, useState } from "react";
import Link from "next/link";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products"); // تأكد أن الرابط يعيد البيانات
        const data = await response.json();
        setProducts(data); // تخزين البيانات في الحالة
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cartItem = {
      id: product.product_id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1 // تعيين الكمية إلى 1 عند الإضافة
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} تمت إضافته إلى السلة!`); // رسالة تأكيد
  };

  if (loading) return <p className="text-center text-gray-500">جارٍ التحميل...</p>; // عرض رسالة تحميل

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-5 text-center text-gray-800">
        المنتجات
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id} // استخدم product_id كالمفتاح الفريد
            className="border rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105"
          >
            <Link href={`/customer/${product.product_id}/view`}> {/* الربط بالصفحة بناءً على product_id */}
              <img
                src={`./images/${product.image}`} // استخدم image_url لعرض الصورة
                alt={product.title}
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </Link>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.title} {/* عرض عنوان المنتج */}
              </h3>
              <p className="text-gray-600 mt-2">
                {product.description.slice(0, 60)}... {/* تقليص الوصف */}
              </p>
              <p className="text-xl font-bold text-gray-900 mt-2">
                ${product.price} {/* عرض السعر */}
              </p>
              <button
                onClick={() => addToCart(product)} // ربط الزر بالدالة addToCart
                className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
              >
                إضافة إلى السلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
