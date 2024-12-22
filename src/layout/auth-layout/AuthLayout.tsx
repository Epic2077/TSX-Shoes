import React from "react";
import LoginHeader from "../loginHeader/LoginHeader";
import { Outlet } from "react-router-dom";

interface AuthLayoutProps {
  address?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ address }) => {
  return (
    <div>
      <header className="pt-[12px] px-6">
        <LoginHeader address={address} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
