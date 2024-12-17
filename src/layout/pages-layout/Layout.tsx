import React from "react";
import { Outlet } from "react-router-dom";
import HomeFooter from "../../components/home-components/footer/Footer";

const Pageslayout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <footer>
        <HomeFooter />
      </footer>
    </div>
  );
};
export default Pageslayout;
