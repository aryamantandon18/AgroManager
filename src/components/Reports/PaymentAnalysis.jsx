// src/components/Reports/PaymentAnalysis.jsx
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Colors for different payment statuses
const STATUS_COLORS = {
  Paid: "#2e7d32", // success.main
  Pending: "#DC143C", // warning.main
};

// Colors for different payment modes
const MODE_COLORS = {
  Cash: "#1976d2",
  UPI: "#9c27b0",
  "Bank Transfer": "#2e7d32",
  Credit: "#d32f2f",
};

export default function PaymentAnalysis({ expenses }) {
  const analysisData = useMemo(() => {
    // Initialize data structures
    const statusData = {};
    const modeData = {};
    const monthlyStatus = {};

    // Process expenses
    expenses.forEach((expense) => {
      const { paymentStatus, paymentMode, amount, date } = expense;
      const monthYear = date
        .toDate()
        .toLocaleString("default", { month: "short", year: "2-digit" });

      // Status analysis
      if (!statusData[paymentStatus]) {
        statusData[paymentStatus] = { amount: 0, count: 0 };
      }
      statusData[paymentStatus].amount += amount;
      statusData[paymentStatus].count += 1;

      // Payment mode analysis
      if (!modeData[paymentMode]) {
        modeData[paymentMode] = { amount: 0, count: 0 };
      }
      modeData[paymentMode].amount += amount;
      modeData[paymentMode].count += 1;

      // Monthly status tracking
      if (!monthlyStatus[monthYear]) {
        monthlyStatus[monthYear] = { month: monthYear, Paid: 0, Pending: 0 };
      }
      monthlyStatus[monthYear][paymentStatus] += amount;
    });

    // Calculate total amount
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Convert to arrays and calculate percentages
    const statusChartData = Object.entries(statusData).map(
      ([status, data]) => ({
        name: status,
        value: data.amount,
        count: data.count,
        percentage: ((data.amount / totalAmount) * 100).toFixed(1),
      })
    );

    const modeChartData = Object.entries(modeData).map(([mode, data]) => ({
      name: mode,
      value: data.amount,
      count: data.count,
      percentage: ((data.amount / totalAmount) * 100).toFixed(1),
    }));

    const monthlyTrendData = Object.values(monthlyStatus).sort(
      (a, b) => new Date(a.month) - new Date(b.month)
    );

    return {
      statusChartData,
      modeChartData,
      monthlyTrendData,
      totalAmount,
    };
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
            Count: {data.count} transactions
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
          Payment Analysis
        </Typography>

        <Grid container spacing={3}>
          {/* Payment Status Chart */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Payment Status Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={analysisData.statusChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                  >
                    {analysisData.statusChartData.map((entry) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Payment Mode Chart */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Payment Mode Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={analysisData.modeChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                  >
                    {analysisData.modeChartData.map((entry) => (
                      <Cell key={entry.name} fill={MODE_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Monthly Payment Status Trend */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Monthly Payment Status Trend
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={analysisData.monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        notation: "compact",
                        maximumFractionDigits: 1,
                      }).format(value)
                    }
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="Paid"
                    name="Paid"
                    fill={STATUS_COLORS.Paid}
                    stackId="a"
                  />
                  <Bar
                    dataKey="Pending"
                    name="Pending"
                    fill={STATUS_COLORS.Pending}
                    stackId="a"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Grid>

          {/* Summary Table */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Payment Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Percentage</TableCell>
                    <TableCell align="right">Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    ...analysisData.statusChartData,
                    ...analysisData.modeChartData,
                  ].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(row.value)}
                      </TableCell>
                      <TableCell align="right">{row.percentage}%</TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
