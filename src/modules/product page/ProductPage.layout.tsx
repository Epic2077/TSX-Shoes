import { useParams } from "react-router-dom";
import { useProduct } from "../../api/Query";


const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, isErrorProduct, isLoadingProduct } = useProduct(Number(id));

  if (isLoadingProduct) return <div>Loading...</div>;
  if (isErrorProduct) return <div>Error loading product.</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <img src={product.images} alt={product.title} className="w-64 h-64 rounded-3xl" />
        <h1 className="text-2xl font-bold">{product.title}</h1>
      </div>
    </div>
  );
};

export default ProductPage;
