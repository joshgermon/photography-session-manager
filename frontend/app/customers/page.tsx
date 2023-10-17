import { columns } from "@/components/clients/columns";
import { ClientForm } from "@/components/clients/create-form";
import { DataTable } from "@/components/ui/data-table";

export default async function Customers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/customers`,
  );
  const allCustomers = await res.json();

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
