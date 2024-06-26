"use client";

import {
  LuBookPlus,
  LuLayoutDashboard,
  LuPackage,
  LuSettings,
  LuUser,
} from "react-icons/lu";
import { NavLink } from "./ui/nav-link";

export function Sidebar() {
  return (
    <aside className="flex-none w-[16rem] px-3 py-3 h-full flex flex-col">
      <div className="rounded-md p-2 py-3 gap-3 shadow-sm flex bg-surface">
        <div className="w-8 h-8 aspect-square rounded-[100%] bg-gray-200 dark:bg-slate-800 my-auto"></div>
        <div>
          <h4 className="text-sm font-medium">Angela & Josh Photgra..</h4>
          <p className="text-xs text-muted-foreground/60">Pro Plan - 6 Days</p>
        </div>
      </div>
      {/* Sidebar content */}
      <nav className="flex flex-col py-6 space-y-1">
        <NavLink
          label="Dashboard"
          href="/"
          icon={<LuLayoutDashboard size={18} color="#212927" />}
        />
        <h2 className="text-sm font-medium pt-4 pb-1 px-3">Manage</h2>
        <NavLink
          label="Bookings"
          href="/bookings"
          icon={<LuBookPlus size={18} color="#212927" />}
        />
        <NavLink
          label="Customers"
          href="/customers"
          icon={<LuUser size={18} color="#212927" />}
        />
        <NavLink
          label="Packages"
          href="/packages"
          icon={<LuPackage size={18} color="#212927" />}
        />
        <h2 className="text-sm font-medium pt-4 pb-1 px-3">Your Account</h2>
        <NavLink
          label="Settings"
          href="/settings"
          icon={<LuSettings size={18} color="#212927" />}
        />
      </nav>
    </aside>
  );
}
