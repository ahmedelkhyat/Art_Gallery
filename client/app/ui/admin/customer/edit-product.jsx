"use client";

// import { updateInvoice } from "@/app/lib/actions";
import { useActionState } from "react";

import {
  TagIcon,
  CurrencyDollarIcon,
  TicketIcon,
  ChatBubbleBottomCenterTextIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { Button } from "@/app/ui/admin/buttons";

export default function EditProductForm({ product, categories }) {
  const initialState = { message: null, errors: {} };
  // const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  // const [state, formAction] = useActionState(updateInvoiceWithId, initialState);

  return (
    //action={formAction}
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* product title */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Product title
          </label>
          <div className="relative">
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={product.title}
              placeholder="Enter product title "
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <TicketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Product Prcie */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose a price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={product.price}
                placeholder="Enter USD price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Product description */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Product description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              type="text"
              defaultValue={product.description}
              placeholder="Enter product description "
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 resize-y h-24"
            />

            <ChatBubbleBottomCenterTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Product Category  */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose Category
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={product.category}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Product Count */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Product Count
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="1"
                defaultValue={product.rating.count}
                placeholder="Enter USD price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalculatorIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
