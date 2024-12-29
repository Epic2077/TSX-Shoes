import React from "react";
import Back from "../../components/Auth-components/header/back";
import { Outlet, useParams } from "react-router-dom";

const ProductFilterLayout: React.FC = () => {
  const { ProductName } = useParams<{ ProductName: string }>();
  return (
    <div>
      <header className="pt-[12px] px-9 w-full">
        <Back name={ProductName} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProductFilterLayout;
