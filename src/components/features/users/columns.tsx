"use client";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { calendarFilterFn, statusFilterFn } from "./user-data-table-filters";
import { useUserStore } from "@/store/useUserStore";
export const columns: ColumnDef<User>[] = [
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
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: false,
    enableHiding: true,
    meta: {
      filterVariant: "select",
      options: [
        { label: "All", value: "All" },
        { label: "Admin", value: "Admin" },
        { label: "User", value: "User" },
      ],
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    filterFn: statusFilterFn,
    meta: {
      filterVariant: "select",
      options: [
        { label: "All status", value: "All" },
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  },
  {
    accessorKey: "avatarUrl",
    header: "Avatar",
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt as string);
      return format(date, "MMM d, yyyy hh:mm:ss a");
    },
    enableSorting: true,
    enableHiding: true,
    filterFn: calendarFilterFn,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("createdAt")).getTime();
      const dateB = new Date(rowB.getValue("createdAt")).getTime();
      return dateA - dateB;
    },
    meta: {
      filterVariant: "date",
      minYear: 2020,
      maxYear: 2025,
      defaultValue: new Date(),
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => {
      const date = new Date(row.original.lastLogin as string);
      return format(date, "MMM d, yyyy hh:mm:ss a");
    },
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: true,
    filterFn: calendarFilterFn,
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("lastLogin")).getTime();
      const dateB = new Date(rowB.getValue("lastLogin")).getTime();
      return dateA - dateB;
    },
    meta: {
      filterVariant: "range",
      minRange: 0,
      maxRange: 100,
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const { deleteUser } = useUserStore();

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="w-full" asChild>
                <Link href={`/users/${row.original.id}`}>Edit</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this user?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={() => deleteUser(row.original.id)}>
                        Confirm
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
    header: "Actions",
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
  },
];
