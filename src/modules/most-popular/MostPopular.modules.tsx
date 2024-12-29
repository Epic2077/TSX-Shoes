import { useEffect, useState } from "react";
import Back from "../../components/Auth-components/header/back";
import { Product } from "../../types/Product.type";
import { getProducts } from "../../api/Api";
import ProductCard from "../../components/home-components/products/product-card/ProductCard.components";
import HomeProducts from "../../components/home-components/products/Product";

const MostPopular = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        const fiteredProducts = products.filter((product) => product.popular);
        setPopularProducts(fiteredProducts);
      } catch (error) {
        console.log("Error Fetching Products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="py-4 px-8 flex items-center justify-start">
        <div>
          <Back />
        </div>
        <p className="text-xl font-semibold">Most Popular</p>
      </div>
      <div className="ml-2">
      <HomeProducts />
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {popularProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default MostPopular;
