// src/components/common/LoadingAnimation.jsx
import React from "react";
import Lottie from "lottie-react";
import { Box, Typography } from "@mui/material";

import farmLoading from "../../assets/farmLoading.json";

export default function LoadingAnimation({ message = "Loading..." }) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Box sx={{ width: 200, height: 200 }}>
        <Lottie animationData={farmLoading} loop={true} autoplay={true} />
      </Box>
      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
}
