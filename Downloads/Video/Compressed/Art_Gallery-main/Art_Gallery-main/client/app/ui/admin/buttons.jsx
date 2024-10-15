import Link from "next/link";
import clsx from "clsx";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export function CreateProduct() {
  return (
    <Link
      href="/admin/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Product</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteProduct({ id }) {
  //pass as action in form
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form>
      <button
        type="submit"
        className="rounded-md border p-2 hover:bg-red-600 hover:text-white"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}

export function UpdateProduct({ id }) {
  return (
    // href = /admin/${id}/edit
    <Link
      href={`/admin/${id}/edit`}
      className="rounded-md border p-2 hover:bg-green-600 hover:text-white"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}
