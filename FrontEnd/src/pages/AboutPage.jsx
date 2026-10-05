import React, { useEffect } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import Other from "../components/Other";
import clientContext from "../appContext/clientContext";

const AboutPage = () => {
  const { about_img } = assets;
  const { setFocus } = clientContext();
  useEffect(() => {
    setFocus("A propos");
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-6 mt-10">
        <div className="lg:mt-18">
          <div>
            <img src={about_img} className="w-full object-cover" />
          </div>
          <div className="spacing">
            <h3>
              <span className="text-secondText">Pourquoi </span> nous choisir ?
              ~~~~~~
            </h3>
          </div>
        </div>
        <div>
          <h2 className="lg:ml-8">
            <span className="text-secondText">A propos</span> de nous ~~~~~~
          </h2>
          <div className="flex flex-col space-y-5 mt-6 lg:mt-30">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sed
              eos voluptas sint necessitatibus quisquam iure? Harum dolore ipsa
              reprehenderit, architecto ducimus iure quibusdam, quas facere enim
              minus voluptatum vitae!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sed
              eos voluptas sint necessitatibus quisquam iure? Harum dolore ipsa
              reprehenderit, architecto ducimus iure quibusdam, quas facere enim
              minus voluptatum vitae!
            </p>
            <div>
              <h3>Notre objectif</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                sed eos voluptas sint necessitatibus quisquam iure? Harum dolore
                ipsa reprehenderit, architecto ducimus iure quibusdam, quas
                facere enim minus voluptatum vitae!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 mt-8">
        <div className="border border-secondText py-4 px-6">
          <h4 className="text-xl">Qualité d'assurance</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            illo, magnam earum fugiat ad sint consequatur quod autem culpa
          </p>
        </div>
        <div className="border border-secondText py-4 px-6">
          <h4 className="text-xl">Qualité d'assurance</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            illo, magnam earum fugiat ad sint consequatur quod autem culpa
          </p>
        </div>
        <div className="border border-secondText py-4 px-6">
          <h4 className="text-xl">Qualité d'assurance</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            illo, magnam earum fugiat ad sint consequatur quod autem culpa
          </p>
        </div>
      </div>
      <Other />
    </div>
  );
};

export default AboutPage;
