import { IconLogout, IconNotification } from "@tabler/icons-react";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background text-base">
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 overflow-scroll my-3 mr-3 bg-surface rounded-xl shadow-md">
        {/* Main content body */}
        <div className="px-8 py-6 max-w-screen-xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
