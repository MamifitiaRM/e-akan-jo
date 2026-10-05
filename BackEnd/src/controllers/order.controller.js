import Stripe from "stripe";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const DELIVERY_FEE = 2000;

const buildOrderProducts = async (cart) => {
  const productIds = cart.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });

  return cart.map((item) => {
    const product = products.find(
      (p) => p._id.toString() === item.product.toString()
    );
    return {
      product: item.product,
      quantity: item.quantity,
      price: product.price,
    };
  });
};

const computeSubtotal = (orderProducts) =>
  orderProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

const isAddressValid = (address) =>
  address?.fullName && address?.phone && address?.street && address?.city;

export const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const { address } = req.body;

    if (!user.cart.length) {
      return res.json({ status: false, message: "Votre carte est vide" });
    }
    if (!isAddressValid(address)) {
      return res.json({
        status: false,
        message: "Veuillez compléter l'adresse de livraison",
      });
    }

    const orderProducts = await buildOrderProducts(user.cart);
    const totalAmount = computeSubtotal(orderProducts) + DELIVERY_FEE;

    const order = await Order.create({
      user: user._id,
      products: orderProducts,
      address,
      deliveryFee: DELIVERY_FEE,
      totalAmount,
      paymentMethod: "cod",
      paymentStatus: "en_attente",
      status: "en_attente",
    });

    user.cart = [];
    await user.save();

    res.json({ status: true, order });
  } catch (error) {
    console.log("Il y a eu une erreur dans le controller createOrder " + error);
    res.json({ status: false, error: error.message });
  }
};

export const createCheckoutSession = async (req, res) => {
  try {
    const user = req.user;
    const { address } = req.body;

    if (!user.cart.length) {
      return res.json({ status: false, message: "Votre carte est vide" });
    }
    if (!isAddressValid(address)) {
      return res.json({
        status: false,
        message: "Veuillez compléter l'adresse de livraison",
      });
    }

    const orderProducts = await buildOrderProducts(user.cart);
    const totalAmount = computeSubtotal(orderProducts) + DELIVERY_FEE;

    const order = await Order.create({
      user: user._id,
      products: orderProducts,
      address,
      deliveryFee: DELIVERY_FEE,
      totalAmount,
      paymentMethod: "stripe",
      paymentStatus: "en_attente",
      status: "en_attente",
    });

    const products = await Product.find({
      _id: { $in: orderProducts.map((item) => item.product) },
    });

    const lineItems = orderProducts.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.product.toString()
      );
      return {
        price_data: {
          currency: "mga",
          product_data: { name: product.name },
          unit_amount: Math.round(item.price),
        },
        quantity: item.quantity,
      };
    });

    lineItems.push({
      price_data: {
        currency: "mga",
        product_data: { name: "Frais de livraison" },
        unit_amount: DELIVERY_FEE,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/place-order`,
      metadata: { orderId: order._id.toString() },
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.json({ status: true, url: session.url });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller createCheckoutSession " + error
    );
    res.json({ status: false, error: error.message });
  }
};

export const verifyCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const order = await Order.findOne({ stripeSessionId: sessionId });
    if (!order) {
      return res.json({ status: false, message: "Commande introuvable" });
    }
    if (order.user.toString() !== req.user._id.toString()) {
      return res.json({ status: false, message: "Accès refusé" });
    }

    if (session.payment_status === "paid" && order.paymentStatus !== "paye") {
      order.paymentStatus = "paye";
      await order.save();

      const user = await User.findById(order.user);
      user.cart = [];
      await user.save();
    }

    res.json({
      status: true,
      order,
      paid: session.payment_status === "paid",
    });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller verifyCheckoutSession " + error
    );
    res.json({ status: false, error: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });
    res.json({ status: true, orders });
  } catch (error) {
    console.log("Il y a eu une erreur dans le controller getMyOrders " + error);
    res.json({ status: false, error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product")
      .sort({ createdAt: -1 });
    res.json({ status: true, orders });
  } catch (error) {
    console.log("Il y a eu une erreur dans le controller getAllOrders " + error);
    res.json({ status: false, error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json({ status: true, order });
  } catch (error) {
    console.log(
      "Il y a eu une erreur dans le controller updateOrderStatus " + error
    );
    res.json({ status: false, error: error.message });
  }
};
