import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getSpecificProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/protectRoute.js";
import upload from "../middleware/multer.js";

const route = express.Router();

route.post(
  "/add",
  protectRoute,
  adminRoute,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
route.get("/getProducts", getAllProduct);
route.get("/getProduct/:productId", getSpecificProduct);
route.put("/updateProduct/:productId", protectRoute, adminRoute, updateProduct);
route.delete(
  "/deleteProduct/:productId",
  protectRoute,
  adminRoute,
  deleteProduct
);

export default route;
