"use client";

import { BookingDeleteButton } from "@/components/bookings/delete-button";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBookingByID } from "@/lib/api/bookings";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { DateValue, TextField } from "react-aria-components";
import { LuArrowLeft } from "react-icons/lu";

export default function Bookings({ params }: { params: { id: string } }) {
  const query = useQuery({
    queryKey: [`booking#${params.id}`],
    queryFn: () => getBookingByID(params.id),
  });

  if (query.error) return "An error has occurred: " + query.error.message;

  const booking = query.data;

  return (
    <main className="flex flex-col space-y-6 max-w-screen-xl mx-auto">
      <header className="flex justify-between items-center pb-4">
        <div className="flex space-x-4 items-center">
          <ButtonLink href="/bookings" variant="outline">
            <LuArrowLeft />
          </ButtonLink>
          <h2 className="font-semibold text-lg text-base-200">
            Your Upcoming Booking
          </h2>
        </div>
        <BookingDeleteButton bookingID={Number(params.id)} redirect={true} />
      </header>
      <div className="flex space-x-2">
        <Button className="bg-base-900">Details</Button>
        <Button variant="ghost">Actions</Button>
      </div>
      {query.isLoading && (
        <Card className="space-y-2 p-5">
          <div className="w-full rounded-sm h-5 bg-gray-50"></div>
          <div className="w-full rounded-sm h-5 bg-gray-50"></div>
          <div className="w-full rounded-sm h-5 bg-gray-50"></div>
        </Card>
      )}
      {booking && (
        <Card>
          <CardHeader>
            <CardTitle>
              Booking Details
            </CardTitle>
            <p className="text-base-400 text-sm">Information about your booking</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-x-4">
              <div className="space-y-4">
                <div>
                  <p className="text-base-500 text-sm font-semibold">Date of Session</p>
                  <p className="text-base-200">{format(booking.date, "EEEE',' d MMMM yyyy")}</p>
                </div>
                <div>
                  <p className="text-base-500 text-sm font-semibold">Location</p>
                  <p className="text-base-200">{booking.location}</p>
                </div>
                <div>
                  <p className="text-base-500 text-sm font-semibold">Package</p>
                  <p className="text-base-200">{booking.package.name}</p>
                </div>
              </div>
            </div>
            <div className="space-x-2 pt-4">
              <Button variant="default">Send Booking Confirmation</Button>
              <Button variant="outline">Reschedule</Button>
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>
            Activity
          </CardTitle>
          <p className="text-base-400 text-sm">All actions taken on this booking</p>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </main>
  );
}
