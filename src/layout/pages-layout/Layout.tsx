import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HomeFooter from "../../components/home-components/footer/Footer";
import CartOrderHeader from "../../components/pages-components/CartOrderHeader";

const PagesLayout: React.FC = () => {
  const location = useLocation();
  const name = location.pathname.toLowerCase();
  return (
    <div>
      <header
        className={`${
          name.includes("home") ||
          name.includes("profile") ||
          name.includes("wallet")
            ? "hidden"
            : "block"
        }`}
      >
        <CartOrderHeader
          name={name.includes("cart") ? "My Cart" : "My Orders"}
        />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="sticky bottom-0">
        <HomeFooter />
      </footer>
    </div>
  );
};
export default PagesLayout;
