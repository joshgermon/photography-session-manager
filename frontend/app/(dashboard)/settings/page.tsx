"use client";

import { Button } from "@/components/ui/button";

export default function Bookings() {
  return (
    <main className="flex flex-col space-y-4">
      <header className="flex justify-between items-center pb-4">
        <div>
          <h2 className="font-semibold text-lg text-base-200">
            Your Settings
          </h2>
          <p className="text-base-300 text-sm">
            This is your list of bookings where you can manage them.
          </p>
        </div>
      </header>
      <div className="flex space-x-2">
        <Button className="bg-base-900">General</Button>
        <Button variant="ghost">Account</Button>
        <Button variant="ghost">Other</Button>
      </div>
      <div className="flex-col space-y-2">
        <div className="rounded-lg border border-base-border bg-surface text-base">
          <div className="p-4">
            <h2 className="font-semibold">General</h2>
            <p className="text-base-300 text-sm">
              This is your list of bookings where you can manage them.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
