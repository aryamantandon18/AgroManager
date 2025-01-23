// src/components/Dashboard/FarmSummary.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
} from "@mui/material";
import {
  Grass as CropIcon,
  LocationOn as LocationIcon,
  Straighten as AreaIcon,
} from "@mui/icons-material";

export default function FarmSummary({ farms }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Farm Summary
        </Typography>

        {farms.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
            No farms added yet
          </Typography>
        ) : (
          <List>
            {farms.map((farm, index) => (
              <React.Fragment key={farm.id}>
                <ListItem alignItems="flex-start">
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="600">
                        {farm.farmName}
                      </Typography>
                      <Chip
                        label={farm.currentStage}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CropIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {farm.cropType}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AreaIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {farm.totalArea} {farm.areaUnit}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {farm.village}, {farm.mandal}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
                {index < farms.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
