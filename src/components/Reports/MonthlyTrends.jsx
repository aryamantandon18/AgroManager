// src/components/Reports/MonthlyTrends.jsx
import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function MonthlyTrends({ expenses }) {
  const [viewType, setViewType] = React.useState("area"); // 'area' or 'line'
  const [timeFrame, setTimeFrame] = React.useState("6"); // months to show

  const monthlyData = useMemo(() => {
    // Create a map to store monthly totals
    const monthMap = new Map();

    // Get date range
    const now = new Date();
    const monthsToShow = parseInt(timeFrame);
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth() - monthsToShow + 1,
      1
    );

    // Initialize all months with zero
    for (let i = 0; i < monthsToShow; i++) {
      const date = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + i,
        1
      );
      const key = date.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
      monthMap.set(key, {
        month: key,
        total: 0,
        count: 0,
        avgPerExpense: 0,
      });
    }

    // Fill in actual data
    expenses.forEach((expense) => {
      const date = expense.date.toDate();
      if (date >= startDate) {
        const key = date.toLocaleString("default", {
          month: "short",
          year: "2-digit",
        });
        if (monthMap.has(key)) {
          const data = monthMap.get(key);
          data.total += expense.amount;
          data.count += 1;
          data.avgPerExpense = Math.round(data.total / data.count);
        }
      }
    });

    return Array.from(monthMap.values());
  }, [expenses, timeFrame]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
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
          <Typography variant="subtitle2">{label}</Typography>
          <Typography variant="body2" color="text.secondary">
            Total: {formatCurrency(payload[0].value)}
          </Typography>
          {payload[1] && (
            <Typography variant="body2" color="text.secondary">
              Avg/Expense: {formatCurrency(payload[1].value)}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Count: {payload[0].payload.count} expenses
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6">Monthly Trends</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>View Type</InputLabel>
              <Select
                value={viewType}
                label="View Type"
                onChange={(e) => setViewType(e.target.value)}
              >
                <MenuItem value="area">Area Chart</MenuItem>
                <MenuItem value="line">Line Chart</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Frame</InputLabel>
              <Select
                value={timeFrame}
                label="Time Frame"
                onChange={(e) => setTimeFrame(e.target.value)}
              >
                <MenuItem value="3">3 Months</MenuItem>
                <MenuItem value="6">6 Months</MenuItem>
                <MenuItem value="12">12 Months</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            {viewType === "area" ? (
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  fill="#8884d8"
                  yAxisId="left"
                  name="Total Expenses"
                />
                <Area
                  type="monotone"
                  dataKey="avgPerExpense"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  yAxisId="right"
                  name="Average per Expense"
                />
              </AreaChart>
            ) : (
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  yAxisId="left"
                  name="Total Expenses"
                />
                <Line
                  type="monotone"
                  dataKey="avgPerExpense"
                  stroke="#82ca9d"
                  yAxisId="right"
                  name="Average per Expense"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </Box>

        {/* Summary Statistics */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                p: 2,
                bgcolor: "primary.main",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2">
                Average Monthly Expense
              </Typography>
              <Typography variant="h6">
                {formatCurrency(
                  monthlyData.reduce((sum, month) => sum + month.total, 0) /
                    monthlyData.length
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                p: 2,
                bgcolor: "secondary.optional",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2">
                Highest Monthly Expense
              </Typography>
              <Typography variant="h6">
                {formatCurrency(
                  Math.max(...monthlyData.map((month) => month.total))
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                p: 2,
                bgcolor: "info.main",
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="subtitle2">
                Total Expenses (Period)
              </Typography>
              <Typography variant="h6">
                {formatCurrency(
                  monthlyData.reduce((sum, month) => sum + month.total, 0)
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
