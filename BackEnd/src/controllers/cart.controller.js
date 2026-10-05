import Product from "../models/product.model.js";

export const getAllProductCart = async (req, res) => {
  try {
    const user = req.user;
    const productIds = user.cart.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const cartItems = products.map((product) => {
      const item = user.cart.find(
        (cartItem) => cartItem.product.toString() === product._id.toString()
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.json({ status: true, cart: cartItems });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller getAllProductCart " + error
    );
    res.json({ status: false, error: error.message });
  }
};

export const addProductCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }
    await user.save();
    res.json({ status: true, cart: user.cart });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller addProductCart " + error
    );
    res.json({ status: false, error: error.message });
  }
};

export const removeProductCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cart = [];
    } else {
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId
      );
    }
    await user.save();
    res.json({ status: true, cart: user.cart });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller removeProductCart " + error
    );
    res.json({ status: false, error: error.message });
  }
};

export const updateProductCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!existingItem) {
      return res.json({
        status: false,
        message: "Produit non trouvé dans la carte",
      });
    }

    if (quantity <= 0) {
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId
      );
    } else {
      existingItem.quantity = quantity;
    }
    await user.save();
    res.json({ status: true, cart: user.cart });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller updateProductCart " + error
    );
    res.json({ status: false, error: error.message });
  }
};
