import React from "react";
import Back from "../../components/Auth-components/header.tsx/back";
import { Outlet, useParams } from "react-router-dom";

interface filterLayoutProps {
  address: string;
}

const ProductFilterLayout: React.FC<filterLayoutProps> = ({ address }) => {
  const { ProductName } = useParams<{ ProductName: string }>();
  return (
    <div>
      <header className="pt-[12px] px-9 w-full">
        <Back address={address} name={ProductName} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProductFilterLayout;
