"use client";

import { Button, ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBookingByID } from "@/lib/api/bookings";
import { useQuery } from "@tanstack/react-query";
import { LuArrowLeft } from "react-icons/lu";

export default function Bookings({ params }: { params: { id: string } }) {
  const query = useQuery({
    queryKey: [`booking#${params.id}`],
    queryFn: () => getBookingByID(params.id),
  });

  if (query.error) return "An error has occurred: " + query.error.message;

  const booking = query.data;

  console.log("Booking data: ", booking);

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
        <Button variant="outline">Cancel Booking</Button>
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
      {query.data && (
        <Card>
          <CardHeader>
            <CardTitle>
              {booking.customer.firstName} {booking.customer.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="space-y-2">
                <h3 className="font-medium">Booking Details</h3>
                <p>{booking.location}</p>
                <p>{booking.date}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Package Details</h3>
                <p>{booking.package.name}</p>
                <p>${booking.package.price}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Customer Details</h3>
                <p>
                  {booking.customer.firstName} {booking.customer.lastName}
                </p>
                <p>{booking.customer.emailAddress}</p>
                <p>{booking.customer.mobileNumber}</p>
              </div>
            </div>
            <div className="space-x-2 pt-4">
              <Button variant="default">Send Booking Confirmation</Button>
              <Button variant="outline">Cancel Booking</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
