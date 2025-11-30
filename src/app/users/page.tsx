"use client";

import { UsersTable } from "@/components/features/users/UsersTable";

export default function UsersPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
      </div>

      <UsersTable />
    </div>
  );
}
