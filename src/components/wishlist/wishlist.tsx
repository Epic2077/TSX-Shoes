import React from "react";
import Back from "../Auth-components/header.tsx/back";
import HomeProducts from "../home-components/products/Product";
import WishlistContainer from "./WishlistContainer";
const Wishlist: React.FC = () => {
    return (
      <div className="px-4">
    <div className="py-4 px-8 flex items-center justify-start">
      <Back />
          <p className="text-xl font-semibold">Wishlist</p>
        <img className="mx-60"
          src="../../../src/assets/icons/search.svg"
alt="search" />                 
            </div>
            <HomeProducts />
        <div>
          <WishlistContainer />
        </div> 
        </div>    
  );
};
export default Wishlist;
