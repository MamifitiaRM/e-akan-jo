import React, { useEffect } from "react";
import { Loader2, PackageX } from "lucide-react";
import useOrderStore from "../stores/useOrderStore";

const statusOptions = [
  { value: "en_attente", label: "En attente" },
  { value: "en_preparation", label: "En préparation" },
  { value: "en_livraison", label: "En cours de livraison" },
  { value: "livre", label: "Livré" },
  { value: "annule", label: "Annulé" },
];

const OrderProduct = () => {
  const { orders, getAllOrders, updateOrderStatus, loading } =
    useOrderStore();

  useEffect(() => {
    getAllOrders();
  }, []);

  if (loading) {
    return (
      <aside className="py-6 px-8 flex justify-center">
        <Loader2 className="animate-spin text-gray-300" size={40} />
      </aside>
    );
  }

  if (orders.length === 0) {
    return (
      <aside className="py-6 px-8 flex flex-col items-center space-y-4">
        <PackageX size={80} />
        <h5 className="font-light text-xl">Aucune commande pour le moment</h5>
      </aside>
    );
  }

  return (
    <aside className="py-6 px-8 space-y-4">
      <h5 className="font-light text-xl">Commandes</h5>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border-2 border-gray-300 p-4 space-y-3"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-semibold">{order.user?.name}</p>
                <p className="text-sm text-secondText">{order.user?.email}</p>
              </div>
              <div className="text-sm text-secondText text-right">
                <p>
                  {order.address?.street}, {order.address?.city}
                </p>
                <p>{order.address?.phone}</p>
              </div>
            </div>
            <div className="space-y-1">
              {order.products.map((item) => (
                <p key={item.product?._id} className="text-sm">
                  {item.product?.name} x {item.quantity}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3">
              <p className="font-semibold">
                Total: Ariary {order.totalAmount}
              </p>
              <p className="text-sm">
                Payement:{" "}
                {order.paymentMethod === "stripe" ? "Carte (Stripe)" : "A la livraison"}{" "}
                -{" "}
                {order.paymentStatus === "paye" ? "Payé" : "En attente"}
              </p>
              <select
                className="py-2 px-3 border-gray-400 border-2"
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default OrderProduct;
