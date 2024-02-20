import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useAuthState } from "../../../utilities/firebaseUtils";
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

const RecipientsPage = () => {
    const [user] = useAuthState();
    const [recipientsList, setRecipientsList] = useState([]);
  
    useEffect(() => {
      if (user) {
        const db = getDatabase(getFirebaseApp()); 
        const recipientsRef = ref(db, `recipients/${user.uid}`);
  
        onValue(
          recipientsRef,
          (snapshot) => {
            const data = snapshot.val() || {};
            const recipientsArray = Object.values(data); 
            setRecipientsList(recipientsArray); 
          },
          {
            onlyOnce: true,
          }
        );
      } else {
        setRecipientsList([]); 
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
      <div>
        <Container
          maxWidth="sm"
          style={{ marginTop: "70px", marginBottom: "70px" }}
        >
          <Box sx={{ minWidth: 200 }}>
          <Typography variant="subtitle1">
              Recipients
            </Typography>
            <Divider sx={{ my: 2 }} />
            {recipientsList.map((recipient, index) => (
              <Typography key={index} sx={{ mt: 1 }}>
                {recipient} 
              </Typography>
            ))}
          </Box>
        </Container>
      </div>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default RecipientsPage;
