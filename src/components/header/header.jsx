import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "../../../public/logo2.png";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.pathname === "/recommendation-detail") navigate(-1);
    else if (location.pathname === "/recipients-recommendation") navigate("/recipients");
    else if (location.pathname === "/recommendations") navigate("/home", { state: {...location.state, }, });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        background: "linear-gradient(45deg, #00b859, #007580)",
        height: "48px",
      }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: "center" }}>
        {(location.pathname === "/recommendations" ||
          location.pathname === "/recommendation-detail" ||
          location.pathname === "/recipients-recommendation") && (
          <IconButton
            edge="start"
            aria-label="back"
            onClick={handleBack}
            sx={{ position: "absolute", left: 15 }}
          >
            <ArrowBackIcon sx={{ color: "white", fontSize: "1em" }} />
          </IconButton>
        )}
        <IconButton edge="start" aria-label="logo">
          <img src={Logo} alt="Logo" style={{ height: "22px" }} />
          <p className="header-title">GiftGuru</p>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
