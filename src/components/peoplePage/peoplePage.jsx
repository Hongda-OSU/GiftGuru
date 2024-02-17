import React from "react";
import {
  firebaseSignOut,
  useAuthState,
} from "../../../utilities/firebaseUtils";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirebaseApp } from "../../../utilities/firebase"; 
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Divider,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";

const PeoplePage = () => {
  const [user] = useAuthState();
  const navigate = useNavigate();

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
      <div>
        <Container
          maxWidth="sm"
          style={{ marginTop: "70px", marginBottom: "70px" }}
        >
          <Box sx={{ minWidth: 200 }}>
          <Typography variant="subtitle1">
                people
              </Typography>
          </Box>
        </Container>
      </div>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default PeoplePage;
