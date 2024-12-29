import ProductsContainer from "../../components/home-components/products/products-container/ProductsContainer.components";
import Back from "../../components/Auth-components/header/back";

const AllProducts = () => {
  return (
    <>
      <div className="py-4 px-8 flex items-center justify-start">
        <Back />
        <p className="text-xl font-semibold">All Brands</p>
      </div>
      <div>
        <ProductsContainer />
      </div>
    </>
  );
};

export default AllProducts;
