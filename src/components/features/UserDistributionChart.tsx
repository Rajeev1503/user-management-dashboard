"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ANALYTICS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const COLORS = ["#22c55e", "#94a3b8"]; // Green for Active, Slate for Inactive

function CustomTooltip({ payload, label, active }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border bg-background border-border p-3 shadow-lg flex items-center gap-2">
        <p className={"text-sm font-semibold text-primary"}>
          {payload[0].name}:
        </p>
        <p className="text-sm text-white">{`${payload[0].value} Users`}</p>
      </div>
    );
  }
  return null;
}

export function UserDistributionChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Active vs Inactive Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={MOCK_ANALYTICS.userDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="count"
                nameKey="status" // Use 'status' key for legend labels
              >
                {MOCK_ANALYTICS.userDistribution.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} defaultIndex={0} />
              <Legend formatter={(value) => `${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
