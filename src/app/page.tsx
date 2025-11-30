import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, BarChart } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Welcome to AdminDash
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Manage users and view analytics in a modern dashboard.
      </p>

      <div className="flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/users">
            <Users className="mr-2 h-5 w-5" />
            Manage Users
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/analytics">
            <BarChart className="mr-2 h-5 w-5" />
            View Analytics
          </Link>
        </Button>
      </div>
    </div>
  );
}
