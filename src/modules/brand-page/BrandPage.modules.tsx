import { useParams } from "react-router-dom";
import { Brands } from "../../types/Brands.type";
import ProductsContainer from "../../components/home-components/products/products-container/ProductsContainer.components";
import Back from "../../components/Auth-components/header.tsx/back";
import { useEffect, useState } from "react";
import { Product } from "../../types/Product.type";
import { getProducts } from "../../api/Api";

const BrandPage = () => {
  const { brandName } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filteredBrand = Brands.find(
    (brand) => brand.name.toLowerCase() === brandName?.toLowerCase()
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const allProducts = await getProducts();

        const filteredProducts = allProducts.filter((product) => {
          if (!product.brand || !brandName) {
            return false;
          }
          return product.brand.toLowerCase() === brandName.toLowerCase();
        });

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
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="py-4 px-8 flex items-center justify-start">
        <Back />
        <p className="text-xl font-semibold">{filteredBrand.name}</p>
      </div>

      <div>
        <ProductsContainer products={products} />
      </div>
    </div>
  );
};

export default BrandPage;
