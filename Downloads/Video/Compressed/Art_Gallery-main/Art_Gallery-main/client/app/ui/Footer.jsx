"use client"; // مكون عميل

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // استيراد أيقونات وسائل التواصل الاجتماعي

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* قسم الروابط */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">معلومات عنا</h4>
            <ul>
              <li><Link href="/about" className="hover:underline hover:text-yellow-400">من نحن</Link></li>
              <li><Link href="/contact" className="hover:underline hover:text-yellow-400">اتصل بنا</Link></li>
              <li><Link href="/careers" className="hover:underline hover:text-yellow-400">فرص العمل</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">خدمات العملاء</h4>
            <ul>
              <li><Link href="/faq" className="hover:underline hover:text-yellow-400">الأسئلة الشائعة</Link></li>
              <li><Link href="/returns" className="hover:underline hover:text-yellow-400">سياسة الإرجاع</Link></li>
              <li><Link href="/shipping" className="hover:underline hover:text-yellow-400">الشحن والتوصيل</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">تسوق</h4>
            <ul>
              <li><Link href="/products" className="hover:underline hover:text-yellow-400">المنتجات</Link></li>
              <li><Link href="/categories" className="hover:underline hover:text-yellow-400">الفئات</Link></li>
              <li><Link href="/specials" className="hover:underline hover:text-yellow-400">العروض الخاصة</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">سياسات</h4>
            <ul>
              <li><Link href="/privacy" className="hover:underline hover:text-yellow-400">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="hover:underline hover:text-yellow-400">شروط الخدمة</Link></li>
              <li><Link href="/cookies" className="hover:underline hover:text-yellow-400">سياسة الكوكيز</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">تابعنا</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-yellow-400">
                <FaFacebookF size={20} />
              </Link>
              <Link href="#" className="hover:text-yellow-400">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="hover:text-yellow-400">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="hover:text-yellow-400">
                <FaLinkedinIn size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* قسم حقوق النشر */}
        <div className="text-center text-gray-400">
          <p>© 2024 MyStore. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
