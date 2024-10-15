"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {
  TagIcon,
  PlusIcon,
  CurrencyDollarIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../buttons";
import { createProduct } from "../../../lib/actions";

// Validation schema using Yup
const ProductSchema = Yup.object().shape({
  image: Yup.mixed().required("Please upload an image"),
  category: Yup.string().required("Please select a category"),
  title: Yup.string().required("Please enter a title"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .min(0.01, "Please enter an amount greater than $0")
    .required("Amount is required"),
});

export default function ProductForm({ categories }) {
  const [message, setMessage] = useState(null);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("category", values.category);
    formData.append("title", values.title);
    formData.append("amount", values.amount);

    try {
      const result = await createProduct(formData);
      if (result.success) {
        setMessage("Product created successfully");
      } else {
        setErrors(result.errors);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const [selectedFileName, setSelectedFileName] = useState("");

  return (
    <Formik
      initialValues={{ image: null, category: "", amount: "", title: "" }}
      validationSchema={ProductSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Image Upload */}
          <div className="mb-4 flex items-center">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium mr-5"
            >
              Choose Image
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                type="file"
                name="image"
                id="image"
                className="sr-only"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("image", file); // Set Formik's field value
                  setSelectedFileName(file ? file.name : ""); // Update selected file name
                }}
              />
              <label
                htmlFor="image"
                className="relative flex min-h-[50px] items-center justify-center rounded-md border border-dashed bg-white hover:cursor-pointer hover:bg-slate-300 border-[#e0e0e0] p-12 text-center transition-colors"
              >
                {selectedFileName ? (
                  <span className="text-sm text-gray-700">
                    {selectedFileName}
                  </span> // Show the file name
                ) : (
                  <PlusIcon className="pointer-events-none h-[30px] w-[30px] text-gray-500" />
                )}
              </label>
              <ErrorMessage
                name="image"
                component="div"
                className="mt-2 text-sm text-red-500"
              />
            </div>
          </div>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Choose a Title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Field
                  id="title"
                  name="title"
                  type="text"
                  step="0.01"
                  placeholder="Enter a title"
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
          </div>
          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium"
            >
              Choose category
            </label>
            <div className="relative">
              <Field
                as="select"
                id="category"
                name="category"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="category-error"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Field>
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <ErrorMessage
              name="category"
              component="div"
              className="mt-2 text-sm text-red-500"
            />
          </div>

          {/* Product Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Choose an amount
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <Field
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="Enter USD amount"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <ErrorMessage
                name="amount"
                component="div"
                className="mt-2 text-sm text-red-500"
              />
            </div>
          </div>

          {/* Submission Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/admin"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              Create Product
            </Button>
          </div>

          {/* Display message if product is created */}
          {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
        </Form>
      )}
    </Formik>
  );
}
