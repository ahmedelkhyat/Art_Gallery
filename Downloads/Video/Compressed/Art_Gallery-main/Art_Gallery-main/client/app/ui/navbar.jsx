"use client"; // إضافة هذا السطر في الأعلى لجعل المكون عميلًا
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // استخدام next/navigation
import { BiCart } from 'react-icons/bi'; // أيقونة العربة
import { CgSearch } from 'react-icons/cg'; // أيقونة البحث

const itemList = [
  { name: "All Categories", path: "/" },
  { name: "Electronics", path: "/electronics" },
  { name: "Clothes", path: "/clothes" },
  { name: "Jewelry", path: "/jewelry" },
  { name: "Men's Clothing", path: "/mens-clothing" },
  { name: "Gifts", path: "/gifts" },
  { name: "New Products", path: "/new-products" }
];

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null); // حالة المستخدم
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false); // حالة القائمة

  const searchHandler = () => {
    router.push(`/search/${query}`);
  };

  const handleLogin = () => {
    // هنا يمكنك إضافة وظيفة تسجيل الدخول الخاصة بك
    setUser({ name: "Ahmed" }); // مثال على تسجيل الدخول
  };

  const handleLogout = () => {
    // هنا يمكنك إضافة وظيفة تسجيل الخروج الخاصة بك
    setUser(null); // مثال على تسجيل الخروج
    router.push("/"); // إعادة التوجيه إلى الصفحة الرئيسية
  };

  return (
    <>
      {/* الجزء الأول: الشريط العلوي */}
      <div className="bg-gray-800 text-white py-3">
        <div className="container mx-auto flex justify-between items-center">
          {/* شعار الموقع */}
          <Link href="/" className="text-3xl font-bold">MyStore</Link>
          
          {/* زر قائمة التمرير في الشاشات الصغيرة */}
          <button className="md:hidden" onClick={() => setMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>

          {/* صندوق البحث */}
          <div className={`flex items-center w-[50%] ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
            <input 
              type="text" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full p-2 rounded-l-md outline-none text-black"
            />
            <button 
              onClick={searchHandler}
              className="bg-yellow-400 p-2 rounded-r-md hover:bg-yellow-500"
            >
              <CgSearch size="24px" className="text-black" />
            </button>
          </div>

          {/* روابط الحساب وعربة التسوق */}
          <div className="flex items-center space-x-6">
            {/* رابط تسجيل الدخول أو اسم المستخدم */}
            {user ? (
              <>
                <span className="hover:underline cursor-pointer" onClick={handleLogout}>تسجيل الخروج</span>
                <span className="hover:underline">{user.name}</span>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:underline">تسجيل الدخول</Link>
                <Link href="/signup" className="hover:underline">إنشاء حساب</Link>
              </>
            )}

            {/* عربة التسوق */}
            <Link href="/cart">
              <div className="relative cursor-pointer flex items-center">
                <BiCart size="32px" />
                <span className="absolute top-0 right-0 bg-yellow-400 text-black rounded-full w-5 h-5 text-center text-xs">0</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* الجزء الثاني: شريط الفئات */}
      <div className={`bg-gray-700 text-white py-2 ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
        <div className="container mx-auto flex space-x-4 overflow-x-auto">
          {itemList.map((item, index) => (
            <Link href={item.path} key={index} className="hover:bg-gray-600 px-4 py-2 rounded-md">
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
