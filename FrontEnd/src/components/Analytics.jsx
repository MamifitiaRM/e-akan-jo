import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import useOrderStore from "../stores/useOrderStore";
import useProductStore from "../stores/useProductStore";
import { Loader2 } from "lucide-react";

const Analytics = () => {
  const { orders, getAllOrders, loading } = useOrderStore();
  const { product } = useProductStore();

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

  const validOrders = orders.filter((order) => order.status !== "annule");
  const totalRevenue = validOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const salesByDay = {};
  validOrders.forEach((order) => {
    const day = new Date(order.createdAt).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
    salesByDay[day] = (salesByDay[day] || 0) + order.totalAmount;
  });
  const chartData = Object.entries(salesByDay)
    .slice(-7)
    .map(([day, total]) => ({ day, total }));

  return (
    <aside className="py-6 px-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border-2 border-gray-300 p-4">
          <p className="text-sm text-secondText">Chiffre d'affaires</p>
          <h4>Ariary {totalRevenue}</h4>
        </div>
        <div className="border-2 border-gray-300 p-4">
          <p className="text-sm text-secondText">Commandes</p>
          <h4>{validOrders.length}</h4>
        </div>
        <div className="border-2 border-gray-300 p-4">
          <p className="text-sm text-secondText">Produits</p>
          <h4>{product?.length || 0}</h4>
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="font-light text-xl">Ventes par jour</h5>
        {chartData.length === 0 ? (
          <p className="text-sm text-secondText">Pas encore de commande</p>
        ) : (
          <div className="border-2 border-gray-300 p-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                <XAxis dataKey="day" stroke="#595959" fontSize={12} />
                <YAxis stroke="#595959" fontSize={12} />
                <Tooltip
                  formatter={(value) => [`Ariary ${value}`, "Ventes"]}
                  contentStyle={{ border: "2px solid #2e2e2e", borderRadius: 0 }}
                />
                <Bar dataKey="total" fill="#2e2e2e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Analytics;
