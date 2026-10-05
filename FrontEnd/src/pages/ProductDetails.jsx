import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import useUserStore from "../stores/useUserStore";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import useProductStore from "../stores/useProductStore";
import clientContext from "../appContext/clientContext";
import useCartStore from "../stores/useCartStore";

const ProductDetails = () => {
  const { id } = useParams();
  const [imageId, setImageId] = useState(0);
  const { user } = useUserStore();
  const { getSpecificProduct, oneProduct } = useProductStore();
  const [size, setSize] = useState([]);
  const { setFocus } = clientContext();

  const { addProductCart } = useCartStore();

  useEffect(() => {
    getSpecificProduct(id);
    setFocus("Collection");
    setImageId(0);
  }, [id]);

  const handleAddTocart = (product) => {
    if (!user) return toast.error("Veuillez d'abord vous connecté");
    addProductCart(product);
  };

  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => navigate(-1)} className="w-10">
        <ArrowLeft
          size={35}
          className="hover:scale-115 ease-in-out duration-300 hover:cursor-pointer"
        />
      </div>
      <div className="mt-6 mb-15 grid grid-cols-1 lg:grid-cols-[minmax(0,600px)_1fr] gap-8">
        <div className="flex flex-col-reverse sm:flex-row gap-x-4">
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible">
            {oneProduct?.image.map((img, index) => (
              <img
                key={img}
                src={img}
                className="h-20 w-20 sm:h-[130px] sm:w-[130px] object-cover cursor-pointer flex-shrink-0"
                onClick={() => setImageId(index)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={oneProduct?.image[imageId]}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        </div>

        <div className="lg:px-12 lg:pt-12 space-y-6">
          <h4>{oneProduct?.name}</h4>
          <div className="font-semibold text-2xl">
            Ariary {oneProduct?.price}
          </div>
          <p>{oneProduct?.description}</p>
          <div>
            <h5 className="font-mono pb-5">Selectionner la taille</h5>
            <div className="flex flex-wrap gap-4">
              {oneProduct?.size.map((taille) => (
                <div
                  key={taille}
                  className={`bg-gray-200 px-4.5 py-2.5 font-semibold cursor-pointer ${
                    size.includes(taille)
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() =>
                    setSize(
                      size.includes(taille)
                        ? size.filter((size) => size !== taille)
                        : [...size, taille]
                    )
                  }
                >
                  {taille}
                </div>
              ))}
            </div>
          </div>
          <button
            className="bg-black text-white py-2.5 px-5 hover:scale-105 duration-300 ease-in-ou cursor-pointer"
            onClick={() => handleAddTocart(oneProduct)}
          >
            Ajouter à la carte
          </button>
          <hr className="text-gray-300" />
          <div>
            <p>100% Originale</p>
            <p>Remboursable et garantie offerte</p>
          </div>
        </div>
      </div>
      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;
