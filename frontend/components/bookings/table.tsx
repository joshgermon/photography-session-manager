"use client";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import { Booking } from "@/lib/api/bookings";

const columnHelper = createColumnHelper<Booking>();

const columns = [
  columnHelper.accessor("customer", {
    header: () => <span>Customer</span>,
    cell: (row) => `${row.getValue().firstName} ${row.getValue().lastName}`,
  }),
  columnHelper.accessor("package.name", {
    header: () => <span>Package</span>,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("package.durationInMinutes", {
    header: () => <span>Duration</span>,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("location", {
    header: () => <span>Location</span>,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("date", {
    header: () => <span>Date</span>,
    cell: (row) => format(new Date(row.getValue()), "EE, do MMM 'at' h:mma"),
  }),
  columnHelper.accessor("id", {
    header: () => <span></span>,
    cell: (row) => <a href={`bookings/${row.getValue()}`}>Manage</a>,
  }),
];

export type BookingTableProps = {
  data: Booking[];
};

export function BookingTable({ data }: BookingTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
