'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice } from '@/app/lib/actions';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  return (
    <form action={updateInvoiceWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue={invoice.customer_id}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            defaultValue={invoice.amount}
            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
          />
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="pending"
                defaultChecked={invoice.status === 'pending'}
              />
              Pending <ClockIcon className="h-4 w-4" />
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="paid"
                defaultChecked={invoice.status === 'paid'}
              />
              Paid <CheckIcon className="h-4 w-4" />
            </label>
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices">Cancel</Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
