import express from "express";
import {
  createOrder,
  createCheckoutSession,
  verifyCheckoutSession,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { adminRoute, protectRoute } from "../middleware/protectRoute.js";

const route = express.Router();

route.post("/create", protectRoute, createOrder);
route.post("/create-checkout-session", protectRoute, createCheckoutSession);
route.get("/verify-session/:sessionId", protectRoute, verifyCheckoutSession);
route.get("/my-orders", protectRoute, getMyOrders);
route.get("/all", protectRoute, adminRoute, getAllOrders);
route.put("/update-status/:orderId", protectRoute, adminRoute, updateOrderStatus);

export default route;
