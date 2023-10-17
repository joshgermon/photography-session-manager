"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { IconArrowsSort } from "@tabler/icons-react";
import { Checkbox } from "../ui/checkbox";
import { Client } from "@/db/schema";

export const columns: ColumnDef<Client>[] = [
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
        id: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <IconArrowsSort className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        accessorFn: (d) => `${d.firstName} ${d.lastName}`,
    },
    {
        accessorKey: "emailAddress",
        header: "Email",
    },
    {
        accessorKey: "mobileNo",
        header: "Mobile",
    },
];
