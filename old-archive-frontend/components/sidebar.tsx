import {
  IconLayoutCollage,
  IconPhotoAi,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex-none w-[275px] px-4 py-8 h-full flex flex-col">
      {/* Sidebar header */}
      <div className="px-2 pb-8">
        {/* Add your sidebar header content here */}
        <h1 className="text-xl text-slate-800 font-medium">Captura Books</h1>
      </div>
      {/* Sidebar content */}
      <nav className="flex flex-col py-6 space-y-2">
        <h2 className="font-medium pb-2 px-3">Manage</h2>
        <Link
          href="/"
          className={`flex px-3 py-2 rounded items-center text-sm space-x-2 transition-colors hover:bg-white hover:shadow-sm ${
            pathname === "/" && "bg-white border-input shadow-sm"
          }`}
        >
          <IconLayoutCollage size={24} color="#707070" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/sessions"
          className={`flex px-3 py-2 rounded border-input shadow-input items-center text-sm space-x-2 transition-colors hover:bg-white hover:shadow-sm ${
            pathname === "/sessions" && "bg-white border-input shadow-sm"
          }`}
        >
          <IconPhotoAi size={24} color="#707070" />
          <span>Sessions</span>
        </Link>
        <Link
          href="/packages"
          className={`flex px-3 py-2 rounded border-input shadow-input items-center text-sm space-x-2 transition-colors hover:bg-white hover:shadow-sm ${
            pathname === "/packages" && "bg-white border-input shadow-sm"
          }`}
        >
          <IconPhotoAi size={24} color="#707070" />
          <span>Packages</span>
        </Link>
        <Link
          href="/customers"
          className={`flex px-3 py-2 rounded items-center text-sm space-x-2 transition-colors hover:bg-white hover:shadow-sm ${
            pathname === "/customers" && "bg-white border-input shadow-sm"
          }`}
        >
          <IconUsers size={24} color="#707070" />
          <span>Customers</span>
        </Link>
        <h2 className="font-medium pt-4 pb-2 px-3">Your Account</h2>
        <Link
          href="/settings"
          className={`flex px-3 py-2 rounded items-center text-sm space-x-2 transition-colors hover:bg-white hover:shadow-sm ${
            pathname === "/settings" && "bg-white border-input shadow-sm"
          }`}
        >
          <IconSettings size={24} color="#707070" />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="mt-auto rounded-md p-2 py-4 gap-4 shadow-sm flex bg-white">
        <div className="w-10 h-10 aspect-square rounded-[100%] bg-slate-300 my-auto"></div>
        <div>
          <h4 className="text-sm font-medium">Angela & Josh Photo..</h4>
          <p className="text-sm text-slate-400">Pro Plan</p>
        </div>
      </div>
    </aside>
  );
}
