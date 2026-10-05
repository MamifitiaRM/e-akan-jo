import React from "react";
import { Link } from "react-router-dom";
import clientContext from "../appContext/clientContext";

const Card = ({ product }) => {
  const { setFocus } = clientContext();

  return (
    <div>
      <Link
        to={`/product/${product._id}`}
        className="space-y-3"
        onClick={() => setFocus("Collection")}
      >
        <div className="overflow-hidden">
          <img
            src={product.image[0]}
            className="h-[300px] w-full object-cover hover:scale-110 transition ease-in-out cursor-pointer "
          />
        </div>
        <p className="cursor-pointer text-sm">{product.name}</p>
        <div className="cursor-pointer text-sm font-semibold">
          Ariary {product.price}
        </div>
      </Link>
    </div>
  );
};

export default Card;
