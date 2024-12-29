import React from "react";
import ProductsContainer from "../../components/home-components/products/products-container/ProductsContainer.components";
import { useState, useEffect } from "react";

const SearchBox: React.FC = () => {
  const date = new Date();
  const timeBar = date.getHours() + ":" + date.getMinutes();

  const [searchField, setSearchField] = useState("");
  const [products, setProducts] = useState([] as any[]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((Response) => Response.json())
      .then((title) => setProducts(title));
  }, []);

  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      return product.title.toLocaleLowerCase().includes(searchField);

    });
    setFilteredProducts(newFilteredProducts);
  }, [products, searchField]);

  const onSearchChange = (event: any) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <>
      <div className="flex justify-between mx-6 my-4">
        <div>
          {/* <span className="font-bold text-lg">9:41</span> */}
          <span className="font-bold text-lg"> {timeBar}</span>
        </div>
        <div className="flex gap-1">
          <img src="/src/assets/icons/cellular-icon.svg" alt="cellular-icon" />
          <img src="/src/assets/icons/wifi-icon.svg" alt="wifi-icon" />
          <img src="/src/assets/icons/battery-icon.svg" alt="battery-icon" />
        </div>
      </div>
      <div className="flex h-9 items-center bg-[#FAFAFA] py-8 m-6 rounded-3xl border-2 hover:border-zinc-800">
        <img
          src="/src/assets/icons/search.svg"
          alt="search-icon"
          className="pl-6 h-6"
        />
        <input
          type="text"
          name="search-box"
          id="search-box"
          placeholder="Search"
          className="bg-transparent w-full h-9 outline-none pl-4 text-lg"
          onChange={onSearchChange}
        />
        <img
          src="/src/assets/icons/setting-icon.svg"
          alt="setting-icon"
          className="pr-4"
        />
      </div>
      <div>
        <ProductsContainer products={filteredProducts} />
      </div>
    </>
  );
};

export default SearchBox;
