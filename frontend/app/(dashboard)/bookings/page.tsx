"use client";

import { BookingCreateForm } from "@/components/bookings/create-form";
import { BookingTable } from "@/components/bookings/table";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

export type Booking = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string | null;
};

async function getBookings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings`,
  );
  const data = await res.json();
  return data.data;
}

export default function Bookings() {
  const query = useQuery({ queryKey: ["bookings"], queryFn: getBookings });

  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;

  const allBookings = query.data;

  return (
    <main className="flex flex-col space-y-6">
      <div className="">
        <div className="pb-5">
          <h2 className="font-semibold text-xl text-base">
            Manage Your Bookings
          </h2>
          <p className="text-base-300">
            This is your list of bookings where you can manage them.
          </p>
        </div>
        <div className="flex justify-between">
          <Input type="text" className="max-w-80" placeholder="Search" />
          <BookingCreateForm />
        </div>
        <div className="py-4 flex space-x-6">
          <BookingTable data={allBookings} />
        </div>
      </div>
    </main>
  );
}
