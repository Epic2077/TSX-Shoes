import React from "react";
import HomeHeader from "../../components/home-components/header/header";
import HomeSearch from "../../components/home-components/search/Search";
import HomeBrand from "../../components/home-components/brandPage/Brands";

const Home: React.FC = () => {
  return (
    <div className="px-6 py-4">
      <HomeHeader />
      <HomeSearch />
      <HomeBrand />
    </div>
  );
};
export default Home;
