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
import ProductPage from "../modules/product-page/ProductPage.modules";
import ChangePassword from "../pages/Auth/change";
import CartPage from "../pages/cart/Cart";
import CheckOutPage from "../pages/checkout/Checkout";
import ShippingLayout from "../layout/Shipping-Layout/Shipping.layout";
import ShippingAddress from "../modules/Shipping/Address";
import Wishlist from "../components/wishlist/wishlist";
import ShippingDelivery from "../modules/Shipping/Delivery";
import SearchBox from "../layout/search-box/searchBox";
import MostPopular from "../modules/most-popular/MostPopular.modules";

const RouterPage: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes here */}
        <Route path="/" element={<Onboarding />} />
        <Route path="" element={<PagesLayout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/Orders" />
        </Route>
        <Route path="/Home/search" element={<SearchBox />} />
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
        <Route path="/Checkout" element={<CheckOutPage />} />
        <Route path="/Mostpopular" element={<MostPopular />} />
        <Route path="" element={<ShippingLayout />}>
          <Route path="/Checkout/Address" element={<ShippingAddress />} />
          <Route path="/Checkout/Delivery" element={<ShippingDelivery />} />
        </Route>
        <Route path="/Wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
};

export default RouterPage;
