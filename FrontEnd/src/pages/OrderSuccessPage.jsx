import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import useOrderStore from "../stores/useOrderStore";
import clientContext from "../appContext/clientContext";

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { verifySession } = useOrderStore();
  const { setFocus } = clientContext();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setFocus("");
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    verifySession(sessionId).then((res) => {
      setStatus(res?.paid ? "success" : "error");
    });
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="h-[38vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 size={50} className="animate-spin text-gray-300" />
        <p>Vérification du payement...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="h-[38vh] flex flex-col items-center justify-center space-y-4 text-center">
        <XCircle size={60} className="text-red-500" />
        <h3>Le payement n'a pas pu être confirmé</h3>
        <Link
          to="/cart"
          className="text-white bg-black py-2.5 px-3 hover:scale-105 duration-300 ease-in-out"
        >
          Retour à la carte
        </Link>
      </div>
    );
  }

  return (
    <div className="h-[38vh] flex flex-col items-center justify-center space-y-4 text-center">
      <CheckCircle2 size={60} className="text-green-600" />
      <h3>Votre commande a été payée avec succès</h3>
      <Link
        to="/my-orders"
        className="text-white bg-black py-2.5 px-3 hover:scale-105 duration-300 ease-in-out"
      >
        Voir mes commandes
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
