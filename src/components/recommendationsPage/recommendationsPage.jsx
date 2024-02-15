import React from "react";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";
import { Container, Box, Typography, Card, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const RecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let recommendationString = "";
  if (typeof location.state?.recommendation === 'string') recommendationString = location.state.recommendation;
  else if (Array.isArray(location.state?.recommendation)) recommendationString = location.state.recommendation.join(" ");
  else recommendationString = "";
  let recommendations = recommendationString.split(/Recommended Product\d:/).filter(Boolean);

  const handleBack = () => {
    navigate("/home", {
      state: {
        ...location.state, 
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80vh",
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
        {recommendations.length > 0 ? (
          recommendations.map((recommendation, index) => (
            <Card key={index} sx={{ mb: 2, p: 2 }}>
              {recommendation.trim().split('\n').map((line, lineIndex) => (
                <Typography key={lineIndex}>{line}</Typography>
              ))}
            </Card>
          ))
        ) : (
          <Typography>No recommendations available.</Typography>
        )}
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
                Want a different one
              </Button>
        </Box>
      </Container>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default RecommendationsPage;
