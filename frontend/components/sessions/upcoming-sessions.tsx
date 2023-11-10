"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

async function getSessions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings`,
  );
  const data = await res.json();
  return data;
}

export function UpcomingSessions() {
  const query = useQuery({ queryKey: ["sessions"], queryFn: getSessions });
  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;

  return (
    <div className="">
      <h2 className="text-xl font-medium">Upcoming Sessions</h2>
      <div className="flex flex-col py-4 space-y-4">
        {query.data.data.map((session) => (
          <div
            key={session.id}
            className="py-4 px-6 rounded-lg border text-card-foreground bg-white shadow-sm"
          >
            <h3 className="text-lg font-medium">
              {session.customer.firstName} {session.customer.lastName}
            </h3>
            <p className="text-xs text-muted-foreground">
              {session.package.type} - {session.package.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
