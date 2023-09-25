"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DeleteIcon } from "lucide-react";
import { DeleteButton } from "./delete-button";

export type Session = {
  id: number;
  date: string;
  clientName: string;
  sessionType?: string;
  packageName?: string;
  location: string | null;
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
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => <DeleteButton id={row.original.id} />,
  },
];
