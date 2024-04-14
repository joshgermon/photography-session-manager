import { Customer } from "./customers";
import { Package } from "./packages";

export type BookingResponse = {
  id: number;
  date: string;
  location: string | null;
  createdAt: string;
  package: Package;
  customer: Customer;
};

export type Booking = {
  id: number;
  date: string;
  location: string | null;
  createdAt: string;
  package: Package;
  customer: Customer;
};

export type BookingFormInput = {
  customerID: string;
  offeringTypeID: string;
  offeringPackageID: string;
  date: Date;
  location: string;
};


function transformBookingResponse(booking: BookingResponse) {
  return {
    id: booking.id,
    date: new Date(booking.date),
    location: booking.location,
    createdAt: new Date(booking.createdAt),
    package: booking.package,
    customer: booking.customer
  }
}

export async function getBookings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings`,
  );
  const data = await res.json();
  return data.data.map((booking: BookingResponse) => transformBookingResponse(booking));
}

export async function getBookingByID(id: string | number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings/${id}`,
  );
  const data = await res.json();
  return data.data as Booking;
}

export async function createBooking(newBooking: BookingFormInput) {
  const createResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings`,
    {
      method: "POST",
      body: JSON.stringify({ userID: 1, ...newBooking}),
    },
  );
  if (!createResponse.ok) {
    throw Error("Failed");
  }
}

export async function deleteBooking(bookingID: number) {
  const createResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings/${bookingID}`,
    { method: "DELETE" },
  );
  if (!createResponse.ok) {
    throw Error("Failed");
  }
}
