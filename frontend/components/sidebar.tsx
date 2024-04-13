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
    <aside className="flex-none w-[14.5rem] px-4 py-8 h-full flex flex-col">
      {/* Sidebar header */}
      <div className="px-2 pb-2">
        <h1 className="text-lg text-base font-semibold pt-1">Captura Books</h1>
      </div>
      {/* Sidebar content */}
      <nav className="flex flex-col py-6 space-y-2">
        <NavLink
          label="Dashboard"
          href="/dash"
          icon={<LuLayoutDashboard size={21} color="#212927" />}
        />
        <h2 className="text-sm font-medium pt-4 pb-1 px-3">Manage</h2>
        <NavLink
          label="Bookings"
          href="/bookings"
          icon={<LuBookPlus size={21} color="#212927" />}
        />
        <NavLink
          label="Customers"
          href="/customers"
          icon={<LuUser size={21} color="#212927" />}
        />
        <NavLink
          label="Packages"
          href="/packages"
          icon={<LuPackage size={21} color="#212927" />}
        />
        <h2 className="text-sm font-medium pt-4 pb-1 px-3">Your Account</h2>
        <NavLink
          label="Settings"
          href="/settings"
          icon={<LuSettings size={21} color="#212927" />}
        />
      </nav>
      <div className="mt-auto rounded-md p-2 py-4 gap-4 shadow-sm flex bg-surface">
        <div className="w-10 h-10 aspect-square rounded-[100%] bg-primary dark:bg-slate-800 my-auto"></div>
        <div>
          <h4 className="text-sm font-medium">Angela & Josh ..</h4>
          <p className="text-sm text-muted-foreground/60">Pro Plan</p>
        </div>
      </div>
    </aside>
  );
}
