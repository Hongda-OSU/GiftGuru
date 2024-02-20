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

const RecipientsRecommendationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState();

  const handleNavigate = (recommendation) => {
    navigate(`/recommendation-detail`, {
      state: {
        recommendation: recommendation,
        referrer: '/recipients-recommendation'
      }
    });
  };

  const [recommendations, setRecommendations] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [likedKeys, setLikedKeys] = useState({});
  const selectedRecipient = location.state.selectedRecipient;

  useEffect(() => {
    if (user && selectedRecipient) {
      const db = getDatabase();
      const recommendationsRef = ref(db, `recommendations/${user.uid}/${selectedRecipient}`);

      onValue(recommendationsRef, (snapshot) => {
        const data = snapshot.val();
        const recommendationsArray = [];
        const newLikedItems = {};
        const newLikedKeys = {};

        for (let key in data) {
          recommendationsArray.push(data[key]);
          newLikedItems[data[key].title] = true;
          newLikedKeys[data[key].title] = key;
        }

        setRecommendations(recommendationsArray);
        setLikedItems(newLikedItems);
        setLikedKeys(newLikedKeys);
      });
    }
  }, [user, selectedRecipient]);

  const toggleLike = (recommendation) => {
    const db = getDatabase();
    const title = recommendation.title;

    const likesRefPath = `recommendations/${user.uid}/${selectedRecipient}`;

    if (likedItems[title]) {
      console.log("Dislike", title);
      const key = likedKeys[title];
      remove(ref(db, `${likesRefPath}/${key}`));
      setLikedItems((prev) => ({ ...prev, [title]: false }));
      setLikedKeys((prev) => {
        const updated = { ...prev };
        delete updated[title];
        return updated;
      });
    } else {
      console.log("Like", title);
      const newRef = push(ref(db, likesRefPath));
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
        <Box sx={{ minWidth: 200 }}>
          <Grid container spacing={2}>
            {recommendations.length > 0 ? (
              recommendations.map((recommendation, index) => (
                <Grid item xs={6} key={index}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      position: "relative",
                      "&:hover": { boxShadow: 6 },
                    }}
                    onClick={() => handleNavigate(recommendation)}
                  >
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation(); 
                        toggleLike(recommendation);
                      }}
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
        </Box>
      </Container>
      <BottomNavbar sx={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default RecipientsRecommendationPage;
