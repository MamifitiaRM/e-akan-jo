import { useEffect, useState } from "react";
import Card from "../components/Card";
import useProductStore from "../stores/useProductStore";
import clientContext from "../appContext/clientContext";
import FilterByCategory from "../components/FilterByCategory";
import FilterByClothes from "../components/FilterByClothes";

const CollectionsPage = () => {
  const { productForCollections, setProductForCollections, product } =
    useProductStore();

  const { setFocus } = clientContext();
  useEffect(() => {
    setFocus("Collection");
  }, []);

  // Filtre par prix
  const [priceFilter, setPriceFilter] = useState("");
  useEffect(() => {
    if (priceFilter == "") {
      setProductForCollections(product);
    } else if (priceFilter == "low-price") {
      setProductForCollections(
        productForCollections.slice().sort((a, b) => a.price - b.price)
      );
    } else {
      setProductForCollections(
        productForCollections.slice().sort((a, b) => b.price - a.price)
      );
    }
  }, [priceFilter]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] mt-10 gap-8 lg:gap-12">
      <div>
        <h3 className="mb-8">Filtres</h3>
        <FilterByCategory />

        <FilterByClothes />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8">
          <h3>
            <span className="text-secondText">Toutes</span> les collections
            ~~~~~~
          </h3>
          <div className="flex gap-4 items-center">
            <h5 className="text-[18px]">Filtrer par prix :</h5>
            <select
              className="cursor-pointer border border-secondText px-4"
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="" className="bg-gray-700 text-white">
                Par défaut
              </option>
              <option value="low-price" className="bg-gray-700 text-white">
                Du moins chère
              </option>
              <option value="high-price" className="bg-gray-700 text-white">
                Du plus chère
              </option>
            </select>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 space-y-3">
          {productForCollections?.map((product) => (
            <Card product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
