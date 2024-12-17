import React from "react";
import HomeHeader from "../../components/home-components/header/header";
import HomeSearch from "../../components/home-components/search/Search";
import HomeBrand from "../../components/home-components/brandPage/brands";
import HomeProducts from "../../components/home-components/products/Product";
import HomeFooter from "../../components/home-components/footer/Footer";

const Home: React.FC = () => {
  return (
    <div className="px-6 py-4 min-h-screen">
      <HomeHeader />
      <HomeSearch />
      <HomeBrand />
      <HomeProducts />
      <HomeFooter />
    </div>
  );
};
export default Home;
