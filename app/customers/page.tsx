import { columns } from "@/components/clients/columns";
import { ClientForm } from "@/components/clients/create-form";
import { DataTable } from "@/components/ui/data-table";
import { getClients } from "@/lib/customers";

export default async function Customers() {
  const allClients = await getClients();

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
