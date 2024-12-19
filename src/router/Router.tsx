import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboarding from "../pages/onboarding/Onboarding";
import LoginPage from "../pages/Auth/Login";
import SignupPage from "../pages/Auth/Signup";
import AuthLayout from "../layout/auth-layout/AuthLayout";
import Forgot from "../pages/Auth/Forgot";
import Home from "../pages/home/Index";
import ProductBrandFilter from "../pages/productBrand/ProductBrand";
import PagesLayout from "../layout/pages-layout/Layout";
import BrandPage from "../modules/brand-page/BrandPage.modules";
import AllProducts from "../modules/all-products/AllProducts.module";
import ProductPage from "../modules/product page/ProductPage.layout";
import ChangePassword from "../pages/Auth/change";
import SearchBox from "../layout/search-box/searchBox";

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
        <Route path="/Auth" element={<AuthLayout address="/Home" />}>
          <Route path="/Auth/Login" element={<LoginPage />} />
        </Route>
        <Route path="/Auth" element={<AuthLayout />}>
          <Route path="/Auth/Signup" element={<SignupPage />} />
          <Route path="/Auth/Forgot" element={<Forgot />} />
          <Route path="/Auth/ChangePassword" element={<ChangePassword />} />
        </Route>
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/home/:brandName" element={<BrandPage />}>
          <Route index element={<ProductBrandFilter />} />
        </Route>
        <Route path="/Home/products" element={<AllProducts />} />
        <Route path="/home/search" element={<SearchBox />} />
      </Routes>
    </Router>
  );
};

export default RouterPage;
