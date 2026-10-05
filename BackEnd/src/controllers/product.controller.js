import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, size } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const parsedSize = typeof size === "string" ? JSON.parse(size) : size;

    if (
      !name ||
      !description ||
      !price ||
      images.length === 0 ||
      !subCategory ||
      !category ||
      !parsedSize ||
      parsedSize.length === 0
    ) {
      images.forEach((image) => fs.unlink(image.path, () => {}));
      return res.json({
        status: false,
        message: "Veuillez compléter tous les champs obligatoires avant de valider",
      });
    }

    const imageUrl = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        fs.unlink(image.path, () => {});
        return result.secure_url;
      })
    );

    const newProduct = await Product.create({
      name,
      description,
      price,
      image: imageUrl,
      category,
      subCategory,
      size: parsedSize,
      date: Date.now(),
    });

    res.json({ status: true, newProduct });
  } catch (error) {
    console.log("Il y a eu une erreur dans la controlleur addProduct " + error);
    res.json({ status: false, error: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ status: true, products });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans la controlleur getAllProduct " + error
    );
    res.json({ status: false, error: error.message });
  }
};

export const getSpecificProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.json({ status: true, product });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans la controlleur getSpecificProduct " + error
    );
    res.json({ status: false, error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    res.json({ status: true, product });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans la controlleur deleteProduct " + error
    );
    res.json({ status: false, error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const product = await Product.findByIdAndUpdate(productId, productData, {
      new: true,
    });
    res.json({ status: true, product });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans la controlleur updateProduct " + error
    );
    res.json({ status: false, error: error.message });
  }
};
