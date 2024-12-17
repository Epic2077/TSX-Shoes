import React from "react";
import Back from "../../components/Auth-components/header.tsx/back";
import { useParams } from "react-router-dom";

interface filterLayoutProps {
  address: string;
}

const ProductFilterLayout: React.FC<filterLayoutProps> = ({ address }) => {
  const { ProductName } = useParams<{ ProductName: string }>();
  return <Back address={address} name={ProductName} />;
};

export default ProductFilterLayout;
