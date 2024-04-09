import { Customer } from "./customers";
import { Package } from "./packages";

export type Booking = {
  id: number;
  date: string;
  location: string | null;
  createdAt: string;
  package: Package;
  customer: Customer;
};

export async function getBookings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings`,
  );
  const data = await res.json();
  return data.data as Booking[];
}

export async function getBookingByID(id: string | number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings/${id}`,
  );
  const data = await res.json();
  return data.data as Booking;
}
