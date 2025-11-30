"use client";
import { useUsersQuery } from "@/hooks/useUsersQuery";
import { DataTable } from "@/components/ui/data-table";
import { UserFilters } from "@/components/features/UserFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";
import { columns } from "./columns";
export function UsersTable() {
  const { data: users, isLoading, totalPages } = useUsersQuery();
  const { filters, setFilters } = useUserStore();
  return (
    <>
      <UserFilters />
      <DataTable users={users || []} columns={columns} isLoading={isLoading} />
      {!isLoading && totalPages > 1 && (
        <Pagination className="">
          <PaginationContent className="flex justify-between items-center w-full pt-2">
            <PaginationItem className="text-sm pl-2 text-muted-foreground">
              Showing {filters?.page} of {totalPages}
            </PaginationItem>
            <div className="flex items-center gap-2">
              <PaginationPrevious
                className={cn("border cursor-pointer", {
                  "opacity-50 cursor-not-allowed pointer-events-none":
                    filters.page === 1,
                })}
                onClick={() => setFilters({ page: filters.page - 1 })}
              />
              <PaginationNext
                className={cn("border cursor-pointer", {
                  "opacity-50 cursor-not-allowed pointer-events-none":
                    filters.page === totalPages,
                })}
                onClick={() => setFilters({ page: filters.page + 1 })}
              />
            </div>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
