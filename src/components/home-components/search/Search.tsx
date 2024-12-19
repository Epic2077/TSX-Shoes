import React from "react";
import { Input } from "../../Auth-components/loginInput/input";
import { useNavigate } from "react-router-dom";

const HomeSearch: React.FC = () => {
  const navgite = useNavigate();
  return (
    <Input
      icon="search"
      name="search"
      type="search"
      id="search"
      placeholder="Search"
      onClick={() => navgite("/home/search")}
    />
  );
};
export default HomeSearch;
