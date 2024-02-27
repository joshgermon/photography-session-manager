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
        {/* Main content header */}
        <div className="pt-6 pb-6 px-10 border-b border-base-border flex justify-between">
          {/* Add your main content header content here */}
          <h3 className="">Good Morning 👋</h3>
          <div className="flex space-x-4">
            <IconNotification />
            <IconLogout />
          </div>
        </div>
        {/* Main content body */}
        <div className="px-10 py-8 max-w-screen-2xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
