import { Booking } from "@/lib/api/bookings";
import { addMinutes, format, isPast } from "date-fns";
import { ButtonLink } from "../ui/button";
import { BookingDeleteButton } from "./delete-button";

export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <div className="rounded-lg border border-base-border bg-surface text-base">
      <div className="flex flex-col lg:flex-row px-5 py-5 space-x-4 text-sm">
        <div className="flex-1 flex flex-col">
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
            {format(booking.date, "h:mm a")} -{" "}
            {format(
              addMinutes(
                booking.date,
                booking.package.durationInMinutes,
              ),
              "h:mm a",
            )}
          </p>
        </div>
        <div className="flex flex-col my-auto">
          <div className="flex items-center rounded-md bg-grey-100 text-[0.6rem] uppercase font-semibold tracking-wide px-2 py-2">
            <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
            <span className="leading-none">{isPast(booking.date) ? "Completed" : "Upcoming"}</span>
          </div>
        </div>
        <div className="flex-1 flex justify-end space-x-2">
          <BookingDeleteButton bookingID={booking.id} />
          <ButtonLink href={`bookings/${booking.id}`} variant="outline">
            Edit
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
