// src/components/DashboardLayout.jsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar open={open} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? 240 : 73}px)` },
          marginTop: "64px",
          transition: "width 0.3s ease-in-out",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
