"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

export default function AnalysisTab({ chartData }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Correct vs Incorrect by Subject</CardTitle>
          <CardDescription>Visual breakdown of your answers</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="correct" fill="#22c55e" />
              <Bar dataKey="incorrect" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold">Strong Areas</p>
            <p className="text-sm">
              You performed well in Reasoning and English.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="font-semibold">Areas for Improvement</p>
            <p className="text-sm">Focus more on GK and Hindi subjects.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
