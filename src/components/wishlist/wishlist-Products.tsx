import { Product } from "../../types/Product.type";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductWishlist = ({ product }: Props) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="flex flex-col items-start justify-start pb-1"
    >
      <div className="rounded-3xl w-[182px] h-[182px] relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full rounded-3xl"
        />
        <div className="absolute top-0 right-0 mt-4 mr-4 rounded-full bg-black p-2">
          <img src="../../../src/assets/icons/wishheart.svg" />
        </div>
      </div>
      <h1 className="font-bold text-xl text-[#152536] mt-2">{product.name}</h1>
      <div className="flex flex-row	">
        <img src="../../../src/assets/icons/half-star.svg" alt="star" />
        <p className="text-gray-500  ">{product.rating}</p>
        <p className="text-gray-500  mx-3 ">|</p>
        <p className="rounded-md bg-slate-200 text-black font-sans mx-3">
          {product.sold_quantity} sold
        </p>
      </div>
      <p className="text-base font-semibold text-[#152536] mt-2 mb-2">
        $ {product.price}
      </p>
    </Link>
  );
};

export default ProductWishlist;
