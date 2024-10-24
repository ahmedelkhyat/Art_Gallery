"use client"; // تأكد من أن المكون يعمل كعميل

import { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid"; // استخدم أيقونة مختلفة من الإصدار 2

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviews"); // تأكد من رابط الـ API الخاص بالآراء
        const data = await response.json();
        setReviews(data); // تخزين البيانات في الحالة
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">جارٍ التحميل...</p>;

  // إضافة آراء جديدة بشكل مباشر
  const additionalReviews = [
    {
      id: 4,
      customerName: "فاطمة",
      comment: "منتج رائع جدًا، سأعيد الشراء بالتأكيد!",
      rating: 5,
      customerImage: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      customerName: "يوسف",
      comment: "الخدمة كانت ممتازة وسريعة.",
      rating: 4,
      customerImage: "https://via.placeholder.com/100",
    },
  ];

  const allReviews = [...reviews, ...additionalReviews];

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        آراء العملاء
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allReviews.map((review) => (
          <div
            key={review.review_id}
            className="border rounded-lg p-6 shadow-lg transition-transform duration-300 transform hover:scale-105 bg-white relative"
          >
            <div className="flex items-center mb-4">
              <img
                src={review.customerImage || "https://via.placeholder.com/100"} // استخدام الصورة الافتراضية إذا لم توجد
                alt={review.customerName}
                className="w-16 h-16 rounded-full object-cover mr-4" // شكل دائري للصورة
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {review.customerName}
              </h3>
              {/* إضافة أيقونة الأشخاص */}
              <UserCircleIcon className="h-6 w-6 text-gray-500 ml-2" />
            </div>
            <p className="text-gray-700 mt-2">{review.comment}</p>
            <div className="mt-4 flex items-center">
              <span className="text-yellow-500 font-bold">
                تقييم: {review.rating} ★
              </span>
            </div>
            {/* إضافة أيقونة داخل الصورة */}
            <div className="absolute top-0 right-0 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3a7 7 0 00-6.32 10.59l-2.09 2.09A1 1 0 002 17h4a1 1 0 00.71-1.71l-2.09-2.09A5 5 0 1010 15h1a5 5 0 000-10H10zm1 2h1a3 3 0 110 6h-1a3 3 0 110-6z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
