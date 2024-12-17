import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboarding from "../pages/onboarding/Onboarding";
import LoginPage from "../pages/Auth/Login";
import SignupPage from "../pages/Auth/Signup";
import AuthLayout from "../layout/auth-layout/AuthLayout";
import Forgot from "../pages/Auth/Forgot";
import Home from "../pages/home/Index";
import ProductFilterLayout from "../layout/product-filter-layout/ProductFilterLayout";
import ProductBrandFilter from "../pages/productBrand/ProductBrand";
import PagesLayout from "../layout/pages-layout/Layout";

const RouterPage: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={<Onboarding />} />
        <Route path="" element={<PagesLayout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Cart" />
          <Route path="/Orders" />
        </Route>
        <Route path="/Auth" element={<AuthLayout />}>
          <Route path="/Auth/Login" element={<LoginPage />} />
        </Route>
        <Route path="/Auth" element={<AuthLayout />}>
          <Route path="/Auth/Signup" element={<SignupPage />} />
          <Route path="/Auth/Forgot" element={<Forgot />} />
        </Route>
        {/* <Route path="/products/:id" element={<ProductPage />} /> */}
        <Route path="/Products/:ProductName" element={<ProductFilterLayout />}>
          <Route index element={<ProductBrandFilter />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterPage;
