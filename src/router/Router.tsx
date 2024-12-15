import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboarding from "../pages/onboarding/Onboarding";
import LoginPage from "../pages/Auth/Login";
import SignupPage from "../pages/Auth/Signup";
import AuthLayout from "../layout/auth-layout/AuthLayout";
import Forgot from "../pages/Auth/Forgot";
import Home from "../pages/home/Index";

const RouterPage: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={<Onboarding />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Auth" element={<AuthLayout address="Home" />}>
          <Route path="/Auth/Login" element={<LoginPage />} />
        </Route>
        <Route path="/Auth" element={<AuthLayout address="Auth/Login" />}>
          <Route path="/Auth/Signup" element={<SignupPage />} />
          <Route path="/Auth/Forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterPage;
