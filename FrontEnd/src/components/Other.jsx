import React from "react";
import { assets } from "../../assets/frontend_assets/assets";

const Other = () => {
  const { exchange_icon, quality_icon, support_img } = assets;

  return (
    <div className="spacing space-y-16 text-center">
      <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 text-center">
        <div>
          <img src={exchange_icon} className="w-[70px] mx-auto mb-4" />
          <div className="font-bold">Easy exchange Policy</div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum porro
            modi neque voluptatem, explicabo autem,{" "}
          </p>
        </div>
        <div>
          <img src={quality_icon} className="w-[70px] mx-auto mb-4" />
          <div className="font-bold">Easy exchange Policy</div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum porro
            modi neque voluptatem, explicabo autem,{" "}
          </p>
        </div>
        <div>
          <img src={support_img} className="w-[70px] mx-auto mb-4" />
          <div className="font-bold">Easy exchange Policy</div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum porro
            modi neque voluptatem, explicabo autem,{" "}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <h4>S'abonner pour ne rien rater</h4>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet quam
          autem harum illum dolorum! Tempore explicabo magni velit
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center px-4">
          <input
            placeholder="Entrer votre adresse email"
            className="px-6 placeholder:text-secondText py-3 border border-secondText w-full max-w-150"
          />
          <button className="bg-black text-white uppercase py-3.5 px-4 text-[16px] cursor-pointer w-full sm:w-auto">
            S'abonner
          </button>
        </div>
      </div>
    </div>
  );
};

export default Other;
