import React from "react";
import LoginHeader from "../loginHeader/LoginHeader";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div>
      <header className="pt-[12px] px-6">
        <LoginHeader />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
