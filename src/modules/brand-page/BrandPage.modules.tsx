import { useParams } from "react-router-dom";
import ProductsContainer from "../../components/home-components/products/products-container/ProductsContainer.components";
import Back from "../../components/Auth-components/header/back";
import { useEffect, useState } from "react";
import { Product } from "../../types/Product.type";
import { getProductByBrand } from "../../api/Api";

const BrandPage = () => {
  const { brandName } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filteredBrand = brandName ? brandName.toLowerCase() : "";

  // const filteredBrand = getProductByBrand(searchedBrand);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const filteredProducts = await getProductByBrand(filteredBrand);
        console.log(filteredBrand);

        setProducts(filteredProducts);
      } catch (err) {
        console.error("Error in fetchProducts:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [brandName]);

  if (!filteredBrand) {
    return <p className="text-center text-xl">Brand not found!</p>;
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center my-40">
        <img
          src="../../../../../src/assets/icons/spinner-atom.svg"
          alt="loading"
          className="animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="py-4 px-8 flex items-center justify-start">
        <Back />
        <p className="text-xl font-semibold">{filteredBrand}</p>
      </div>

      <div>
        <ProductsContainer products={products} />
      </div>
    </div>
  );
};

export default BrandPage;
