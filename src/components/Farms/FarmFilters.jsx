// src/components/Farms/FarmFilters.jsx
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
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { crops } from "../../constants/crops";

const seasons = ["Kharif", "Rabi", "Zaid"];

export default function FarmFilters({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        name="search"
        label="Search farms"
        size="small"
        value={filters.search || ""}
        onChange={handleChange}
        sx={{ minWidth: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Crop Category</InputLabel>
        <Select
          name="cropCategory"
          value={filters.cropCategory || ""}
          onChange={handleChange}
          label="Crop Category"
        >
          <MenuItem value="">All Categories</MenuItem>
          {Object.keys(crops).map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Season</InputLabel>
        <Select
          name="season"
          value={filters.season || ""}
          onChange={handleChange}
          label="Season"
        >
          <MenuItem value="">All Seasons</MenuItem>
          {seasons.map((season) => (
            <MenuItem key={season} value={season}>
              {season}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Tooltip title="Clear filters">
        <IconButton onClick={onClearFilters} size="small">
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
