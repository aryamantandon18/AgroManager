// Header.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme as useColorTheme } from "../context/ThemeContext";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";

import LanguageSwitcher from "./common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Header() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useColorTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const { t } = useTranslation();

  return (
    <AppBar position="absolute" color="transparent" elevation={0}
      sx={{
        top: 0,
        mt: { xs: 2, sm: 5 }, // Adjusted margin for mobile
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: "48px", sm: "64px" }, // Adjusted height for mobile
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              cursor: "pointer",
              color: "primary.main",
              fontWeight: "bold",
              fontSize: { xs: "24px", sm: "32px" }, // Responsive font size
            }}
            onClick={() => navigate("/")}
          >
            {t("common.agromanager")}
          </Typography>

          {/* Desktop View */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <LanguageSwitcher />
              <Tooltip
                title={
                  darkMode
                    ? `${t("common.lightMode")}`
                    : `${t("common.darkMode")}`
                }
              >
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: darkMode ? "white" : "black",
                  }}
                >
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>
              <Button
                variant="text"
                sx={{
                  color: "#000",
                  textTransform: "none",
                  bgcolor: "white",
                  borderRadius: "8px",
                  "&:hover": {
                    bgcolor: "#000",
                    color: "#fff",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                {t("common.login")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", borderRadius: "8px" }}
                onClick={() => navigate("/signup")}
              >
                {t("common.signup")}
              </Button>
            </Box>
          )}

          {/* Mobile View */}
          {isMobile && (
            <Box>
              <IconButton
                size="large"
                onClick={handleMenuOpen}
                sx={{ color: darkMode ? "white" : "black" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    bgcolor: darkMode ? "background.paper" : "white",
                  },
                }}
              >
                <MenuItem>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      mb: 1,
                    }}
                  >
                    <Tooltip
                      title={
                        darkMode
                          ? `${t("common.lightMode")}`
                          : `${t("common.darkMode")}`
                      }
                    >
                      <IconButton
                        onClick={toggleTheme}
                        sx={{
                          color: darkMode ? "white" : "black",
                        }}
                      >
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigate("/login")}
                  sx={{
                    justifyContent: "center",
                    color: darkMode ? "white" : "black",
                  }}
                >
                  {t("common.login")}
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigate("/signup")}
                  sx={{
                    justifyContent: "center",
                    color: darkMode ? "white" : "black",
                  }}
                >
                  {t("common.signup")}
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
