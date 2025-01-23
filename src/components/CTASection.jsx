import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CTASection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: "primary.main",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {t("ctasection.title")}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
          {t("ctasection.subtitle")}
        </Typography>
        <Button
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            bgcolor: "black",
          }}
          onClick={() => navigate("/signup")}
        >
          {t("ctasection.cta")}
        </Button>
      </Container>
    </Box>
  );
}
