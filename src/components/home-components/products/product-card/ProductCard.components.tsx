import { Product } from "../../../../types/Product.type";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="flex flex-col items-start justify-start pb-1"
    >
      <div className="rounded-3xl w-[182px] h-[182px]">
        <img
          src={product.images}
          alt={product.title}
          className="w-full h-full rounded-3xl"
        />
      </div>
      <h1 className="font-bold text-xl text-[#152536] mt-2">{product.title}</h1>
      <p className="text-base font-semibold text-[#152536] mb-2">
        $ {product.price}
      </p>
    </Link>
  );
};

export default ProductCard;
