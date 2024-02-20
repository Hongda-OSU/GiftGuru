import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useAuthState } from "../../../utilities/firebaseUtils";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  ImageList,
  ImageListItem,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Header from "../header/header";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import RecipientsRecommendationPage from "../../components/recipientsRecommendation/recipientsRecommendation";

const RecipientsPage = () => {
  const [user] = useAuthState();
  const [recipientsList, setRecipientsList] = useState({});
  const navigate = useNavigate();
  
  const handleNavigateToRecommendations = (recipientName) => {
    navigate('/recipients-recommendation', { state: { selectedRecipient: recipientName } });
  };

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const recipientsRef = ref(db, `recipients/${user.uid}`);

      onValue(
        recipientsRef,
        (snapshot) => {
          const recipientsData = snapshot.val() || {};
          const updatedRecipientsList = {};

          Object.keys(recipientsData).forEach((recipientKey) => {
            const recipientName = recipientsData[recipientKey];
            const recommendationsRef = ref(
              db,
              `recommendations/${user.uid}/${recipientName}`
            );

            onValue(
              recommendationsRef,
              (snapshot) => {
                const recommendationsData = snapshot.val() || {};
                const images = Object.values(recommendationsData).map(
                  (recommendation) => recommendation.thumbnail
                );
                updatedRecipientsList[recipientName] = images.slice(0, 3); // Only take the first three images
                setRecipientsList({ ...updatedRecipientsList });
              },
              { onlyOnce: true }
            );
          });
        },
        { onlyOnce: true }
      );
    }
  }, [user]);

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
      <Container
        maxWidth="sm"
        style={{ marginTop: "70px", marginBottom: "70px" }}
      >
        <Box sx={{ minWidth: 200 }}>
          {Object.keys(recipientsList).map((recipientName, index) => (
            <Card
              key={index}
              sx={{ marginBottom: 2, backgroundColor: "#f0f8ff" }}
            >
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {recipientName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ImageList
                    sx={{ width: "calc(100% - 24px)", height: "auto" }}
                    cols={3}
                    gap={8}
                  >
                    {recipientsList[recipientName].map((imgSrc, imgIndex) => (
                      <ImageListItem key={imgIndex}>
                        <img
                          src={`${imgSrc}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${imgSrc}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={`Recommendation for ${recipientName} ${imgIndex}`}
                          loading="lazy"
                          style={{
                            width: "80%",
                            height: "auto",
                            aspectRatio: "1 / 1",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                  <ArrowForwardIcon
                    sx={{ color: "#007580" }}
                    onClick={() => handleNavigateToRecommendations(recipientName)}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default RecipientsPage;
