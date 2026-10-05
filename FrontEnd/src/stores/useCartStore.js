import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,

  getAllProductCart: async () => {
    try {
      const product = await axios.get("/cart/getAllCart");
      set({ cart: product.data.cart });
      get().calculateTotals();
    } catch (error) {
      toast.error(error);
      set({ cart: [] });
    }
  },
  addProductCart: async (product) => {
    try {
      await axios.post("/cart/addCart", {
        productId: product._id,
      });
      toast.success("Produit ajouté à la carte");
      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: parseInt(item.quantity) + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error);
    }
  },
  removeProductCart: async (productId) => {
    try {
      await axios.delete("/cart/removeCart", { data: { productId } });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== productId),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error(error);
    }
  },
  updateProductCart: async (productId, quantity) => {
    try {
      if (quantity == 0) {
        get().removeProductCart(productId);
        return;
      }
      await axios.put(`/cart/updateCart/${productId}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error(error);
    }
  },
  calculateTotals: () => {
    const { cart } = get();
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    set({ total });
  },
}));

export default useCartStore;
