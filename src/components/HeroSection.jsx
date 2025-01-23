// HeroSection.jsx
import React from "react";
import { Box, Typography, Button, Container, keyframes } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
// import heroImage from "../assets/cover1.png"; // Replace with your image path
import heroImage from "../assets/cover3.jpeg";

import { useTranslation } from "react-i18next";

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components with animations
const AnimatedTypography = styled(Typography)(({ delay = "0s" }) => ({
  animation: `${fadeInUp} 1s ease-out forwards`,
  opacity: 0,
  animationDelay: delay,
}));

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "70vh", md: "100vh" },
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay for better text visibility
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Main Heading */}
        <AnimatedTypography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "3.5rem" },
            lineHeight: 1.2,
          }}
          delay="0.2s"
        >
          {t("hero.welcome")}{" "}
          <span
            style={{
              color: "#40bf79", // Highlighted color
            }}
          >
            {t("hero.title")}
          </span>
        </AnimatedTypography>

        {/* Subheading */}
        <AnimatedTypography
          variant="h6"
          sx={{
            mt: 2,
            fontSize: { xs: "1rem", md: "1.3rem" },
            maxWidth: 600,
            color: "#e0e0e0",
            textAlign: "start",
          }}
          delay="0.4s"
        >
          {t("hero.para")}
        </AnimatedTypography>

        {/* Call-to-Action Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 6,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
            animation: `${fadeInUp} 1s ease-out forwards`,
            opacity: 0,
            animationDelay: "0.6s",
            "&:hover": {
              bgcolor: "#fff",
              color: "#000",
            },
          }}
          onClick={() => navigate("/signup")}
        >
          {t("hero.cta")}
        </Button>
      </Container>
    </Box>
  );
}
