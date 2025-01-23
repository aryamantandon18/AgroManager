// src/components/Expenses/ExpenseFilterBar.jsx
import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { expenseCategories, paymentStatuses } from "../../constants/expenses";

export default function ExpenseFilterBar({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const handleChange = (name, value) => {
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            label="From Date"
            value={filters.fromDate || ""}
            onChange={(e) => handleChange("fromDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            label="To Date"
            value={filters.toDate || ""}
            onChange={(e) => handleChange("toDate", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category || ""}
              onChange={(e) => handleChange("category", e.target.value)}
              label="Category"
            >
              <MenuItem value="">All Categories</MenuItem>
              {Object.keys(expenseCategories).map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Payment Status</InputLabel>
            <Select
              value={filters.paymentStatus || ""}
              onChange={(e) => handleChange("paymentStatus", e.target.value)}
              label="Payment Status"
            >
              <MenuItem value="">All Statuses</MenuItem>
              {paymentStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={1}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sortBy || "date"}
              onChange={(e) => handleChange("sortBy", e.target.value)}
              label="Sort By"
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="amount">Amount</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={1}>
          <Tooltip title="Clear Filters">
            <IconButton onClick={onClearFilters}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
