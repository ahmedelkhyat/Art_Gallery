// import Form from "@/app/ui/invoices/edit-form";

// import { notFound } from "next/navigation";
import { fetchProductById, fetchProducts } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/admin/products/breadcrumbs";

export default async function Page({ params }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchProductById(),
    fetchProducts(),
  ]);

  // if (!invoice) {
  //   notFound();
  // }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/admin" },
          {
            label: "Edit Product",
            href: `/admin/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* <Form invoice={invoice} customers={customers} /> */}
    </main>
  );
}
