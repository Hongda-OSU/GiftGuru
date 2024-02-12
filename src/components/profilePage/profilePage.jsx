import React from "react";
import "./profilePage.less";
import {
  firebaseSignOut,
  useAuthState,
} from "../../../utilities/firebaseUtils";
import {
  Slider,
  Stack,
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";

const ProfilePage = () => {
  const navigate = useNavigate();

  const signout = () => {
    firebaseSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
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
          Profile
      <button onClick={() => signout()}>SignOut</button>
          </Box>
        </Container>
      </div>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default ProfilePage;
