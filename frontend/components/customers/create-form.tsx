import {
  Dialog,
  DialogTrigger,
  FieldError,
  Heading,
  TextField,
} from "react-aria-components";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Modal, ModalOverlay } from "../ui/modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Customer } from "@/app/(dashboard)/customers/page";
import { useState } from "react";
import { toast } from "sonner";

type CustomerFormInput = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
};

type NewCustomer = {
  userID: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
};

async function createCustomer(newCustomer: CustomerFormInput) {
  (newCustomer as NewCustomer).userID = 1; // TODO
  const createResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/customers`,
    {
      method: "POST",
      body: JSON.stringify(newCustomer),
    },
  );
  if (!createResponse.ok) {
    throw Error("Failed");
  }
}

export function CustomerCreateForm() {
  const { register, handleSubmit } = useForm<CustomerFormInput>();
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = useState(false);

  const customerMutation = useMutation({
    mutationFn: createCustomer,
    onMutate: async (newCustomer) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["customers"] });

      // Snapshot the previous value
      const previousCustomers = queryClient.getQueryData(["customers"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["customers"], (old: Customer[]) => [
        ...old,
        newCustomer,
      ]);

      // Return a context object with the snapshotted value
      return { previousCustomers: previousCustomers };
    },

    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newCustomer, context) => {
      queryClient.setQueryData(["customers"], context?.previousCustomers);
      console.error("Failed to create customer.", err);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      console.log("Mutation completed, invalidated query.");
    },
  });

  const onSubmit = (data: CustomerFormInput) => {
    const mutation = customerMutation.mutateAsync(data);

    toast.promise(mutation, {
      loading: "Adding new Customer...",
      success: () => {
        return `Customer has been added successfully`;
      },
      error: "Unable to create the new Customer",
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
              Create Customer
            </Heading>
            <p className="text-sm text-base-400 pb-4">
              Create a customer here to manage.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4 pt-2"
            >
              <TextField className="space-y-1">
                <Label>First Name</Label>
                <Input
                  placeholder="Jane"
                  minLength={2}
                  required
                  {...register("firstName")}
                />
                <FieldError className="text-xs text-red-500" />
              </TextField>
              <TextField className="space-y-1">
                <Label>Last Name</Label>
                <Input
                  placeholder="Smithson"
                  minLength={2}
                  required
                  {...register("lastName")}
                />
                <FieldError className="text-xs text-red-500" />
              </TextField>
              <TextField className="space-y-1">
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="person@example.com"
                  required
                  {...register("emailAddress")}
                />
                <FieldError className="text-xs text-red-500" />
              </TextField>
              <TextField className="space-y-1">
                <Label>Mobile Number</Label>
                <Input
                  type="tel"
                  placeholder="0412345678"
                  minLength={10}
                  {...register("mobileNumber")}
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
