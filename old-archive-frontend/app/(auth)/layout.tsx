"use client";

import "../globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "../providers";

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
            <div className="flex h-screen">
              {/* Main content */}
              <main className="flex-1 h-full overflow-scroll my-3 mr-3 bg-white rounded-xl shadow-md">
                <div className="px-10 py-8 h-full">{children}</div>
              </main>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
