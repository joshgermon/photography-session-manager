"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSelect } from "./client-select";
import { DatePicker } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type FormValues = {
  clientId: string;
  offeringTypeId: string;
  offeringPackageId: string;
  date: Date;
  location: string;
};

const dataId = z.preprocess(
  (val) => Number(val),
  z.number().min(1, {
    message: "Please select an option",
  }),
);

const formSchema = z.object({
  clientId: dataId,
  offeringTypeId: dataId,
  offeringPackageId: dataId,
  date: z.date(),
  location: z.string().min(3).max(80),
});

async function getOfferings() {
  const offerings = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/offerings`,
  );
  if (offerings.ok) {
    const offeringData = await offerings.json();
    return offeringData;
  }
}

export function SessionForm() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "",
      offeringTypeId: "",
      offeringPackageId: "",
      location: "",
      date: new Date(),
    },
  });

  const query = useQuery({ queryKey: ["offerings"], queryFn: getOfferings });
  if (query.isLoading) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;

  const offerings = query.data.data;
  const selectedOfferingType = form.watch("offeringTypeId");

  async function createSession(data: any) {
    console.log(data);
    const booking = {
      customerId: data.clientId,
      date: data.date,
      location: data.location,
      sessionPackageId: data.offeringPackageId,
    };
    const createSession = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/bookings`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      },
    );
    if (createSession.ok) {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[485px]">
        <DialogHeader>
          <DialogTitle>Create new Session</DialogTitle>
          <DialogDescription>
            Create a new session. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createSession)}
            id="customer-form"
            className="flex flex-col gap-4 py-4"
          >
            <div className="flex flex-col gap-2">
              <FormField
                name="clientId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="client-name">Client</FormLabel>
                    <FormControl>
                      <ClientSelect
                        onSelect={(id: number) => field.onChange(id)}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-normal" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                name="offeringTypeId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger id="type" className="w-full">
                          <SelectValue placeholder="Select your type" />
                        </SelectTrigger>
                        <SelectContent>
                          {offerings.map((offerings) => (
                            <SelectItem
                              key={offerings.id}
                              value={String(offerings.id)}
                            >
                              {offerings.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                name="offeringPackageId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        disabled={!selectedOfferingType}
                      >
                        <SelectTrigger id="package" className="w-full">
                          <SelectValue placeholder="Select your package" />
                        </SelectTrigger>
                        {selectedOfferingType && offerings && (
                          <SelectContent>
                            {offerings
                              .find(
                                (type) =>
                                  type.id === Number(selectedOfferingType),
                              )
                              ?.packages.map((sessionPackage: any) => (
                                <SelectItem
                                  key={sessionPackage.id}
                                  value={String(sessionPackage.id)}
                                >
                                  {sessionPackage.Name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        )}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                name="date"
                control={form.control}
                defaultValue={new Date()}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="date">Session Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        onSelect={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                name="location"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Rouse Hill Regional Park"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="customer-form">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
