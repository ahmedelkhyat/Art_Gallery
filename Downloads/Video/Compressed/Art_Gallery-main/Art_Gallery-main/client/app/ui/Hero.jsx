"use client"; // التأكد من أن المكون هو Client Component

import { useState, useEffect } from "react";
import Link from "next/link"; // استيراد Link

const Hero = () => {
  const [products, setProducts] = useState([]); // تخزين المنتجات
  const [currentIndex, setCurrentIndex] = useState(0); // تحديد الصورة الحالية
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  // جلب البيانات من Fakestore API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data); // حفظ المنتجات
        setLoading(false); // إيقاف التحميل
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false); // إيقاف التحميل
      }
    };

    fetchProducts();
  }, []);

  // تغيير الصورة كل 5 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000); // تغيير الصورة كل 5 ثوانٍ

    return () => clearInterval(interval); // تنظيف الـ interval عند إزالة المكون
  }, [products.length]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20">{error}</div>;

  // دالة للذهاب إلى الصورة التالية
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  // دالة للذهاب إلى الصورة السابقة
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  // دالة لتغيير الصورة عند الضغط على النقطة
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative bg-gray-800 text-white h-[600px] overflow-hidden"> {/* زيادة الارتفاع */}
      {/* عرض الصورة الحالية */}
      <div className="w-full h-full relative">
        {products.length > 0 ? (
          <img
            src={products[currentIndex]?.image}
            alt={products[currentIndex]?.title}
            className="w-full h-full object-contain transition-transform duration-1000 ease-in-out"
            style={{ maxHeight: '600px' }} // تعيين max-height لتجنب الصورة الكبيرة
          />
        ) : (
          <div>No products available</div>
        )}
      </div>

      {/* تراكب مظلم */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* أزرار التحكم */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition"
      >
        &gt;
      </button>

      {/* شريط المنقط */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-yellow-500' : 'bg-gray-400'} transition`}
          />
        ))}
      </div>

      {/* زر تحت الشريط المنقط */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <Link href="/more-products"> {/* تغيير الرابط هنا */} 
          <button className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition">
            عرض المزيد
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
