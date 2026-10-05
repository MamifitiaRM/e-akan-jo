import React, { useEffect } from "react";
import { Trash2Icon } from "lucide-react";
import CartTotal from "../components/CartTotal";
import clientContext from "../appContext/clientContext";
import useCartStore from "../stores/useCartStore";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { setFocus } = clientContext();
  const { cart, removeProductCart, updateProductCart } = useCartStore();

  useEffect(() => {
    setFocus("");
  }, []);

  const handleUpdateQuantity = (e, productId) => {
    if (e.target.value === "") {
      return;
    }
    updateProductCart(productId, Number(e.target.value));
  };

  const handleRemoveCard = (productId) => {
    if (window.confirm("Vous voulez vraiment supprimer ?")) {
      removeProductCart(productId);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="h-[38vh] space-y-4 flex items-center justify-center flex-col">
        <h4>Vous n'avez aucun produit dans votre carte</h4>
        <Link
          to="/collections"
          className="text-white bg-black py-2.5 px-3 cursor-pointer hover:scale-105 duration-300 ease-in-out"
        >
          Commencer à acheter
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 h-full mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-6">
          <h2>
            <span className="text-secondText">Vos</span> Cartes ~~~~~~
          </h2>
          {cart.map((product) => (
            <div
              key={product._id}
              className="border-gray-300 border-y-2 flex flex-wrap sm:flex-nowrap justify-between gap-4 p-4 items-center"
            >
              <div className="flex gap-4 sm:gap-8 items-center">
                <img src={product.image[0]} className="h-24 w-24 sm:h-30 sm:w-30 object-cover" />
                <div className="space-y-2 sm:space-y-4">
                  <p>{product.name}</p>
                  <div className="flex gap-4 items-center">
                    Ariary {product.price}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <input
                  type="number"
                  min={1}
                  value={product.quantity}
                  onChange={(e) => handleUpdateQuantity(e, product._id)}
                  className="pl-2 py-2 border-gray-400 border-2 w-20"
                />
                <Trash2Icon
                  className="text-primaryText hover:scale-105 duration-300 ease-in-out cursor-pointer"
                  onClick={() => handleRemoveCard(product._id)}
                />
              </div>
            </div>
          ))}
        </div>

        <CartTotal />
      </div>
    </div>
  );
};

export default CartPage;
