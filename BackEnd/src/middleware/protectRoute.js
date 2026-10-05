import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

import { config } from "dotenv";

config();

export const protectRoute = async (req, res, next) => {
  const myToken = req.cookies.myToken;
  if (!myToken) {
    return res.json({
      status: false,
      message: "Acces interdit - Pas de token",
    });
  }
  try {
    const decode = jwt.verify(myToken, process.env.SECRET_ACCESS);
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.json({ status: false, message: "Pas d'utilisateur" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le middleware protectRoute " + error
    );
    return res.json({ status: false, message: "Session invalide" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.json({ message: "Access refusé - Admin seulement" });
  }
};
