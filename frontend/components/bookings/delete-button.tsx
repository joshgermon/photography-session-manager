import { Dialog, DialogTrigger, Heading, Modal } from "react-aria-components";
import { Button } from "../ui/button";
import { ModalOverlay } from "../ui/modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteBooking } from "@/lib/api/bookings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type BookingDeleteButtonProps = {
  bookingID: number;
  redirect: boolean;
}

export function BookingDeleteButton({ bookingID, redirect }: BookingDeleteButtonProps) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const bookingDeleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      console.log("Mutation completed, invalidated query.");
    },
  });

  const onDelete = (bookingID: number) => {
    const mutation = bookingDeleteMutation.mutateAsync(bookingID);
    toast.promise(mutation, {
      loading: "Deleting Booking...",
      success: () => "Booking has been deleted successfully",
      error: "Unable to delete the Booking",
    });
    if (redirect) router.push("/bookings");
    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>Cancel Session</Button>
      <ModalOverlay isOpen={isOpen} onOpenChange={setOpen} isDismissable>
        <DialogTrigger>
          <Modal>
            <Dialog className="px-6 py-8">
              <>
                <Heading slot="title" className="text-lg font-medium">
                  Delete Booking
                </Heading>
                <p className="text-sm text-base-400 py-2">This will permanently delete the selected file. Continue?</p>
                <div className="pt-2 flex w-full justify-end space-x-2">
                  <Button onPress={() => setOpen(false)} variant="outline">Cancel</Button>
                  <Button onPress={() => onDelete(bookingID)} variant="destructive">Delete</Button>
                </div>
              </>
            </Dialog>
          </Modal>
        </DialogTrigger>
      </ModalOverlay>
    </>
  )
}
