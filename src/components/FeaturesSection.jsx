// FeaturesSection.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  MonetizationOn,
  Assessment,
  Inventory,
  DateRange,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const features = [
  {
    title: "Expense Tracking",
    description: "Easily log and categorize all your farm expenses.",
    icon: <MonetizationOn sx={{ fontSize: 40 }} />,
  },
  {
    title: "Analytics & Reports",
    description: "Visualize your spending patterns with comprehensive charts.",
    icon: <Assessment sx={{ fontSize: 40 }} />,
  },
  {
    title: "Inventory Management",
    description: "Keep track of your farm equipment and supplies.",
    icon: <Inventory sx={{ fontSize: 40 }} />,
  },
  {
    title: "Crop Planning",
    description: "Plan your crop cycles and monitor progress.",
    icon: <DateRange sx={{ fontSize: 40 }} />,
  },
];

// Styled Card component with hover effects
const StyledCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[4],
  },
}));

// Styled Icon Wrapper
const IconWrapper = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.light,
  // color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  transition: "background-color 0.3s ease, color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

export default function FeaturesSection() {
  const { t } = useTranslation();
  const features = [
    {
      title: `${t("features.title1")}`,
      description: `${t("features.description1")}`,
      icon: <MonetizationOn sx={{ fontSize: 40 }} />,
    },
    {
      title: `${t("features.title2")}`,
      description: `${t("features.description2")}`,
      icon: <Assessment sx={{ fontSize: 40 }} />,
    },
    {
      title: `${t("features.title3")}`,
      description: `${t("features.description3")}`,
      icon: <Inventory sx={{ fontSize: 40 }} />,
    },
    {
      title: `${t("features.title4")}`,
      description: `${t("features.description4")}`,
      icon: <DateRange sx={{ fontSize: 40 }} />,
    },
  ];
  return (
    <Box sx={{ py: 8, backgroundColor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ fontWeight: 600, mb: 6 }}>
          {t("features.heading")}
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={3} key={index}>
              <StyledCard elevation={0}>
                <CardContent>
                  <IconWrapper>{feature.icon}</IconWrapper>
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: "text.secondary" }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
