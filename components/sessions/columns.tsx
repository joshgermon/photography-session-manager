"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DeleteButton } from "./delete-button";

export type Booking = {
    id: number;
    date: string;
    location: string | null;
    createdAt: string;
    package: Package;
    customer: Customer;
};

type Package = {
    id: string;
    name: string;
    durationInMinutes: string;
    price: string;
    typeId: number;
    type: string;
    typeDescripting: string;
};

type Customer = {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    mobileNo?: string;
};

export const columns: ColumnDef<Booking>[] = [
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
        accessorKey: "customer.firstName",
        header: "Client Name",
    },
    {
        accessorKey: "package.type",
        header: "Session Type",
    },
    {
        accessorKey: "package.name",
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
