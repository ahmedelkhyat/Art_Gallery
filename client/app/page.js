import Hero from "./ui/Hero";  // المسار الصحيح
import Products from "./ui/Products"; // استيراد مكون المنتجات

export default function Home() {
  return (
    <div>
      <Hero />  {/* التأكد من أن المكون مكتوب بشكل صحيح */}
      <Products /> {/* إضافة مكون المنتجات */}
    </div>
  );
}  

