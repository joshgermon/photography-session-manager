import { UpcomingSessions } from "@/components/bookings/upcoming-sessions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col space-y-6">
      <header className="flex justify-between items-center pb-4">
        <div>
          <h2 className="font-semibold text-lg text-base-200">
           Your Home Dashboard
          </h2>
          <p className="text-base-300 text-sm">
            This is your list of bookings where you can manage them.
          </p>
        </div>
      </header>
      <div className="">
        <div>
          <UpcomingSessions />
        </div>
      </div>
    </main>
  );
}
