import { columns } from "@/components/sessions/columns";
import { SessionForm } from "@/components/sessions/create-form";
import { DataTable } from "@/components/ui/data-table";
import { SessionData, getSessions } from "@/lib/session";

export default async function Sessions() {
  const allSessions = await getSessions();
  const tableData = allSessions.map((session: SessionData) => ({
    id: session.id,
    date: session.date,
    packageName: session.sessionPackage?.name,
    sessionType: session.sessionPackage?.sessionType?.name,
    clientName: session.client.firstName,
    location: session.location,
  }));

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
        data={tableData}
        headerItems={<SessionForm />}
      />
    </div>
  );
}
