import { useProducts } from "../../../../api/Query";
import { Product } from "../../../../types/Product.type";
import ProductCard from "../product-card/ProductCard.components";

interface Props {
  products?: Product[];
  activeFilter?: string[];
}

const ProductsContainer = ({ products: propProducts, activeFilter }: Props) => {
  const {
    products: apiProducts,
    isLoadingProducts,
    isErrorProducts,
  } = useProducts();

  const products = propProducts || apiProducts;

  if (isLoadingProducts)
    return (
      <div className="w-full flex justify-center my-40">
        <img
          src="../../../../../src/assets/icons/spinner-atom.svg"
          alt="loading"
          className="animate-spin"
        />
      </div>
    );
  if (isErrorProducts) return <div>Error loading products.</div>;
  if (!products || products.length === 0) return <div>No products found.</div>;

  const filterProducts =
    (activeFilter || []).length === 0
      ? products
      : products.filter((product) =>
          activeFilter?.includes(product.brand.name)
        );

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {filterProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsContainer;
