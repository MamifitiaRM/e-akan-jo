import React, { useEffect } from "react";
import { Loader2, PackageX } from "lucide-react";
import useOrderStore from "../stores/useOrderStore";
import clientContext from "../appContext/clientContext";
import { orderStatusLabels } from "../utils/utility";

const MyOrdersPage = () => {
  const { myOrders, getMyOrders, loading } = useOrderStore();
  const { setFocus } = clientContext();

  useEffect(() => {
    setFocus("");
    getMyOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-[38vh] flex items-center justify-center">
        <Loader2 size={50} className="animate-spin text-gray-300" />
      </div>
    );
  }

  if (myOrders.length === 0) {
    return (
      <div className="h-[38vh] flex flex-col items-center justify-center space-y-4">
        <PackageX size={60} />
        <h4>Vous n'avez pas encore de commande</h4>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-10 space-y-6">
      <h2>
        <span className="text-secondText">Mes</span> commandes ~~~~~~
      </h2>
      <div className="space-y-4">
        {myOrders.map((order) => (
          <div
            key={order._id}
            className="border-2 border-gray-300 p-4 space-y-3"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <p className="text-sm text-secondText">
                Commande du{" "}
                {new Date(order.createdAt).toLocaleDateString("fr-FR")}
              </p>
              <span className="text-sm font-semibold uppercase">
                {orderStatusLabels[order.status]}
              </span>
            </div>
            <div className="space-y-2">
              {order.products.map((item) => (
                <div
                  key={item.product?._id}
                  className="flex items-center gap-4"
                >
                  {item.product?.image?.[0] && (
                    <img
                      src={item.product.image[0]}
                      className="h-16 w-16 object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{item.product?.name}</p>
                    <p className="text-sm text-secondText">
                      Quantité: {item.quantity} - Ariary {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              <p>{order.paymentMethod === "stripe" ? "Payé par carte" : "Payement à la livraison"}</p>
              <p>Livraison: Ariary {order.deliveryFee}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>Ariary {order.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
