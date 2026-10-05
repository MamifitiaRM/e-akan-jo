import express from "express";
import {
  addProductCart,
  getAllProductCart,
  removeProductCart,
  updateProductCart,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const route = express.Router();

route.get("/getAllCart", protectRoute, getAllProductCart);
route.post("/addCart", protectRoute, addProductCart);
route.delete("/removeCart", protectRoute, removeProductCart);
route.put("/updateCart/:productId", protectRoute, updateProductCart);

export default route;
