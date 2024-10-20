import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const formData = new FormData();

// products.forEach((product, index) => {
//   // Append each field from the product object
//   formData.append(`products[${index}][product_id]`, product.product_id);
//   formData.append(`products[${index}][title]`, product.title);
//   formData.append(`products[${index}][description]`, product.description);
//   formData.append(`products[${index}][price]`, product.price);
//   formData.append(`products[${index}][stock]`, product.stock);
//   formData.append(`products[${index}][category_id]`, product.category_id);

//   // If image is a URL, treat it as a string. If it's a file, handle file uploads.
//   formData.append(`products[${index}][image_url]`, product.image_url);
// });

// The `formData` object is now ready to be sent to the API
export async function createProduct(formData) {
  try {
    // Sending the form data to your backend or API endpoint
    const response = await fetch("/api/products", {
      method: "POST",
      body: formData, // FormData object containing image, category, and amount
    });
    // Parse the JSON response
    const result = await response.json();
    // Check if the request was successful
    if (!response.ok) {
      return { success: false, errors: result.errors || ["An error occurred"] };
    }
    // Success
    return { success: true, data: result };
  } catch (error) {
    // Return an error object in case of a network or other issue
    return { success: false, errors: ["Network error or server unavailable"] };
  }
  // revalidatePath("/admin");
  // redirect("/admin");
}
