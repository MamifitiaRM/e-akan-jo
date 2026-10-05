import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (userId) => {
  const myToken = jwt.sign({ userId }, process.env.SECRET_ACCESS, {
    expiresIn: "3d",
  });
  return myToken;
};

const isProduction = process.env.NODE_ENV === "production";

const setCookie = (res, myToken) => {
  res.cookie("myToken", myToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

export const signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!name || !password || !email)
      return res.json({
        status: false,
        message: "Veuillez compléter tout les champs avant de continuer",
      });
    if (password.length < 8)
      return res.json({
        status: false,
        message: "Le mot de passe doit au moins contenir 8 caractères",
      });

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.json({
        status: false,
        message: "Cet adresse email est déjà utilisé par un autre compte",
      });
    }
    const newUser = await User.create({ name, password, email });

    const myToken = generateToken(newUser._id);
    setCookie(res, myToken);

    res.json({
      status: true,
      user: { ...newUser._doc, password: null },
      message: "Utilisateur créer",
    });
  } catch (error) {
    console.log("Il y a eu une erreur dans le controller signup " + error);
    res.json({ status: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({
        status: false,
        message: "Veuillez compléter tout les champs avant de continuer",
      });

    const isUserExist = await User.findOne({ email });

    if (isUserExist && (await isUserExist.comparePassword(password))) {
      const myToken = generateToken(isUserExist._id);
      setCookie(res, myToken);
      return res.json({
        status: true,
        user: { ...isUserExist._doc, password: null },
        message: "Connecté avec success",
      });
    }

    return res.json({
      status: false,
      message: "Email ou mot de passe invalide",
    });
  } catch (error) {
    console.log("Il y a eu une erreur dans le controller login " + error);
    res.json({ status: false, error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("myToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    res.json({ status: true, message: "Utilisatuer déconnecté" });
  } catch (error) {
    console.log("Il y a eu une erreur dans le controller logout " + error);
    res.json({ status: false, error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.json({ status: true, user });
  } catch (error) {
    console.log("Il y a eu une erreur dans le controller getUser " + error);
    res.json({ status: false, error: error.message });
  }
};
