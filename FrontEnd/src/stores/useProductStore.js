import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

const useProductStore = create((set, get) => ({
  product: null,
  loading: false,
  setProduct: (newProduct) => set({ product: newProduct }),
  oneProduct: null,
  // Pour les filtres seulement
  productForCollections: null,
  setProductForCollections: (product) =>
    set({ productForCollections: product }),
  categoryFilter: {
    men: false,
    women: false,
    kids: false,
  },
  setCategoryFilter: (filter) => set({ categoryFilter: filter }),
  clothesFilter: "",
  setClothesFilter: (filter) => set({ clothesFilter: filter }),
  // fin

  addProduct: async ({
    image,
    name,
    description,
    category,
    subCategory,
    price,
    size,
  }) => {
    set({ loading: true });
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("size", JSON.stringify(size));
      image.forEach((file, index) => {
        formData.append(`image${index + 1}`, file);
      });

      const res = await axios.post("/product/add", formData);
      if (!res.data.status) {
        set({ loading: false });
        toast.error(res.data.message);
        return false;
      }
      toast.success("Produit ajouté");
      set({ loading: false, product: res.data.newProduct });
      get().getAllProduct();
      return true;
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
      return false;
    }
  },
  getAllProduct: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/product/getProducts");
      set({
        loading: false,
        product: res.data.products,
        productForCollections: res.data.products,
      });
    } catch (error) {
      toast.error(error.message);
      set({ loading: false, product: null });
    }
  },
  deleteProduct: async (productId) => {
    try {
      await axios.delete("/product/deleteProduct/" + productId);
      get().getAllProduct();
    } catch (error) {
      toast.error(error.message);
    }
  },
  updateProduct: async (productId, productData) => {
    set({ loading: true });
    try {
      const res = await axios.put(
        `/product/updateProduct/${productId}`,
        productData
      );
      if (!res.data.status) {
        set({ loading: false });
        return toast.error("Une erreur est survenue");
      }
      toast.success("Produit mis à jour");
      set({ loading: false });
      get().getAllProduct();
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
    }
  },
  getSpecificProduct: async (productId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/product/getProduct/${productId}`);
      set({ loading: false, oneProduct: res.data.product });
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
    }
  },
}));

export default useProductStore;
