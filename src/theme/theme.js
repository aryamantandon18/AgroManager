// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#339961",
        light: "#4CAF50",
        dark: "#2E7D32",
      },
      secondary: {
        main: darkMode ? "#fff" : "#000",
        optional: darkMode ? "#cca300" : "#000",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5", // Added proper background color
        paper: darkMode ? "#1E1E1E" : "#fff",
      },
      text: {
        primary: darkMode ? "#fff" : "#000",
        secondary: darkMode ? "#B0B0B0" : "#666666",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: darkMode ? "#121212" : "#f5f5f5",
            minHeight: "100vh",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: darkMode
                  ? "rgba(255, 255, 255, 0.23)"
                  : "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor: darkMode
                  ? "rgba(255, 255, 255, 0.5)"
                  : "rgba(0, 0, 0, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#339961",
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: darkMode
              ? "0px 2px 4px rgba(0, 0, 0, 0.5)"
              : "0px 2px 4px rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            backgroundColor: darkMode ? "#1E1E1E" : "#fff",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1E1E1E" : "#fff",
          },
        },
      },
    },
  });
