"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Session = {
  id: string;
  date: string;
  duration: string;
  location: string;
};

export const columns: ColumnDef<Session>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "sessionType",
    header: "Session Type",
  },
  {
    accessorKey: "packageName",
    header: "Package",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "date",
    header: "Session Date",
  },
];
