import {
  DateValue,
  Dialog,
  FieldError,
  Heading,
  ListBoxItem,
  TextField,
} from "react-aria-components";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Modal, ModalOverlay } from "../ui/modal";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Booking } from "@/app/(dashboard)/bookings/page";
import { useState } from "react";
import { toast } from "sonner";
import { CustomerSelectInput } from "./customer-select";
import { Select } from "../ui/select";
import { getLocalTimeZone, today } from "@internationalized/date";

type BookingFormInput = {
  customerID: string;
  offeringTypeID: string;
  offeringPackageID: string;
  date: Date;
  location: string;
};

type NewBooking = {
  userID: number;
  customerID: number;
  offeringTypeID: string;
  offeringPackageID: string;
  date: Date;
  location: string;
};

async function getOfferings() {
  const offerings = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/offerings`,
  );
  if (offerings.ok) {
    const offeringData = await offerings.json();
    return offeringData;
  } else {
    throw Error("Failed");
  }
}

async function createBooking(newBooking: BookingFormInput) {
  newBooking.userID = 1; // TODO
  const createResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings`,
    {
      method: "POST",
      body: JSON.stringify(newBooking),
    },
  );
  if (!createResponse.ok) {
    throw Error("Failed");
  }
}

export function BookingCreateForm() {
  const { register, handleSubmit, control, watch } =
    useForm<BookingFormInput>();
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);

  const offeringsQuery = useQuery({
    queryKey: ["offerings"],
    queryFn: getOfferings,
  });
  const offerings = offeringsQuery.data?.data;

  const selectedOfferingType = watch("offeringTypeID");

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    // onMutate: async (newBooking) => {
    //   // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    //   await queryClient.cancelQueries({ queryKey: ["bookings"] });
    //
    //   // Snapshot the previous value
    //   const previousBookings = queryClient.getQueryData(["bookings"]);
    //
    //   // Optimistically update to the new value
    //   queryClient.setQueryData(["bookings"], (old: Booking[]) => [
    //     ...old,
    //     newBooking,
    //   ]);
    //
    //   // Return a context object with the snapshotted value
    //   return { previousBookings: previousBookings };
    // },

    // If the mutation fails,
    // use the context returned from onMutate to roll back
    // onError: (err, newBooking, context) => {
    //   console.error("Failed to create booking.", err);
    // },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      console.log("Mutation completed, invalidated query.");
    },
  });

  const onSubmit = (data: BookingFormInput) => {
    console.log(data);
    const mutation = bookingMutation.mutateAsync(data);

    toast.promise(mutation, {
      loading: "Adding new Booking...",
      success: () => {
        return `Booking has been added successfully`;
      },
      error: "Unable to create the new Booking",
    });

    setOpen(false);
  };

  return (
    <>
      <Button onPress={() => setOpen(true)}>Create New</Button>
      <ModalOverlay isOpen={isOpen} onOpenChange={setOpen} isDismissable>
        <Modal>
          <Dialog className="px-6 py-6">
            <Heading slot="title" className="text-lg font-medium">
              Create Booking
            </Heading>
            <p className="text-sm text-base-400 pb-4">
              Create a new booking here for a customer.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4 pt-2"
            >
              <Controller
                control={control}
                name="customerID"
                rules={{ required: "Name is required." }}
                render={({ field }) => (
                  <CustomerSelectInput onSelect={field.onChange} />
                )}
              />

              <Controller
                control={control}
                name="offeringTypeID"
                rules={{ required: "Session Type is required." }}
                render={({ field }) => (
                  <Select
                    onSelectionChange={field.onChange}
                    label="Session Type"
                  >
                    {offerings?.map((offering) => (
                      <ListBoxItem
                        id={offering.id}
                        textValue={offering.name}
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 selected:bg-primary focus-visible:ring-1 focus-visible:ring-primary"
                      >
                        {offering.name}
                      </ListBoxItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="offeringPackageID"
                rules={{ required: "Offering Package is required." }}
                render={({ field }) => (
                  <Select
                    isDisabled={!selectedOfferingType}
                    onSelectionChange={field.onChange}
                    name="offeringPackageID"
                    label="Package"
                  >
                    {selectedOfferingType
                      ? offerings
                          .find(
                            (type) => type.id === Number(selectedOfferingType),
                          )
                          ?.packages?.map((sessionPackage: any) => (
                            <ListBoxItem
                              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 selected:bg-primary focus-visible:ring-1 focus-visible:ring-primary"
                              id={sessionPackage.id}
                              textValue={sessionPackage.name}
                            >
                              {sessionPackage.name}
                            </ListBoxItem>
                          ))
                      : null}
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="date"
                rules={{ required: "Session Date is required." }}
                render={({ field }) => (
                  <DatePicker
                    label="Session Date"
                    onChange={(date: DateValue) =>
                      field.onChange(date.toDate(getLocalTimeZone()))
                    }
                    minValue={today(getLocalTimeZone())}
                  />
                )}
              />

              <TextField>
                <Label>Location</Label>
                <Input
                  placeholder="Zion National Park, Utah"
                  minLength={2}
                  required
                  {...register("location")}
                />
                <FieldError className="text-xs text-red-500" />
              </TextField>
              <div className="pt-2 flex w-full justify-end space-x-2">
                <Button
                  variant="outline"
                  className="self-end"
                  onPress={() => setOpen(false)}
                >
                  Close
                </Button>
                <Button type="submit" className="self-end">
                  Save & Create
                </Button>
              </div>
            </form>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}
