// src/components/Expenses/ExpenseSummary.jsx
import React, { useMemo } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import {
  PaidOutlined,
  PendingOutlined,
  CategoryOutlined,
} from "@mui/icons-material";

export default function ExpenseSummary({ expenses }) {
  const summary = useMemo(() => {
    return expenses.reduce(
      (acc, expense) => {
        // Total expenses
        acc.total += expense.amount;

        // Payment status wise
        if (expense.paymentStatus === "Paid") {
          acc.paid += expense.amount;
        } else {
          acc.pending += expense.amount;
        }

        // Category wise
        if (!acc.categoryWise[expense.category]) {
          acc.categoryWise[expense.category] = 0;
        }
        acc.categoryWise[expense.category] += expense.amount;

        return acc;
      },
      {
        total: 0,
        paid: 0,
        pending: 0,
        categoryWise: {},
      }
    );
  }, [expenses]);

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={3}>
        {/* Total Expenses */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CategoryOutlined color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Total Expenses
                </Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {formatAmount(summary.total)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Paid Amount */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PaidOutlined color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Paid Amount
                </Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {formatAmount(summary.paid)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Amount */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PendingOutlined color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Pending Amount
                </Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {formatAmount(summary.pending)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Category wise summary */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category-wise Expenses
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                {Object.entries(summary.categoryWise).map(
                  ([category, amount]) => (
                    <Grid item xs={12} sm={6} md={3} key={category}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {category}
                        </Typography>
                        <Typography variant="h6">
                          {formatAmount(amount)}
                        </Typography>
                      </Box>
                    </Grid>
                  )
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
