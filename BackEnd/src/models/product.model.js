import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    enum: ["Hommes", "Femmes", "Enfants"],
    required: true,
  },
  subCategory: {
    type: String,
    enum: [
      "Haut",
      "Bas",
      "Sous-vetements",
      "Tenu Formel",
      "Maillot de bain",
      "Tenu d'hiver",
      "Sport",
    ],
    required: true,
  },
  size: {
    type: Array,
    // enum: ["S", "M", "L", "XL", "2XL"],
    required: true,
  },
  bestSellerAmount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Number,
    required: true,
  },
});

const Product =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Product;
