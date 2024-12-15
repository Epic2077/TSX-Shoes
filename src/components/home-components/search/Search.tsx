import React from "react";
import { Input } from "../../Auth-components/loginInput/input";

const HomeSearch: React.FC = () => {
  return (
    <Input
      icon="search"
      name="search"
      type="search"
      id="search"
      placeholder="Search"
    />
  );
};
export default HomeSearch;
