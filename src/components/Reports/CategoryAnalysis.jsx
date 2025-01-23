// src/components/Reports/CategoryAnalysis.jsx
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Custom colors for the pie chart
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CDEF",
  "#7FB3D5",
];

export default function CategoryAnalysis({ expenses }) {
  const categoryData = useMemo(() => {
    // Group expenses by category
    const categoryGroups = expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = {
          amount: 0,
          count: 0,
          expenses: [],
        };
      }
      acc[category].amount += expense.amount;
      acc[category].count += 1;
      acc[category].expenses.push(expense);
      return acc;
    }, {});

    // Convert to array and calculate percentages
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    return Object.entries(categoryGroups)
      .map(([name, data]) => ({
        name,
        value: data.amount,
        count: data.count,
        percentage: ((data.amount / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 1.5,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2">{data.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Amount: {formatCurrency(data.value)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Percentage: {data.percentage}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Count: {data.count} expenses
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Category-wise Analysis
        </Typography>

        {/* Pie Chart */}
        <Box sx={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Category Details Table */}
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Percentage</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryData.map((category) => (
                <TableRow key={category.name}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(category.value)}
                  </TableCell>
                  <TableCell align="right">{category.percentage}%</TableCell>
                  <TableCell align="right">{category.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
