"use client"; // مكون عميل

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGoogle } from "react-icons/fa"; // استيراد الأيقونات

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // إعادة تعيين الخطأ
    setLoading(true); // بدء التحميل

    // التحقق من صحة المدخلات
    if (!email || !password) {
      setError("الرجاء ملء جميع الحقول.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة.");

      const data = await response.json();

      // تخزين توكن المستخدم في localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      // إعادة التوجيه بناءً على نوع المستخدم
      if (data.is_admin === 0) {
        router.push("/admin"); // إعادة التوجيه إلى صفحة الإدارة
      } else {
        router.push("/Profile"); // إعادة التوجيه إلى صفحة الملف الشخصي
      }
    } catch (error) {
      setError(error.message); // عرض الخطأ
    } finally {
      setLoading(false); // إنهاء التحميل
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">تسجيل الدخول</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">البريد الإلكتروني</label>
            <input
              type="email"
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">كلمة المرور</label>
            <input
              type="password"
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className={`w-full py-2 px-4 rounded-md transition ${loading ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
            disabled={loading} // تعطيل الزر أثناء التحميل
          >
            {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
        <div className="flex justify-between items-center my-6">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="mx-4 text-gray-500">أو</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            <FaFacebook className="mr-2" />
            تسجيل الدخول عبر فيسبوك
          </button>
          <button className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">
            <FaGoogle className="mr-2" />
            تسجيل الدخول عبر جوجل
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          ليس لديك حساب؟ <a href="/customer/signup" className="text-yellow-500">إنشاء حساب</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
