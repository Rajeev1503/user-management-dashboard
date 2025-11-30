import { cn } from "@/lib/utils";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  FilterIcon,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

import { Calendar } from "./calendar";
import { Input } from "./input";
import { Button } from "./button";

interface DataTableProps<T> {
  users: T[];
  columns: ColumnDef<T, unknown>[];
  isLoading: boolean;
}

export const defaultColumnSizing = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER,
};

export function DataTable<T>({ users, columns, isLoading }: DataTableProps<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable<T>({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: defaultColumnSizing,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-16 w-full animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No users found.
      </div>
    );
  }
  return (
    <div className="rounded-md border border-border overflow-x-auto scrollbar-hide">
      <table className="w-full caption-bottom text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div className="flex gap-2 items-center p-4">
                        <div
                          className={cn(
                            "flex items-center gap-2",
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                  ? "Sort descending"
                                  : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <div className={cn("text-primary")}>
                            {{
                              asc: <ChevronUp className="h-4 w-4" />,
                              desc: <ChevronDown className="h-4 w-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={cn(
                "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                i % 2 === 0 ? "bg-muted/20" : ""
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-3 align-middle [&:has([role=checkbox])]:pr-0"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const filterIconMap = {
  range: SlidersHorizontal,
  select: ChevronDown,
  date: CalendarIcon,
  default: Search,
} as const;

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const Icon =
    (filterVariant &&
      filterIconMap[filterVariant as keyof typeof filterIconMap]) ||
    filterIconMap.default;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Icon
          className={cn(
            "h-4 w-4",
            columnFilterValue
              ? "text-primary rounded-full"
              : "text-muted-foreground"
          )}
        />
      </PopoverTrigger>
      <PopoverContent className={cn("min-w-max p-0")} align="start">
        {filterVariant === "range" ? (
          <div className="space-y-2 p-4">
            <p className="text-sm font-medium">Filter by Range</p>
            <div className="flex space-x-2">
              <DebouncedInput
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ""}
                onChange={(value) =>
                  value !== undefined &&
                  column.setFilterValue((old: [number, number]) => [
                    value,
                    old?.[1],
                  ])
                }
                min={column.columnDef.meta?.minRange}
                max={column.columnDef.meta?.maxRange}
                placeholder={`Min ${column.columnDef.meta?.minRange}`}
                className=""
              />
              <DebouncedInput
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ""}
                onChange={(value) =>
                  value !== undefined &&
                  column.setFilterValue((old: [number, number]) => [
                    old?.[0],
                    value,
                  ])
                }
                min={column.columnDef.meta?.minRange}
                max={column.columnDef.meta?.maxRange}
                placeholder={`Max ${column.columnDef.meta?.maxRange}`}
                className=""
              />
            </div>
          </div>
        ) : filterVariant === "select" ? (
          <div className="p-4">
            <Select
              onValueChange={(value) => {
                console.log(value);
                if (value.toLowerCase() === "all") {
                  column.setFilterValue(undefined);
                } else {
                  column.setFilterValue(value);
                }
              }}
              value={columnFilterValue?.toString() ?? "all"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {filterVariant === "select" ? (
                  <>
                    <SelectItem value="all">
                      {
                        column.columnDef.meta?.options?.find(
                          (option) => option.value.toLowerCase() === "all"
                        )?.label
                      }
                    </SelectItem>
                    {column.columnDef.meta?.options
                      ?.filter((option) => option.value.toLowerCase() !== "all")
                      .map((option) => (
                        <SelectItem
                          key={String(option.value)}
                          value={String(option.value)}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                  </>
                ) : null}
              </SelectContent>
            </Select>
          </div>
        ) : filterVariant === "date" ? (
          <div className="p-0 w-full flex items-center justify-center">
            <Calendar
              mode="range"
              selected={{
                from: (columnFilterValue as [Date, Date])?.[0],
                to: (columnFilterValue as [Date, Date])?.[1],
              }}
              onSelect={(value) => {
                column.setFilterValue((old: [Date, Date]) => [
                  value?.from,
                  value?.to,
                ]);
              }}
              className="w-full"
              captionLayout="dropdown"
            />
          </div>
        ) : (
          <div className="p-4">
            <DebouncedInput
              // className="w-full border shadow rounded"
              onChange={(value) => column.setFilterValue(value)}
              placeholder={`Search...`}
              type="text"
              value={(columnFilterValue ?? "") as string}
            />
          </div>
          // See faceted column filters example for datalist search suggestions
        )}
        <div className="p-2 w-full flex items-center justify-end">
          <Button
            variant="destructive"
            size={"sm"}
            className="text-xs"
            onClick={() => column.setFilterValue(undefined)}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
