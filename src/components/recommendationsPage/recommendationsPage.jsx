import React from "react";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";
import {
    Container,
    FormControl,
    Box,
    Typography,
  } from "@mui/material";
  

const RecommendationsPage = () => {

    return (
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "80vh",
            width: "100%",
            paddingBottom: "60px",
          }}>
        
            <Header/>

            <div>
                <Container
                    maxWidth="sm"
                    style={{ marginTop: "70px", marginBottom: "70px" }}>

                    <Typography variant="body2" gutterBottom >
                        Recommendations Page
                    </Typography>
            
                    <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
                </Container>
            </div>

        </Box>
    )
}

export default RecommendationsPage;