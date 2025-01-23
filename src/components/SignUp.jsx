// SignUp.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import farmerImage from "../assets/farmer2.webp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import MuiAlert from "@mui/material/Alert";
import SigninWithGoogle from "./SigninWithGoogle";

import LoadingAnimation from "./common/LoadingAnimation";
import { useTranslation } from "react-i18next";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showLoading, setShowLoading] = useState(false);

  // State for form data and errors
  const [formData, setFormData] = useState({
    firstName: "sam",
    lastName: "kumar",
    email: "sam@gmail.com",
    password: "password@",
    confirmPassword: "password@",
  });
  const [errors, setErrors] = useState({});

  // State for password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Snackbar state for user feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // can be "success" or "error"
  });

  // Function to handle input changes and reset errors
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Remove error message as user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Function to validate the form inputs
  const validateForm = () => {
    const errors = {};

    // First Name Validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.firstName = "Only letters are allowed";
    }

    // Last Name Validation
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = "Only letters are allowed";
    }

    // Email Validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Password Validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = "Password must contain at least one special character";
    }

    // Confirm Password Validation
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    console.log("Line 113");
    const validationErrors = validateForm();
    console.log("Line 115");
    setErrors(validationErrors);
    console.log("Line 116");

    if(Object.keys(validationErrors).length > 0){
      setSnackbar({
        open: true,
        message: "Please fix the form errors before submitting.",
        severity: "error",
      });
      return;
    }

    // If there are no errors, proceed to create account
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Line 120");
        console.log(auth + formData);
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Line 127");

        const user = auth.currentUser;

        if (user) {
          // Save user info to Firestore
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            photo: "", // Placeholder for photo URL
          });
        }

        setSnackbar({
          open: true,
          message: "Sign-up successful! Redirecting...",
          severity: "success",
        });

        // Redirect after a short delay
        setTimeout(() => {
          setShowLoading(false);
          navigate("/dashboard");
        }, 3000);
      } catch (error) {
        // Handle authentication errors
        setSnackbar({
          open: true,
          message: `Sign-up failed: ${error.message}`,
          severity: "error",
        });
      }finally{
        setShowLoading(false);
      }
    }
  };

  // Function to close the snackbar
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Grid container>
      {/* Left Side with Farmer Image */}
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

      {/* Right Side with Sign-Up Form */}
      <Grid item xs={12} md={6}>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {/* Header Section */}
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            {t("signup.heading")}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ color: "text.secondary", mb: 3, textAlign: "center" }}
          >
            {t("signup.subheading")}
          </Typography>

          {/* Sign-Up Form */}
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
            {/* First Name Field */}
            <TextField
              label={t("signup.firstName")}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />
            {/* Last Name Field */}
            <TextField
              label={t("signup.lastName")}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />
            {/* Email Field */}
            <TextField
              label={t("signup.email")}
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />
            {/* Password Field */}
            <TextField
              label={t("signup.password")}
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
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
            {/* Confirm Password Field */}
            <TextField
              label={t("signup.confirmPassword")}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                sx: { borderRadius: 1 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* Sign-Up Button */}
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
              aria-label="Sign Up"
            >
              {t("signup.signup")}
            </Button>
            {/* Google Sign-In Button */}
            <SigninWithGoogle
              setShowLoading={setShowLoading}
              setSnackbar={setSnackbar}
            />
          </Box>

          {/* Divider and Login Link */}
          <Divider sx={{ my: 4, width: "100%", maxWidth: 400 }} />
          <Typography variant="body2" align="center">
            {t("signup.haveAccount")}{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography
                component="span"
                color="primary.main"
                sx={{ fontWeight: 500 }}
              >
                {t("signup.signIn")}
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* {showLoading && <LoadingAnimation message="Welcome to AgroManager..." />} */}
    </Grid>
  );
}
