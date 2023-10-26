"use client";

import { columns } from "@/components/sessions/columns";
import { SessionForm } from "@/components/sessions/create-form";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";

async function getSessions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings`,
  );
  const data = await res.json();
  return data;
}

export default function Sessions() {
  const query = useQuery({ queryKey: ["sessions"], queryFn: getSessions });
  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;

  return (
    <div className="w-100">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-1">Your Sessions</h2>
        <p className="text-gray-500">
          This is your home dashboard where you can manage everything.
        </p>
      </div>
      <DataTable
        columns={columns}
        data={query.data}
        headerItems={<SessionForm />}
      />
    </div>
  );
}
