"use client"; // مكون عميل

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // استخدام next/navigation

const ProductDetails = ([]) => {
  const router = useRouter();
  const { id } = router.query; // الحصول على معرف المنتج من الرابط
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await response.json();
          setProduct(data); // تخزين بيانات المنتج
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false); // إنهاء التحميل
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!product) return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">{product.title}</h2>
      <div className="flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-auto object-cover"
        />
        <div className="md:ml-6">
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-bold text-gray-900 mt-4">${product.price}</p>
          <button className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">إضافة إلى السلة</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
