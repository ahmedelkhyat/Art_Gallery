import axios from "axios";

export async function fetchProducts() {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchProductById(id) {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchCategories() {
  try {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
