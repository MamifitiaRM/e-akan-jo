import React, { useState } from "react";
import { Loader2, LucidePackageX, Trash2Icon } from "lucide-react";
import useProductStore from "../stores/useProductStore";

const ListProducts = () => {
  const { product, deleteProduct, loading } = useProductStore();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleDelete = (productId) => {
    if (window.confirm("Vous voulez vraiment supprimer ce produit ?")) {
      deleteProduct(productId);
    }
  };

  const filteredProducts = product
    ?.filter((item) =>
      categoryFilter ? item.category === categoryFilter : true
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-gray-300" />
      </div>
    );
  }

  if (!product || product.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center space-y-4">
        <LucidePackageX size={100} className="mt-55" />
        <h2 className="font-semibold">Vous n'avez pas de produit</h2>
      </div>
    );
  }

  return (
    <aside className="py-6 px-8 space-y-3">
      <header className="flex flex-wrap items-center justify-end gap-3">
        <h5 className="font-light text-xl">Filtrer par catégiorie</h5>
        <select
          className="py-2 px-3 w-43 border-gray-400 border-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Toutes</option>
          <option value="Hommes">Hommes</option>
          <option value="Femmes">Femmes</option>
          <option value="Enfants">Enfants</option>
        </select>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          className="py-2 px-4 border-gray-400 border-2 w-full sm:w-80"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </header>
      <h5 className="font-light text-xl">Tous les produits</h5>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 ">
          <thead className="bg-gray-300 mb-2">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product) => (
              <tr className="border-2 border-gray-400" key={product._id}>
                <td className="px-5 py-2 whitespace-nowrap w-20">
                  <img src={product.image[0]} className="h-14 w-14 object-cover" />
                </td>
                <td className="px-6 py-2 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  {product.category}
                </td>
                <td className="px-6 py-2 whitespace-nowrap">{product.price}</td>
                <td className="px-6 py-6 whitespace-nowrap flex justify-center">
                  <Trash2Icon
                    className="text-red-600 cursor-pointer hover:scale-110"
                    size={23}
                    onClick={() => handleDelete(product._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
};

export default ListProducts;
