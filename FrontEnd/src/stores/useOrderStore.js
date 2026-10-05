import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

const useOrderStore = create((set) => ({
  orders: [],
  myOrders: [],
  loading: false,
  currentOrder: null,

  placeOrderCod: async (address) => {
    set({ loading: true });
    try {
      const res = await axios.post("/order/create", { address });
      if (!res.data.status) {
        toast.error(res.data.message);
        set({ loading: false });
        return null;
      }
      toast.success("Commande passée avec succès");
      set({ loading: false, currentOrder: res.data.order });
      return res.data.order;
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
      return null;
    }
  },

  placeOrderStripe: async (address) => {
    set({ loading: true });
    try {
      const res = await axios.post("/order/create-checkout-session", {
        address,
      });
      if (!res.data.status) {
        toast.error(res.data.message);
        set({ loading: false });
        return;
      }
      window.location.href = res.data.url;
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
    }
  },

  verifySession: async (sessionId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/order/verify-session/${sessionId}`);
      set({ loading: false, currentOrder: res.data.order });
      return res.data;
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
      return null;
    }
  },

  getMyOrders: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/order/my-orders");
      set({ loading: false, myOrders: res.data.orders || [] });
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
    }
  },

  getAllOrders: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/order/all");
      set({ loading: false, orders: res.data.orders || [] });
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      await axios.put(`/order/update-status/${orderId}`, { status });
      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        ),
      }));
      toast.success("Statut mis à jour");
    } catch (error) {
      toast.error(error.message);
    }
  },
}));

export default useOrderStore;
