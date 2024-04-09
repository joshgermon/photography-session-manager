"use client";

import { CustomerTable } from "@/components/customers/table";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { CustomerCreateForm } from "@/components/customers/create-form";
import { getCustomers } from "@/lib/api/customers";

export default function Customers() {
  const query = useQuery({ queryKey: ["customers"], queryFn: getCustomers });
  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;
  const allCustomers = query.data;

  console.log(allCustomers);

  return (
    <main className="flex flex-col space-y-6">
      <div className="">
        <div className="pb-5">
          <h2 className="font-medium text-xl text-base">
            Manage Your Customers
          </h2>
          <p className="text-base-300">
            This is your list of customers where you can manage them.
          </p>
        </div>
        <div className="flex justify-between">
          <Input type="text" className="max-w-80" placeholder="Search" />
          <CustomerCreateForm />
        </div>
        <div className="py-4 flex space-x-6">
          <CustomerTable data={allCustomers} />
        </div>
      </div>
    </main>
  );
}
