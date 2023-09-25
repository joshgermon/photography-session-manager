"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import {
  IconLayoutCollage,
  IconLogout,
  IconNotification,
  IconPhotoAi,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex h-screen bg-slate-100">
              {/* Sidebar */}
              <aside className="flex-none w-[245px]">
                {/* Sidebar header */}
                <div className="px-6 py-8">
                  {/* Add your sidebar header content here */}
                  <h1 className="text-xl text-slate-800 font-semibold">
                    Captura Books
                  </h1>
                </div>
                {/* Sidebar content */}
                <nav className="flex flex-col px-4 py-6 space-y-2">
                  {/* Add your sidebar navigation links here */}
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
                      pathname === "/sessions" &&
                      "bg-white border-input shadow-sm"
                    }`}
                  >
                    <IconPhotoAi size={24} color="#707070" />
                    <span>Sessions</span>
                  </Link>
                  <Link
                    href="/customers"
                    className={`flex px-3 py-2 rounded items-center text-sm space-x-2 transition-colors hover:bg-white hover:shadow-sm ${
                      pathname === "/customers" &&
                      "bg-white border-input shadow-sm"
                    }`}
                  >
                    <IconUsers size={24} color="#707070" />
                    <span>Customers</span>
                  </Link>
                  <Link
                    href="/settings"
                    className={`flex px-3 py-2 rounded items-center text-sm space-x-2 transition-colors hover:bg-white hover:shadow-sm ${
                      pathname === "/settings" &&
                      "bg-white border-input shadow-sm"
                    }`}
                  >
                    <IconSettings size={24} color="#707070" />
                    <span>Settings</span>
                  </Link>
                </nav>
              </aside>

              {/* Main content */}
              <main className="flex-1 overflow-scroll my-3 mr-3 bg-white rounded-xl shadow-md">
                {/* Main content header */}
                <div className="pt-6 pb-6 px-10 border-b border-gray-200 flex justify-between">
                  {/* Add your main content header content here */}
                  <h3>{new Date().toDateString()}</h3>
                  <div className="flex space-x-4">
                    <ThemeToggle />
                    <IconNotification />
                    <IconLogout />
                  </div>
                </div>
                {/* Main content body */}
                <div className="px-10 py-8">{children}</div>
              </main>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
