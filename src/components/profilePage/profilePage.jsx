import React from "react";
import "./profilePage.less";
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

const ProfilePage = () => {
  const [user] = useAuthState();
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

  const deleteAccount = async (navigate) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
      const user = auth.currentUser;
      await deleteUser(user);
      // 用户已被删除，重定向到登录页面或其他页面
      navigate("/login");
    } catch (err) {
      // 处理错误情况，例如显示错误消息
      console.error("Error deleting user account:", err.message);
      alert("Error deleting account: " + err.message);
    }
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
            {user ? (
              <Box sx={{ minWidth: 200 }}>
                <Avatar
                  alt={user.displayName || "User"}
                  src={user.photoURL}
                  sx={{ width: 100, height: 100 }}
                />
                <Box sx={{ my: 2, mx: 1 }}>
                  <Typography variant="subtitle1">
                    {user.displayName || "User"}
                  </Typography>
                  <Typography variant="subtitle2">
                    Email: {user.email}
                  </Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => signout()}
                        sx={{
                          borderRadius: 2,
                          fontSize: 13,
                          background:
                            "linear-gradient(45deg, #00b859, #007580)",
                          "&:hover": {
                            transform: "scale(1.02)",
                            filter: "brightness(1.1)",
                          },
                        }}
                      >
                        SIGN OUT
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth 
                        variant="contained"
                        onClick={() => deleteAccount(navigate)}
                        sx={{
                          borderRadius: 2,
                          fontSize: 13,
                          background:
                            "linear-gradient(45deg, #00b859, #007580)",
                          "&:hover": {
                            transform: "scale(1.02)",
                            filter: "brightness(1.1)",
                          },
                        }}
                      >
                        DELETE ACCOUNT
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ) : (
              <Typography variant="subtitle1">
                No user is currently signed in.
              </Typography>
            )}
          </Box>
        </Container>
      </div>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default ProfilePage;
