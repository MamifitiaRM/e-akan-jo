import React, { useEffect } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import clientContext from "../appContext/clientContext";

const ContactPage = () => {
  const { contact_img } = assets;
  const { setFocus } = clientContext();
  useEffect(() => {
    setFocus("Contact");
  }, []);
  return (
    <div className="flex flex-col mt-10 items-center mb-10">
      <h2 className="mb-8 text-center">
        <span className="text-secondText">Pour nous </span> Contacter~~~~~~
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 spacing lg:mx-40 gap-10 items-center">
        <img src={contact_img} className="w-full object-cover" />
        <div className="flex flex-col space-y-4">
          <h4>Notre magasin</h4>
          <div>
            <p>Rue blabla Antsirabe I</p>
            <p>Box 110, Antsenakely </p>
          </div>

          <div>
            <p>Tel: +261 33 63 965 29</p>
            <p>Email: mamyratianalison@gmail.com</p>
          </div>

          <h4>Vous voulez collaborer avec nous ?</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
            obcaecati vel minima suscipit natus iste beatae! Est quidem maiores
          </p>
          <button className="border-secondText text-black border py-2.5 cursor-pointer hover:scale-105 duration-300 ease-in-out">
            Prendre contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
