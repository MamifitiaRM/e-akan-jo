import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import useProductStore from "../stores/useProductStore";

const RelatedProducts = () => {
  const { product, oneProduct } = useProductStore();
  const related = product
    ?.filter(
      (item) =>
        item._id !== oneProduct?._id && item.category == oneProduct?.category
    )
    .slice(0, 5);
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-7">
      <h2>
        <span className="text-secondText">Relatif</span> à ce produit ~~~~~~
      </h2>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 xl:gap-4 space-y-3">
        {related?.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
      <button
        className="py-2.5 px-8 bg-black text-white cursor-pointer ease-in-out hover:scale-105 duration-300"
        onClick={() => navigate("/collections")}
      >
        Voir plus
      </button>
    </div>
  );
};

export default RelatedProducts;
