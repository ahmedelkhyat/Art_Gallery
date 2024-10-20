import Hero from "./ui/Hero"; // المسار الصحيح
import Products from "./ui/Products"; // استيراد مكون المنتجات
import Footer from "./ui/Footer";
import MainNav from "./ui/navbar";
export default function Home() {
  return (
    <div>
      <MainNav />
      <Hero /> {/* التأكد من أن المكون مكتوب بشكل صحيح */}
      <Products /> {/* إضافة مكون المنتجات */}
      <Footer />
    </div>
  );
}
