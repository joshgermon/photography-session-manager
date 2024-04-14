"use client";

import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { CustomerCreateForm } from "@/components/customers/create-form";
import { Customer, getCustomers } from "@/lib/api/customers";
import { ButtonLink } from "@/components/ui/button";

export default function Customers() {
  const query = useQuery({ queryKey: ["customers"], queryFn: getCustomers });
  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;
  const customers = query.data;

  return (
    <main className="flex flex-col space-y-4">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg text-base-200">
            Manage Your Customers
          </h2>
          <p className="text-base-300 text-sm">
            This is your list of customers where you can manage them.
          </p>
        </div>
        <CustomerCreateForm />
      </header>
      <div className="flex justify-between">
        <Input type="text" className="max-w-80" placeholder="Search" />
      </div>
      <div className="space-y-2 w-full">
        {customers.map((customer: Customer) => (
          <div className="rounded-lg border border-base-border bg-surface text-base w-full">
            <div className="flex flex-col lg:flex-row px-5 py-5 space-x-4 text-sm">
              <div className="">
                <div className="w-10 h-10 bg-base-900 rounded-full flex justify-center items-center">
                  {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <p className="font-semibold text-base-200">
                  {customer.firstName} {customer.lastName}
                </p>
                <p className="text-base-500">{customer.emailAddress}</p>
              </div>
              <div className="flex justify-end space-x-2">
                <ButtonLink href={`customers/${customer.id}`} variant="outline">
                  Edit
                </ButtonLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
