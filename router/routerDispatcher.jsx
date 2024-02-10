import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../src/components/homePage/homePage";
import LoginPage from "../src/components/loginPage/loginPage";
import ProfilePage from "../src/components/profilePage/profilePage";
import RecommendationsPage from "../src/components/recommendationsPage/recommendationsPage";

const RouteDispatcher = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteDispatcher;
