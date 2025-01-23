// src/components/Expenses/ExpenseAnalysis.jsx
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseAnalysis({ expenses }) {
  const [view, setView] = React.useState("monthly");

  const data = useMemo(() => {
    const monthlyData = {};
    const categoryData = {};

    expenses.forEach((expense) => {
      const date = expense.date.toDate();
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

      // Monthly totals
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      monthlyData[monthYear] += expense.amount;

      // Category totals
      if (!categoryData[expense.category]) {
        categoryData[expense.category] = 0;
      }
      categoryData[expense.category] += expense.amount;
    });

    return {
      monthly: Object.entries(monthlyData).map(([month, amount]) => ({
        name: month,
        amount,
      })),
      category: Object.entries(categoryData).map(([category, amount]) => ({
        name: category,
        amount,
      })),
    };
  }, [expenses]);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Expense Analysis
        </Typography>

        <Tabs
          value={view}
          onChange={(e, newValue) => setView(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab label="Monthly Trend" value="monthly" />
          <Tab label="Category Distribution" value="category" />
        </Tabs>

        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data[view]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(value)
                }
              />
              <Bar dataKey="amount" fill="#339961" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
