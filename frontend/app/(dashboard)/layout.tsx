import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Sidebar } from "@/components/sidebar";
import { userHasValidSession } from '@/lib/api/users';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const sessionId = cookies().get('session_id');
  if (!sessionId?.name) {
    return redirect('/login');
  }

  const validSession = await userHasValidSession();
  if (!validSession) {
    return redirect('/login');
  }

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
