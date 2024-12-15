import React from "react";
import HomeHeader from "../../components/home-components/header/header";
import HomeSearch from "../../components/home-components/search/Search";

const Home: React.FC = () => {
  return (
    <div className="px-6 py-4">
      <HomeHeader />
      <HomeSearch />
    </div>
  );
};
export default Home;
