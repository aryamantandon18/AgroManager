import React from "react";
import { Box, Typography, Grid, Avatar, Container } from "@mui/material";
import TestFarm1 from "../assets/TestFarm1.jpg";
import TestFarm2 from "../assets/TestFarm2.jpg";
import TestFarm3 from "../assets/TestFarm3.jpg";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    name: "Naman Jain",
    image: TestFarm1, // Replace with your image paths
    quote: "AgroManager has transformed the way I manage my farm expenses.",
  },
  {
    name: "Arjun Reddy",
    image: TestFarm2,
    quote: "The analytics feature helped me identify areas to cut costs.",
  },
  {
    name: "Sarthak Tyagi",
    image: TestFarm3,
    quote: "I love how easy it is to track my inventory and plan crops.",
  },
];

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: `${t("testimonials.name1")}`,
      image: TestFarm1,
      quote: `${t("testimonials.review1")}`,
    },
    {
      name: `${t("testimonials.name2")}`,
      image: TestFarm2,
      quote: `${t("testimonials.review2")}`,
    },
    {
      name: `${t("testimonials.name3")}`,
      image: TestFarm3,
      quote: `${t("testimonials.review3")}`,
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" sx={{ fontWeight: 600, mb: 6 }}>
          {t("testimonials.heading")}
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box sx={{ textAlign: "center", px: 2 }}>
                <Avatar
                  // src={require(`../assets/${testimonial.image}`).default}
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{ width: 80, height: 80, margin: "0 auto" }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {testimonial.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary", fontStyle: "italic" }}
                >
                  "{testimonial.quote}"
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
