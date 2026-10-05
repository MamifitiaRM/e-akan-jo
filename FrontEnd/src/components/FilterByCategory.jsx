import { useEffect } from "react";
import useProductStore from "../stores/useProductStore";
import { clothesTypes } from "../utils/utility";

const FilterByCategory = () => {
  const {
    setProductForCollections,
    product,
    categoryFilter,
    setCategoryFilter,
    clothesFilter,
  } = useProductStore();

  // LES FILTRES
  useEffect(() => {
    if (!categoryFilter.men && !categoryFilter.women && !categoryFilter.kids) {
      setProductForCollections(product);
    }
    // premier filtres seulement
    if (categoryFilter.men && clothesFilter == "") {
      setProductForCollections(
        product.filter((product) => product.category == "Hommes")
      );
    }
    if (categoryFilter.women && clothesFilter == "") {
      setProductForCollections(
        product.filter((product) => product.category == "Femmes")
      );
    }
    if (categoryFilter.kids && clothesFilter == "") {
      setProductForCollections(
        product.filter((product) => product.category == "Enfants")
      );
    }
    // deuxième filtres seulement
    clothesTypes.map((types) => {
      if (clothesFilter == types) {
        setProductForCollections(
          product.filter((product) => product.subCategory == types)
        );
      }
    });

    // Les deux filtres appliqué en même temps
    clothesTypes.map((types) => {
      if (categoryFilter.men && clothesFilter == types) {
        setProductForCollections(
          product.filter(
            (product) =>
              product.category == "Hommes" && product.subCategory == types
          )
        );
      }
      if (categoryFilter.women && clothesFilter == types) {
        setProductForCollections(
          product.filter(
            (product) =>
              product.category == "Femmes" && product.subCategory == types
          )
        );
      }
      if (categoryFilter.kids && clothesFilter == types) {
        setProductForCollections(
          product.filter(
            (product) =>
              product.category == "Enfants" && product.subCategory == types
          )
        );
      }
    });
  }, [categoryFilter, clothesFilter]);

  return (
    <div className="border border-secondText py-4 px-6 space-y-2 mb-6">
      <div className="link">Categories</div>
      <div className="flex flex-col space-y-2">
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="men"
            className="rounded-sm cursor-pointer accent-black"
            onChange={() =>
              setCategoryFilter({
                ...categoryFilter,
                women: false,
                kids: false,
                men: categoryFilter.men == false ? true : false,
              })
            }
            checked={categoryFilter.men}
          />
          <label htmlFor="men" className="cursor-pointer">
            Homme
          </label>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="women"
            className="rounded-sm cursor-pointer accent-black"
            onChange={() =>
              setCategoryFilter({
                ...categoryFilter,
                men: false,
                kids: false,
                women: categoryFilter.women == false ? true : false,
              })
            }
            checked={categoryFilter.women}
          />
          <label htmlFor="women" className="cursor-pointer">
            Femme
          </label>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="kids"
            className="rounded-sm cursor-pointer accent-black"
            onChange={() =>
              setCategoryFilter({
                ...categoryFilter,
                men: false,
                women: false,
                kids: categoryFilter.kids == false ? true : false,
              })
            }
            checked={categoryFilter.kids}
          />
          <label htmlFor="kids" className="cursor-pointer">
            Enfant
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterByCategory;
