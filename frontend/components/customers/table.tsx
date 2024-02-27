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

type Customer = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber?: string;
};

const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.accessor("firstName", {
    header: () => <span>First Name</span>,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => <span>Last Name</span>,
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("emailAddress", {
    header: () => <span>Email Address</span>,
    cell: (row) => <div className="">{row.getValue()}</div>,
  }),
];

export type CustomerTableProps = {
  data: Customer[];
};

export function CustomerTable({ data }: CustomerTableProps) {
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
