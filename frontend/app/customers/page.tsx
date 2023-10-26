"use client";

import { columns } from "@/components/clients/columns";
import { ClientForm } from "@/components/clients/create-form";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";

async function getCustomers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/customers`,
  );
  const data = await res.json();
  return data;
}

export default function Customers() {
  const query = useQuery({ queryKey: ["customers"], queryFn: getCustomers });
  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;
  const allCustomers = query.data;

  return (
    <div className="w-100">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Manage your Clients</h2>
        <p className="text-gray-500">
          This is your home dashboard where you can manage everything.
        </p>
      </div>
      <DataTable
        columns={columns}
        data={allCustomers}
        searchColumn="name"
        headerItems={<ClientForm />}
      />
    </div>
  );
}
