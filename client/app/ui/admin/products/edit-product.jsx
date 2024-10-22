"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TagIcon,
  CurrencyDollarIcon,
  TicketIcon,
  ChatBubbleBottomCenterTextIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/admin/buttons";

// Define a Yup validation schema
const ProductSchema = Yup.object().shape({
  title: Yup.string().required("Product title is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than zero")
    .required("Product price is required"),
  description: Yup.string().required("Product description is required"),
  category: Yup.string().required("Category is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .positive("Stock must be greater than zero")
    .required("Product stock count is required"),
});

export default function EditProductForm({ product, categories }) {
  const [message, setMessage] = useState(null);

  // Handle form submission using Formik's onSubmit
  const handleSubmit = async (values, { setSubmitting }) => {
    setMessage(null); // Clear message
    const formData = new FormData();
    formData.append("stock", values.stock);
    formData.append("category_id", values.category);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.amount);
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });
      console.log(formData);
      if (response.ok) {
        setMessage("Product updated successfully!");
      } else {
        setMessage("Failed to update product.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the product.");
      console.error("Error updating product:", error);
    } finally {
      setSubmitting(false); // Enable the submit button again
    }
  };

  return (
    <Formik
      initialValues={{
        title: product.title || "",
        price: product.price || 0,
        description: product.description || "",
        category: product.category || "",
        stock: product.stock || 0,
      }}
      validationSchema={ProductSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Product title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Product title
            </label>
            <div className="relative">
              <Field
                id="title"
                name="title"
                type="text"
                placeholder="Enter product title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TicketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ErrorMessage
              name="title"
              component="div"
              className="mt-2 text-sm text-red-500"
            />
          </div>
          {/* Product price */}
          <div className="mb-4">
            <label htmlFor="price" className="mb-2 block text-sm font-medium">
              Choose a price
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Field
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Enter USD price"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <ErrorMessage
              name="price"
              component="div"
              className="mt-2 text-sm text-red-500"
            />
          </div>
          {/* Product description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Product description
            </label>
            <div className="relative">
              <Field
                id="description"
                name="description"
                as="textarea"
                placeholder="Enter product description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 resize-y h-24"
              />
              <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ErrorMessage
              name="description"
              component="div"
              className="mt-2 text-sm text-red-500"
            />
          </div>
          {/* Product category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium"
            >
              Choose Category
            </label>
            <div className="relative">
              <select
                defaultValue={product.category_id}
                id="category"
                name="category"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <ErrorMessage
              name="category"
              component="div"
              className="mt-2 text-sm text-red-500"
            />
          </div>
          {/* Product stock */}
          <div className="mb-4">
            <label htmlFor="stock" className="mb-2 block text-sm font-medium">
              Product Count
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Field
                  id="stock"
                  name="stock"
                  type="number"
                  step="1"
                  placeholder="Enter product count"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CalculatorIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <ErrorMessage
              name="stock"
              component="div"
              className="mt-2 text-sm text-red-500"
            />
          </div>
          {/*  Submit button */}
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/admin"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Edit Product</Button>
          </div>
          {message}
        </Form>
      )}
    </Formik>
  );
}
