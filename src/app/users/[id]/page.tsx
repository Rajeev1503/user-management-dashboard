"use client";

import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Mail, Calendar, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { EditUserModal } from "@/components/features/EditUserModal";
import { MOCK_USERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { users, setUsers } = useUserStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fallback to mock data if store is empty (e.g. direct navigation)
  useEffect(() => {
    if (users.length === 0) {
      setUsers(MOCK_USERS);
    }
  }, [users.length, setUsers]);

  const user = users.find((u) => u.id === params.id);

  if (!user) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold">User not found</h1>
        <Button variant="link" onClick={() => router.push("/users")}>
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Button
        variant="ghost"
        className="mb-6 pl-0 hover:pl-2 transition-all"
        onClick={() => router.push("/users")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Users
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-muted overflow-hidden">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardTitle>{user.name}</CardTitle>
            <div className="mt-2 flex justify-center">
              <Badge
                className={cn(user.status === "Active" ? "bg-green-500" : "bg-gray-500")}
              >
                {user.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              {user.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <Button className="w-full" onClick={() => setIsEditModalOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Activity & Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">
                        User performed action #{5 - i}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          Date.now() - i * 86400000,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditUserModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
