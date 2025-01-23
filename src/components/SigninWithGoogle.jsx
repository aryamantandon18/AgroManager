import React from "react";
import { Button } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function SigninWithGoogle({ setShowLoading, setSnackbar }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoogleSignIn = async () => {
    setShowLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      try {
        // Check if user document exists
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // If user doesn't exist, create new document
          await setDoc(userDocRef, {
            email: user.email,
            firstName: user.displayName?.split(" ")[0] || "",
            lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
            photo: user.photoURL || "",
            createdAt: new Date().toISOString(),
          });
        }

        // Navigate to dashboard after successful sign-in
        setSnackbar({
          open: true,
          message: "Successfully signed in!",
          severity: "success",
        });

        setTimeout(() => {
          setShowLoading(false);
          navigate("/dashboard");
        }, 3000);
      } catch (firestoreError) {
        console.error("Firestore error:", firestoreError);
        setShowLoading(false);
        setSnackbar({
          open: true,
          message: "Error accessing database. Please try again.",
          severity: "error",
        });
      }
    } catch (authError) {
      console.error("Authentication error:", authError);
      setShowLoading(false);
      setSnackbar({
        open: true,
        message: "Error signing in with Google. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Button
      startIcon={<GoogleIcon sx={{ color: "#339961" }} />}
      variant="contained"
      fullWidth
      onClick={handleGoogleSignIn}
      sx={{
        bgcolor: "#000",
        color: "#FFF",
        mt: 2,
        borderRadius: "12px",
        p: 1.5,
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "none",
        "&:hover": {
          bgcolor: "#333",
        },
      }}
      aria-label="Sign in with Google"
    >
      {t("signup.google")}
    </Button>
  );
}
