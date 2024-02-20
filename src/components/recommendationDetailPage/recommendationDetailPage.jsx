// RecommendationDetailPage component
import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";

const RecommendationDetailPage = () => {
  const { state } = useLocation();
  const { recommendation } = state;

  // Function to truncate text if needed
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto",
        width: "100%",
        paddingBottom: "60px",
      }}
    >
      <Header />
      <Container maxWidth="sm" style={{ marginTop: "75px" }}>
        <Box sx={{ minWidth: 200 }}>
        <Box sx={{ p: 2 }}>
      <Card sx={{ mb: 2 }}>
        <CardMedia
          component="img"
          height="194"
          image={recommendation.thumbnail}
          alt={recommendation.title}
        />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            {truncateText(recommendation.title, 20)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${recommendation.extracted_price.toFixed(2)}
          </Typography>
        </Box>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<CardMedia
              component="img"
              sx={{ width: 24, height: 24 }}
              image="https://firebasestorage.googleapis.com/v0/b/giftguru-f7599.appspot.com/o/7115371_logo_new_shopping_google_icon.png?alt=media&token=4e7b3b4b-e5de-47c0-8221-5eca19811eab"
              alt="Google"
            />}
            onClick={() => window.location.href = recommendation.product_link}
          >
            Buy at Google
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            startIcon={recommendation.source_logo ? (
              <CardMedia
                component="img"
                sx={{ width: 24, height: 24 }}
                image={recommendation.source_logo}
                alt={recommendation.source}
              />
            ) : null}
            onClick={() => window.location.href = recommendation.link}
          >
            Buy at {recommendation.source}
          </Button>
        </Grid>
      </Grid>
    </Box>
        </Box>
      </Container>
      <BottomNavbar sx={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default RecommendationDetailPage;
