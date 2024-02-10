import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeSelected = location.pathname === "/home";
  const isProfileSelected = location.pathname === "/profile";

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "50px",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        boxShadow: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <IconButton
        sx={{
          width: "50px",
          height: "50px",
          color: isHomeSelected ? "#007580" : "	#666666",
          "&:hover .MuiSvgIcon-root, &:hover .MuiTypography-root": {
            color: "#007580",
          },
        }}
        onClick={() => navigate("/home")}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <HomeIcon sx={{ width: "30px", height: "30px" }} />
          {/* <Typography variant='caption'>
            HOME
          </Typography> */}
        </Box>
      </IconButton>

      <IconButton
        sx={{
          width: "50px",
          height: "50px",
          color: isProfileSelected ? "#007580" : "#666666",
          "&:hover .MuiSvgIcon-root, &:hover .MuiTypography-root": {
            color: "#007580",
          },
        }}
        onClick={() => navigate("/profile")}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ManageAccountsIcon sx={{ width: "30px", height: "30px" }} />
          {/* <Typography variant='caption'>
            PROFILE
          </Typography> */}
        </Box>
      </IconButton>
    </Box>
  );
};

export default BottomNavbar;
