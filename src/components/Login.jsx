// Login.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import farmerImage from "../assets/farmer4.webp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import MuiAlert from "@mui/material/Alert";
import SigninWithGoogle from "./SigninWithGoogle";

import LoadingAnimation from "./common/LoadingAnimation";
import { useTranslation } from "react-i18next";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State for form values and errors
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  // Snackbar state for user feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // can be "success" or "error"
  });

  const [showLoading, setShowLoading] = useState(false);

  // Function to handle input changes and reset errors
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));

    // Remove error message as user types
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Function to validate form inputs
  const validateForm = () => {
    const errors = {};

    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoading(true);

    const errors = validateForm();
    setFormErrors(errors);

    // If there are no errors, proceed to sign in
    if (Object.keys(errors).length === 0) {
      try {
        await signInWithEmailAndPassword(
          auth,
          formValues.email,
          formValues.password
        );

        setSnackbar({
          open: true,
          message: "Login successful! Redirecting...",
          severity: "success",
        });

        // Redirect after a short delay
        setTimeout(() => {
          setShowLoading(false);
          navigate("/dashboard");
        }, 3000);
      } catch (error) {
        setShowLoading(false);

        // Handle authentication errors
        setSnackbar({
          open: true,
          message: error.message || "Login failed. Please try again.",
          severity: "error",
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the form errors before submitting.",
        severity: "error",
      });
    }
  };

  // Function to close the snackbar
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Grid container>
      {/* Left Image Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: `url(${farmerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Login Form Section */}
      <Grid item xs={12} md={6}>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {/* Header */}
          <Typography
            variant="h4"
            gutterBottom
            color="primary"
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            {t("login.welcomeBack")}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ color: "text.secondary", textAlign: "center", mb: 3 }}
          >
            {t("login.subheading")}
          </Typography>

          {/* Login Form */}
          <Box
            component="form"
            width="100%"
            maxWidth={400}
            display="flex"
            flexDirection="column"
            gap={2}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              label={t("login.email")}
              name="email"
              type="email"
              fullWidth
              variant="outlined"
              value={formValues.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />
            <TextField
              label={t("login.password")}
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={formValues.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                sx: { borderRadius: 1 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 2,
                p: 1.5,
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
              }}
              aria-label="Login"
            >
              {t("login.login")}
            </Button>
            {/* Google Sign-In Button */}
            <SigninWithGoogle
              setShowLoading={setShowLoading}
              setSnackbar={setSnackbar}
            />
          </Box>

          {/* Divider and Sign-up Link */}
          <Divider sx={{ my: 4, width: "100%", maxWidth: 400 }} />
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {t("login.dontHaveAccount")}{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography
                component="span"
                color="primary.main"
                sx={{ fontWeight: 500 }}
              >
                {t("login.signUp")}
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* {showLoading && <LoadingAnimation message="Welcome to AGROMANAGER..." />} */}
    </Grid>
  );
}
