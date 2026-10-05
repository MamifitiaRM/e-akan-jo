import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    address: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      additionalInfo: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "stripe"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["en_attente", "paye", "echoue"],
      default: "en_attente",
    },
    status: {
      type: String,
      enum: ["en_attente", "en_preparation", "en_livraison", "livre", "annule"],
      default: "en_attente",
    },
    stripeSessionId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
