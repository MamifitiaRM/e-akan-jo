import React from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import { DELIVERY_FEE } from "../utils/utility";

const CartTotal = () => {
  // Composant utilisé dans la page carte

  const navigate = useNavigate();
  const { total } = useCartStore();

  return (
    <div className="lg:ml-auto w-full lg:max-w-sm space-y-3 h-fit">
      <h2>Totals ~~~~~~</h2>
      <hr />
      <div className="flex justify-between">
        <p>Sous-total</p>
        <div>Ariary {total}</div>
      </div>
      <div className="flex justify-between">
        <p>Frais de livraison</p>
        <div>Ariary {DELIVERY_FEE}</div>
      </div>
      <hr />
      <div className="flex justify-between font-bold">
        <p>Total</p>
        <div>Ariary {total + DELIVERY_FEE}</div>
      </div>
      <button
        className="text-white bg-black py-2.5 px-3 cursor-pointer hover:scale-105 duration-300 ease-in-out my-2 w-full sm:w-auto"
        onClick={() => navigate("/place-order")}
      >
        Procéder au payement
      </button>
    </div>
  );
};

export default CartTotal;
