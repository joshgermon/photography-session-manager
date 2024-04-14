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
import { useState } from "react";
import { toast } from "sonner";
import { CustomerSelectInput } from "./customer-select";
import { Select } from "../ui/select";
import { getLocalTimeZone, today } from "@internationalized/date";
import { getSessionTypesAndPackages } from "@/lib/api/packages";
import { BookingFormInput, createBooking } from "@/lib/api/bookings";


export function BookingCreateForm() {
  const { handleSubmit, control, watch } =
    useForm<BookingFormInput>();
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);

  const offeringsQuery = useQuery({
    queryKey: ["offerings"],
    queryFn: getSessionTypesAndPackages,
  });
  const offerings = offeringsQuery?.data;

  const selectedOfferingType = watch("offeringTypeID");

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      console.log("Mutation completed, invalidated query.");
    },
  });

  const onSubmit = (data: BookingFormInput) => {
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
                    granularity="minute"
                    onChange={(date: DateValue) =>
                      field.onChange(date.toDate(getLocalTimeZone()))
                    }
                    minValue={today(getLocalTimeZone())}
                  />
                )}
              />

              <Controller
                control={control}
                name="location"
                rules={{ required: "Location is required." }}
                render={({
                  field,
                  fieldState: { invalid },
                }) => (
                  <TextField type="text" isInvalid={invalid}  >
                    <Label>Location</Label>
                    <Input
                      placeholder="Zion National Park, Utah"
                      minLength={2}
                      required
                      {...field}
                    />
                    <FieldError className="text-xs text-red-500" />
                  </TextField>)}
              />

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
