import React from "react";
import Card from "./Card";
import useProductStore from "../stores/useProductStore";

const LastCollections = () => {
  const { product } = useProductStore();

  const latestProducts = product?.slice(0, 10);

  return (
    <div className="spacing space-y-10 flex flex-col items-center">
      <div className="space-y-4 text-center">
        <h2>
          <span className="text-secondText">Dernière</span> collectons ~~~~~~
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, quas
          praesentium iure repudiandae totam molestiae
        </p>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 xl:gap-4 space-y-3">
        {latestProducts?.reverse().map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default LastCollections;
