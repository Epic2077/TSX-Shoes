import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HomeFooter from "../../components/home-components/footer/Footer";
import CartOrderHeader from "../../components/pages-coponents/CartOrderHeader";

const PagesLayout: React.FC = () => {
  const location = useLocation();
  const name = location.pathname;
  return (
    <div>
      <header className={`${name.includes("Home") ? "hidden" : "block"}`}>
        <CartOrderHeader
          name={name.includes("Cart") ? "My Cart" : "My Orders"}
        />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <HomeFooter />
      </footer>
    </div>
  );
};
export default PagesLayout;
