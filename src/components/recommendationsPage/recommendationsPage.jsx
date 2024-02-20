import React, { useState, useEffect } from "react";
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
import {
  getDatabase,
  ref,
  set,
  push,
  remove,
  onValue,
} from "firebase/database";
import { useAuthState } from "../../../utilities/firebaseUtils";

const RecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState();
  const [likedItems, setLikedItems] = useState({});
  const [likedKeys, setLikedKeys] = useState({});

  const {
    recommendation,
    sliderValue,
    ageValue,
    relationshipValue,
    genderValue,
    moreInfo,
    images,
    apiKey,
    selectedRecipient,
  } = location.state || {};
  const recommendations = recommendation;
  const [visibleRange, setVisibleRange] = useState([0, 10]);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const handleShowMore = () => {
    setVisibleRange([0, recommendations.length]);
    setShowMoreButton(false);
  };
  const visibleRecommendations = recommendations.slice(
    visibleRange[0],
    visibleRange[1]
  );

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const recipientsRef = ref(
        db,
        "recipients/QgINw26jGIN4rm7eGGVm2T4KlEI2/Jenna"
      );
      onValue(recipientsRef, (snapshot) => {
        const data = snapshot.val() || {};
        const newLikedItems = {};
        const newLikedKeys = {};

        Object.keys(data).forEach((key) => {
          const item = data[key];
          newLikedItems[item.title] = true;
          newLikedKeys[item.title] = key;
        });

        setLikedItems(newLikedItems);
        setLikedKeys(newLikedKeys);
      });
    }
  }, [user]);

  const toggleLike = (recommendation) => {
    const db = getDatabase();
    const title = recommendation.title;

    if (likedItems[title]) {
      console.log("Dislike", title);
      const key = likedKeys[title];
      remove(ref(db, `recipients/QgINw26jGIN4rm7eGGVm2T4KlEI2/Jenna/${key}`));
      setLikedItems((prev) => ({ ...prev, [title]: false }));
      setLikedKeys((prev) => {
        const updated = { ...prev };
        delete updated[title];
        return updated;
      });
    } else {
      console.log("Like", title);
      const newRef = push(
        ref(db, "recipients/QgINw26jGIN4rm7eGGVm2T4KlEI2/Jenna")
      );
      set(newRef, recommendation);
      setLikedItems((prev) => ({ ...prev, [title]: true }));
      setLikedKeys((prev) => ({ ...prev, [title]: newRef.key }));
    }
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
                    onClick={() => toggleLike(recommendation)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: likedItems[recommendation.title]
                        ? "red"
                        : "default",
                    }}
                  >
                    {likedItems[recommendation.title] ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <CardMedia
                    component="img"
                    image={recommendation.thumbnail}
                    alt={recommendation.title}
                    sx={{
                      height: 140,
                      objectFit: "contain",
                    }}
                  />
                  <CardContent>
                    <Typography noWrap variant="subtitle1">
                      {truncateText(recommendation.title, 20)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${recommendation.extracted_price.toFixed(2)}
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
            <Grid item xs={12}>
              {showMoreButton && (
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
                  Get More Results
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
      <BottomNavbar sx={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default RecommendationsPage;
