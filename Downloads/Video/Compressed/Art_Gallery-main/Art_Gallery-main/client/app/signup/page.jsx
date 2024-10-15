"use client"; // إضافة هذا السطر لجعل المكون عميلًا
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link'; // استيراد Link من مكتبة next/link

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // التحقق من صحة المدخلات
    if (!name || !email || !password) {
      setError("الرجاء ملء جميع الحقول.");
      setLoading(false);
      return;
    }

    try {
      // إرسال بيانات التسجيل إلى API
      const response = await fetch("https://your-api-endpoint/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) throw new Error("فشل تسجيل الحساب.");

      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      router.push("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-yellow-500">إنشاء حساب</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">الاسم</label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">كلمة المرور</label>
          <input
            type="password"
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className={`w-full py-2 px-4 rounded-md transition duration-150 ease-in-out ${loading ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'} text-white font-semibold`}
          disabled={loading} // تعطيل الزر أثناء التحميل
        >
          {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء حساب'}
        </button>
      </form>
      <p className="mt-4 text-center">
        لديك حساب بالفعل؟ <Link href="/login" className="text-yellow-500 font-semibold">تسجيل الدخول</Link>
      </p>
    </div>
  );
};

export default Signup;
