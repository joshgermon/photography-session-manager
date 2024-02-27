"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { IconLogout, IconNotification } from "@tabler/icons-react";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Providers } from "@/app/providers";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex h-screen bg-slate-100">
              <Sidebar />
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
