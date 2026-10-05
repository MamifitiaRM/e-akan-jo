import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clientContext from "../appContext/clientContext";
import useUserStore from "../stores/useUserStore";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const { setFocus } = clientContext();
  const { loading, login } = useUserStore();

  useEffect(() => {
    setFocus("");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="h-[38vh] flex flex-col items-center pt-13 space-y-6 mb-10 xl:mb-3">
      <h2>Connexion ~~~~~~</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="text-center">
        <div className="grid gap-3 md:w-120 w-88 mx-auto">
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
          <div className="flex justify-between">
            <Link>Mot de passe oublié ? </Link>
            <Link to="/signup">Créer un compte</Link>
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
              "Se connecter"
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
