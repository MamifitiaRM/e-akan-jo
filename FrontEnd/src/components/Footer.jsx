import React from "react";
import { routeLinks } from "../utils/utility";
import { Link } from "react-router-dom";
import clientContext from "../appContext/clientContext";

const Footer = () => {
  const { setFocus } = clientContext();
  return (
    <footer className="pt-26 pb-5">
      <div className="grid lg:grid-cols-2 items-center lg:gap-45 gap-10">
        <div className="lg:space-y-3">
          <Link
            className="lg:text-4xl title text-2xl"
            to="/"
            onClick={() => setFocus("Accueil")}
          >
            E-AKA'NJO
          </Link>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
            rerum commodi omnis dolorum aliquam at distinctio illum veniam et
            praesentium in voluptatum totam aut recusandae, voluptatem eaque
            debitis officiis perspiciatis.
          </p>
        </div>

        <div className="grid grid-cols-2">
          <div className="space-y-3">
            <div className="lg:text-3xl text-2xl">Liens</div>
            <div className="grid">
              {routeLinks.map((link) => (
                <Link
                  key={link.text}
                  to={link.href}
                  onClick={() => setFocus(link.text)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="lg:text-3xl text-2xl">Se mettre en contact</div>
            <ul>
              <li>+261 33 63 956 29</li>
              <li>eakanjo@contact.com</li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="text-secondText mt-5 mb-5" />
      <p className="text-center">
        Copyright 2025 eaka'njo.com - Tout droit réservé
      </p>
    </footer>
  );
};

export default Footer;
