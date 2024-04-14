"use client";

import { Booking, getBookings } from "@/lib/api/bookings";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { addMinutes, format } from "date-fns";
import { ButtonLink } from "../ui/button";

export function UpcomingSessions() {
  const query = useQuery({ queryKey: ["bookings"], queryFn: getBookings });

  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;

  const allBookings = query.data;

  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle>
          Your Upcoming Sessions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {allBookings.map((booking: Booking) => (
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
                  {format(booking.date, "EEE',' dd MMM")}
                </p>
                <p className="text-base-500">
                  {format(booking.date, "h:mm a")} -{" "}
                  {format(
                    addMinutes( booking.date, booking.package.durationInMinutes ),
                    "h:mm a",
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <ButtonLink href="/bookings">View All Bookings</ButtonLink>
        </div>
      </CardContent>
    </Card>
  );
}
