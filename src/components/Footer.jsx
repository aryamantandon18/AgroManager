import React from "react";
import { Box, Typography, Grid, Link, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Box sx={{ py: 6, backgroundColor: "#333", color: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {t("footer.aboutUs")}
            </Typography>
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              {t("footer.aboutUsDesc")}
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {t("footer.quickLinks")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#" color="inherit" underline="none">
                {t("footer.features")}
              </Link>
              <Link href="#" color="inherit" underline="none">
                {t("footer.pricing")}
              </Link>
              <Link href="#" color="inherit" underline="none">
                {t("footer.contact")}
              </Link>
              <Link href="#" color="inherit" underline="none">
                {t("footer.faq")}
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {t("footer.getInTouch")}
            </Typography>
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              {t("footer.email")}: support@farmerfolio.in
            </Typography>
            <Typography variant="body2" sx={{ color: "#bbb" }}>
              {t("footer.phone")}: +91 9010 320 330
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Footer */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="body2" sx={{ color: "#bbb" }}>
            © {new Date().getFullYear()} FarmerFolio. {t("footer.rights")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
