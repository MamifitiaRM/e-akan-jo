import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const SignupPage = () => {
  const { loading, signup } = useUserStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      return toast.error("Les mot de passe ne sont pas identiques");
    }
    signup(name, email, password);
  };

  return (
    <div className="h-[38vh] flex flex-col items-center pt-10 space-y-6 mb-15 xl:mb-5">
      <h2>S'inscrire ~~~~~~</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="text-center">
        <div className="grid gap-3 md:w-120 w-88 mx-auto">
          <input
            className="px-5 border border-secondText py-2.5"
            placeholder="Nom"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="px-5 border border-secondText py-2.5"
            placeholder="Adresse Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-5 border border-secondText py-2.5"
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="px-5 border border-secondText py-2.5"
            placeholder="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <Link to="/login">Se connecter à un compte</Link>
          </div>
        </div>
        <button
          className="text-white bg-black py-2.5 px-3 cursor-pointer hover:scale-105 duration-300 ease-in-out my-2 "
          type="submit"
        >
          <div className="flex gap-4">
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Chargement...
              </>
            ) : (
              "S'inscrire"
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
