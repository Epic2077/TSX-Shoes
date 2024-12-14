import React from "react";
import LoginHeader from "../loginHeader/LoginHeader";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <LoginHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
