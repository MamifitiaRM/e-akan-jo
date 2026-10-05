import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkUser: false,

  signup: async (name, email, password) => {
    set({ loading: true });
    try {
      const user = await axios.post("/auth/signup", { name, email, password });
      if (!user.data.status) {
        toast.error(user.data.message);
        return set({ loading: false });
      }
      return set({ loading: false, user: user.data.user });
    } catch (error) {
      toast.error(error.message);
      set({ loading: false, user: null });
    }
  },
  login: async (email, password) => {
    set({ loading: true });
    try {
      const user = await axios.post("/auth/login", { email, password });
      if (!user.data.status) {
        toast.error(user.data.message);
        return set({ loading: false });
      }
      return set({ loading: false, user: user.data.user });
    } catch (error) {
      toast.error(error.message);
      set({ loading: false, user: null });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      const user = await axios.post("/auth/logout");
      if (!user.data.status) {
        toast.error(user.data.message);
        return set({ loading: false });
      }
      return set({ loading: false, user: null });
    } catch (error) {
      toast.error(error.message);
      set({ loading: false, user: null });
    }
  },
  checkAuth: async () => {
    set({ checkUser: true });
    try {
      const user = await axios.get("/auth/user");
      if (!user.data.status) {
        return set({ checkUser: false, user: null });
      }
      return set({ checkUser: false, user: user.data.user });
    } catch (error) {
      toast.error(error.message);
      set({ checkUser: false, user: null });
    }
  },
}));

export default useUserStore;
