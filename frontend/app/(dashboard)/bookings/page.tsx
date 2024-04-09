"use client";

import { BookingCard } from "@/components/bookings/booking-card";
import { BookingCreateForm } from "@/components/bookings/create-form";
import { BookingTable } from "@/components/bookings/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBookings } from "@/lib/api/bookings";
import { useQuery } from "@tanstack/react-query";

export default function Bookings() {
  const query = useQuery({ queryKey: ["bookings"], queryFn: getBookings });

  if (query.error) return "An error has occurred: " + query.error.message;

  return (
    <main className="flex flex-col space-y-4">
      <header className="flex justify-between items-center pb-4">
        <div>
          <h2 className="font-semibold text-lg text-base-200">
            Manage Your Bookings
          </h2>
          <p className="text-base-300 text-sm">
            This is your list of bookings where you can manage them.
          </p>
        </div>
        <BookingCreateForm />
      </header>
      <div className="flex space-x-2">
        <Button className="bg-base-900">Upcoming</Button>
        <Button variant="ghost">Previous</Button>
        <Button variant="ghost">Canceled</Button>
      </div>
      <div className="flex-col space-y-2">
        {/* <BookingTable data={allBookings} /> */}
        {query.isLoading && (
          <div className="rounded-lg border border-base-border bg-surface text-base p-5 flex-col space-y-2">
            <div className="w-full rounded-sm h-5 bg-gray-50"></div>
            <div className="w-full rounded-sm h-5 bg-gray-50"></div>
          </div>
        )}
        {query.data &&
          query.data.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
      </div>
    </main>
  );
}
