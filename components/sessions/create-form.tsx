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
import { useEffect, useState } from "react";
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
import { SessionType } from "@/db/schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type FormValues = {
  clientId: string;
  sessionTypeId: string;
  sessionPackageId: string;
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
  sessionTypeId: dataId,
  sessionPackageId: dataId,
  date: z.date(),
  location: z.string().min(3).max(80),
});

export function SessionForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: "",
      sessionTypeId: "",
      sessionPackageId: "",
      location: "",
      date: new Date(),
    },
  });
  const [open, setOpen] = useState(false);
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);
  const selectedSessionType = form.watch("sessionTypeId");

  async function getSessionTypes() {
    const sessionType = await fetch("/api/sessions/types");
    if (sessionType.ok) {
      const sessionTypeData = await sessionType.json();
      setSessionTypes(sessionTypeData);
    }
  }

  async function createSession(data: any) {
    const createSession = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (createSession.ok) {
      setOpen(false);
    }
  }

  useEffect(() => {
    getSessionTypes();
  }, []);

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
                name="sessionTypeId"
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
                          {sessionTypes.map((sessionType) => (
                            <SelectItem
                              key={sessionType.id}
                              value={String(sessionType.id)}
                            >
                              {sessionType.name}
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
                name="sessionPackageId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        disabled={!selectedSessionType}
                      >
                        <SelectTrigger id="package" className="w-full">
                          <SelectValue placeholder="Select your package" />
                        </SelectTrigger>
                        {selectedSessionType && (
                          <SelectContent>
                            {sessionTypes
                              .find((type) => type.id == selectedSessionType)
                              .packages.map((sessionPackage) => (
                                <SelectItem
                                  key={sessionPackage.id}
                                  value={String(sessionPackage.id)}
                                >
                                  {sessionPackage.name}
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
