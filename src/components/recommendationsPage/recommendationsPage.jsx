import React, { useState } from "react";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import data from "../../../assets/itemsTest.json";

const RecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [likedItems, setLikedItems] = useState({});

  const handleBack = () => {
    navigate("/home", {
      state: {
        ...location.state,
      },
    });
  };

  const recommendations = data.recommendations;
  const [visibleRange, setVisibleRange] = useState([0, 10]);
  const handleShowMore = () => {
    setVisibleRange([visibleRange[0] + 10, visibleRange[1] + 10]);
  };
  const visibleRecommendations = recommendations.slice(
    visibleRange[0],
    visibleRange[1]
  );

  const toggleLike = (itemName) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [itemName]: !prevLikedItems[itemName],
    }));
  };

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
        <Grid container spacing={2}>
          {visibleRecommendations.length > 0 ? (
            visibleRecommendations.map((recommendation, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    position: "relative",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <IconButton
                    onClick={() => toggleLike(recommendation.itemName)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: likedItems[recommendation.itemName]
                        ? "red"
                        : "default",
                    }}
                  >
                    {likedItems[recommendation.itemName] ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <CardMedia
                    component="img"
                    image={recommendation.itemImage}
                    alt={recommendation.itemName}
                    sx={{
                      height: 140,
                      objectFit: "contain",
                    }}
                  />
                  <CardContent>
                    <Typography noWrap variant="subtitle1">
                      {truncateText(recommendation.itemName, 20)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${recommendation.itemPrice.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No recommendations available.</Typography>
          )}
        </Grid>
        <Box sx={{ my: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={handleShowMore}
                sx={{
                  borderRadius: 50,
                  width: "100%",
                  mt: 2,
                  background: "linear-gradient(45deg, #00b859, #007580)",
                  "&:hover": {
                    transform: "scale(1.02)",
                    filter: "brightness(1.1)",
                  },
                }}
              >
                Another 10 items
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={handleBack}
                sx={{
                  borderRadius: 50,
                  width: "100%",
                  mt: 2,
                  background: "linear-gradient(45deg, #00b859, #007580)",
                  "&:hover": {
                    transform: "scale(1.02)",
                    filter: "brightness(1.1)",
                  },
                }}
              >
                Edit preference
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <BottomNavbar sx={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default RecommendationsPage;
