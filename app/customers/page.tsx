import { columns } from "@/components/clients/columns";
import { ClientForm } from "@/components/clients/create-form";
import { DataTable } from "@/components/ui/data-table";

export default async function Customers() {
  const clientRes = await fetch("http://localhost:3000/api/customers", {
    next: { tags: ["clients"] },
  });
  const allClients = await clientRes.json();

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
        data={allClients}
        searchColumn="name"
        headerItems={<ClientForm />}
      />
    </div>
  );
}
