import React, { useEffect } from "react";
import Hero from "../components/Hero";
import LastCollections from "../components/LastCollections";
import BestSellers from "../components/BestSellers";
import Other from "../components/Other";
import clientContext from "../appContext/clientContext";

const HomePage = () => {
  const { setAdminConnected } = clientContext();
  const { setFocus } = clientContext();

  // Pour afficher le navBar et le footer quand on n'est plus dans le dashboard
  useEffect(() => {
    setAdminConnected(false);
    setFocus("Accueil");
  }, []);

  return (
    <main>
      <Hero />
      <LastCollections />
      <BestSellers />
      <Other />
    </main>
  );
};

export default HomePage;
