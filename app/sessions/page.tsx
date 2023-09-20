import { columns } from "@/components/sessions/columns";
import { SessionForm } from "@/components/sessions/create-form";
import { DataTable } from "@/components/ui/data-table";

export default async function Sessions() {
  const sessionRes = await fetch("http://localhost:3000/api/sessions", {
    next: { tags: ["sessions"] },
  });
  const allSessions = await sessionRes.json();
  const tableData = allSessions.map((session: any) => ({
    date: session.date,
    packageName: session.sessionPackage.name,
    sessionType: session.sessionPackage.sessionType.name,
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
