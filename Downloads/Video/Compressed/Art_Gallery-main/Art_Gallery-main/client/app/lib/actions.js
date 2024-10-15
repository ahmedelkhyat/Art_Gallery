import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData) {
  // try {
  //   // Sending the form data to your backend or API endpoint
  //   const response = await fetch("/api/products", {
  //     method: "POST",
  //     body: formData, // FormData object containing image, category, and amount
  //   });
  //   // Parse the JSON response
  //   const result = await response.json();
  //   // Check if the request was successful
  //   if (!response.ok) {
  //     return { success: false, errors: result.errors || ["An error occurred"] };
  //   }
  //   // Success
  //   // return { success: true, data: result };
  // } catch (error) {
  //   // Return an error object in case of a network or other issue
  //   return { success: false, errors: ["Network error or server unavailable"] };
  // }
  // revalidatePath("/admin");
  // redirect("/admin");
}
