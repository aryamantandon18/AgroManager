import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ChevronLeft,
  ChevronRight,
  Dashboard,
  Agriculture,
  Receipt,
  Analytics,
  Help,
  SmartToy,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

// Changed how we define menuItems
const menuItems = [
  {
    text: "Dashboard",
    icon: Dashboard, // Remove the JSX syntax
    path: "/dashboard",
  },
  {
    text: "Farm Management",
    icon: Agriculture,
    path: "/farm-management",
  },
  {
    text: "Expense Tracking",
    icon: Receipt,
    path: "/expenses",
  },
  {
    text: "Reports & Analytics",
    icon: Analytics,
    path: "/reports",
  },
  {
    text: "FarmAI",
    icon: SmartToy,
    path: "/farm-ai",
    highlight: true,
  },
];

const StyledListItemButton = styled(ListItemButton)(({ theme, highlight }) => ({
  ...(highlight && {
    margin: theme.spacing(0, 1),
    borderRadius: theme.shape.borderRadius,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    color: theme.palette.common.white,
    "&:hover": {
      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.common.white,
    },
  }),
}));

export default function Sidebar({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 73,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 73,
          boxSizing: "border-box",
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
        }}
      >
        {open && (
          <Typography variant="h6" color="primary" noWrap>
            FARMFOLIO
          </Typography>
        )}
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <StyledListItemButton
              highlight={item.highlight ? 1 : 0}
              selected={!item.highlight && location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <item.icon /> {/* The icon component will be rendered here */}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={
                    item.highlight ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {item.text}
                        <Chip
                          label="NEW"
                          size="small"
                          sx={{
                            ml: 1,
                            height: 16,
                            fontSize: "0.625rem",
                            bgcolor: "common.white",
                            color: "primary.main",
                          }}
                        />
                      </Box>
                    ) : (
                      item.text
                    )
                  }
                />
              )}
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Help section at bottom */}
      <Box
        sx={{ position: "fixed", bottom: 0, width: open ? drawerWidth : 73 }}
      >
        <Divider />
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Help />
            </ListItemIcon>
            {open && <ListItemText primary="Need Help?" />}
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
}
