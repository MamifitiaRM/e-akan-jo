import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import clientContext from "../appContext/clientContext";

const Hero = () => {
  const { hero_img } = assets;
  const { setFocus } = clientContext();

  return (
    <div className="grid md:grid-cols-2 items-center border-1 border-secondText mt-2 ">
      <div className="lg:space-y-4 lg:mx-auto text-center space-y-1 py-4">
        <h3>~~~~~~ Bienvenu</h3>
        <h1>Derniers Arrivages</h1>
        <h3 className="transform hover:translate-x-3.5 ease-in-out duration-150">
          <Link to="/collections" onClick={() => setFocus("Collection")}>
            Acheter maintenant
          </Link>{" "}
          ~~~~~~
        </h3>
      </div>
      <div>
        <img src={hero_img} />
      </div>
    </div>
  );
};

export default Hero;
