import React from "react";
import Back from "../Auth-components/header/back";
import HomeProducts from "../home-components/products/Product";
import WishlistContainer from "./WishlistContainer";

const Wishlist: React.FC = () => {
  return (
    <div className="px-4">
      <div className="py-4 px-8 flex items-center justify-start">
        <Back name="Wishlist" address="/Home" />
        <img
          className=" ml-auto"
          src="../../../src/assets/icons/search.svg"
          alt="search"
        />
      </div>
      <div>
        <WishlistContainer />
      </div>
    </div>
  );
};
export default Wishlist;
