import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2, MapPin } from "lucide-react";
import useCartStore from "../stores/useCartStore";
import useOrderStore from "../stores/useOrderStore";
import useUserStore from "../stores/useUserStore";
import DeliveryMap from "../components/DeliveryMap";
import clientContext from "../appContext/clientContext";
import { DELIVERY_FEE } from "../utils/utility";
import { assets } from "../../assets/frontend_assets/assets";

const PayementPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { cart, total } = useCartStore();
  const { placeOrderCod, placeOrderStripe, loading } = useOrderStore();
  const { setFocus } = clientContext();

  useEffect(() => {
    setFocus("");
  }, []);

  useEffect(() => {
    if (!user || cart.length === 0) {
      navigate("/cart");
    }
  }, [user, cart, navigate]);

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: "",
    street: "",
    city: "",
    additionalInfo: "",
    latitude: null,
    longitude: null,
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleChange = (field) => (e) =>
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  const handleMapSelect = async (latlng) => {
    setAddress((prev) => ({
      ...prev,
      latitude: latlng.lat,
      longitude: latlng.lng,
    }));

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`
      );
      const data = await res.json();
      setAddress((prev) => ({
        ...prev,
        street:
          prev.street ||
          [data.address?.road, data.address?.house_number]
            .filter(Boolean)
            .join(" "),
        city:
          prev.city ||
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          "",
      }));
    } catch {
      // Géocodage indisponible, l'utilisateur complète l'adresse manuellement
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.fullName || !address.phone || !address.street || !address.city) {
      return toast.error("Veuillez compléter les champs obligatoires");
    }
    if (!address.latitude || !address.longitude) {
      return toast.error(
        "Veuillez sélectionner votre position de livraison sur la carte"
      );
    }

    if (paymentMethod === "cod") {
      const order = await placeOrderCod(address);
      if (order) navigate("/my-orders");
    } else {
      await placeOrderStripe(address);
    }
  };

  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 pb-10">
      <div>
        <h2 className="mb-8">
          <span className="text-secondText">Information</span> de livraison
          ~~~~~~
        </h2>
        <form className="grid space-y-3" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Nom complet *"
              value={address.fullName}
              onChange={handleChange("fullName")}
            />
            <input
              type="tel"
              className="pl-3 py-2 w-full"
              placeholder="Numéro de téléphone *"
              value={address.phone}
              onChange={handleChange("phone")}
            />
          </div>
          <div>
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Rue *"
              value={address.street}
              onChange={handleChange("street")}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Ville *"
              value={address.city}
              onChange={handleChange("city")}
            />
            <input
              type="text"
              className="pl-3 py-2 w-full"
              placeholder="Lot / complément d'adresse"
              value={address.additionalInfo}
              onChange={handleChange("additionalInfo")}
            />
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-sm text-secondText">
              <MapPin size={18} />
              Cliquez sur la carte pour indiquer le point de livraison *
            </div>
            <DeliveryMap
              position={
                address.latitude
                  ? { lat: address.latitude, lng: address.longitude }
                  : null
              }
              onSelect={handleMapSelect}
            />
          </div>

          <div className="mt-8 space-y-3">
            <h3 className="pb-2">
              <span className="text-secondText">Méthode</span> de payement
              ~~~~~~
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <div
                className={`border-2 flex items-center gap-3 px-4 py-3 cursor-pointer ${
                  paymentMethod === "cod" ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <input
                  type="radio"
                  className="accent-green-600 cursor-pointer"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label className="cursor-pointer">Payer à la livraison</label>
              </div>
              <div
                className={`border-2 flex items-center gap-3 px-4 py-3 cursor-pointer ${
                  paymentMethod === "stripe" ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setPaymentMethod("stripe")}
              >
                <input
                  type="radio"
                  className="accent-green-600 cursor-pointer"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
                <label className="cursor-pointer flex items-center gap-2">
                  Payer par carte
                  <img src={assets.stripe_logo} className="h-4" />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-black py-2.5 px-3 cursor-pointer hover:scale-105 duration-300 ease-in-out my-2 disabled:opacity-60"
            >
              <div className="flex gap-3 items-center">
                {loading && <Loader2 className="animate-spin" size={20} />}
                Placer la commande
              </div>
            </button>
          </div>
        </form>
      </div>

      <div className="lg:ml-auto w-full lg:max-w-sm space-y-3 h-fit border-2 border-gray-200 p-6">
        <h2>Totals ~~~~~~</h2>
        <hr />
        <div className="flex justify-between">
          <p>Sous-total</p>
          <div>Ariary {total}</div>
        </div>
        <div className="flex justify-between">
          <p>Frais de livraison</p>
          <div>Ariary {DELIVERY_FEE}</div>
        </div>
        <hr />
        <div className="flex justify-between font-bold">
          <p>Total</p>
          <div>Ariary {total + DELIVERY_FEE}</div>
        </div>
      </div>
    </div>
  );
};

export default PayementPage;
