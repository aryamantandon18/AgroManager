// src/components/Farms/FarmCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function FarmCard({ farm, onEdit, onDelete }) {
  if (!farm) return null;

  const handleEdit = () => {
    console.log("Farm being edited:", farm); // Debug log
    onEdit && onEdit(farm);
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" component="div">
            {farm.farmName || "Unnamed Farm"}
          </Typography>
          <Box>
            <IconButton size="small" onClick={handleEdit} sx={{ mr: 1 }}>
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete && onDelete(farm.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography color="text.secondary" gutterBottom>
          {[farm.village, farm.mandal].filter(Boolean).join(", ")}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Area: {farm.totalArea} {farm.areaUnit}
          </Typography>

          <Typography variant="body2" gutterBottom>
            Crop: {farm.cropType || "Not specified"}
          </Typography>

          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            {farm.season && (
              <Chip
                label={farm.season}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {farm.currentStage && (
              <Chip
                label={farm.currentStage}
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
