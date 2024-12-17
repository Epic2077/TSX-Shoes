import React from "react";
import { useParams } from "react-router-dom";

const ProductBrandFilter: React.FC = () => {
  const { ProductName } = useParams<{ ProductName: string }>();
  return (
    <div className="px-6 py-4">
      <p>{ProductName}</p>
    </div>
  );
};

export default ProductBrandFilter;
