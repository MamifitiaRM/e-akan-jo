import { create } from "zustand";

const clientContext = create((set) => ({
  // focus c'est pour le petit trait dans le navBar
  focus: "Accueil",
  setFocus: (newFocus) => set({ focus: newFocus }),
  adminConnected: false,
  setAdminConnected: (modification) => set({ adminConnected: modification }),
  // lowerToUpperPrice: () => {

  // },
}));

export default clientContext;
