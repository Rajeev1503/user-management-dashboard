"use client";

import { SignupTrendChart } from "@/components/features/SignupTrendChart";
import { UserDistributionChart } from "@/components/features/UserDistributionChart";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Analytics Overview
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <SignupTrendChart />
        <UserDistributionChart />
      </div>
    </div>
  );
}
