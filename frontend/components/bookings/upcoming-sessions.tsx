"use client";

import { getBookings } from "@/lib/api/bookings";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { addMinutes, format } from "date-fns";
import { formatTimeDifference } from "@/lib/utils";

export function UpcomingSessions() {
  const query = useQuery({ queryKey: ["bookings"], queryFn: getBookings });

  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;

  const allBookings = query.data;

  return (
    <Card className="flex-grow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Your Upcoming Sessions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        <div className="flex flex-col space-y-2 mt-4">
          {allBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col lg:flex-row py-2 text-sm space-x-4"
            >
              <div className="flex flex-col">
                <p className="font-semibold text-base-200">
                  {booking.customer.firstName} {booking.customer.lastName}
                </p>
                <p className="text-base-500">{booking.package.name}</p>
              </div>

              <div className="flex-1">
                <p className="font-semibold">
                  {format(new Date(booking.date), "EEE',' dd MMM")}
                </p>
                <p className="text-base-500">
                  {format(new Date(booking.date), "h:mm a")} -{" "}
                  {format(
                    addMinutes(
                      new Date(booking.date),
                      booking.package.durationInMinutes,
                    ),
                    "h:mm a",
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
