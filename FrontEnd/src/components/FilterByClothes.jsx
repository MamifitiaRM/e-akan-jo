import React from "react";
import { clothesTypes } from "../utils/utility";
import useProductStore from "../stores/useProductStore";

const FilterByClothes = () => {
  const { setProductForCollections, product, clothesFilter, setClothesFilter } =
    useProductStore();

  const handleFilter = (type) => {
    if (clothesFilter == type) {
      setClothesFilter("");
      return setProductForCollections(product);
    }
    setClothesFilter(type);
  };

  return (
    <div className="border border-secondText py-4 px-6 space-y-2">
      <div className="link">Types de vetements</div>
      <div className="flex flex-col space-y-2">
        {clothesTypes.map((type) => (
          <div className="flex gap-2" key={type}>
            <input
              type="checkbox"
              id={type}
              className="rounded-sm cursor-pointer accent-black"
              onChange={() => handleFilter(type)}
              checked={clothesFilter == type}
            />
            <label htmlFor={type} className="cursor-pointer">
              {type}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterByClothes;
