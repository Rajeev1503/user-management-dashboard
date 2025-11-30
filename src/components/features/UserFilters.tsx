import { useUserStore } from "@/store/useUserStore";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function UserFilters() {
  const { filters, setFilters } = useUserStore();

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
      <div className="relative flex-1 md:max-w-1/4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
          className="pl-9"
        />
      </div>
      <div className="flex items-center gap-2 justify-end">
        <div className="max-w-max">
          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters({ status: value as any, page: 1 })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="max-w-max">
          <Select
            value={filters.sortBy}
            onValueChange={(value) => setFilters({ sortBy: value as any })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Sort by Date</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
