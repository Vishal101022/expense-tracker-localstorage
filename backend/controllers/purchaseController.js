const Razorpay = require("razorpay");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const dotenv = require("dotenv");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const purchasePremium = async (req, res) => {
  const userId = req.user;
  console.log("userId", userId);
  try {
    const { amount, currency } = req.body;

    const Order = await razorpay.orders.create({
      amount: 20 * 100, // Amount in smallest currency unit
      currency: currency,
    });

    // Save order to the database
    const order = await orderModel.create({
      order_id: Order.id,
      amount: Order.amount,
      status: "pending",
      UserId: userId,
    });

    return res.status(201).json({
      id: Order.id,
      amount: Order.amount,
      currency: Order.currency,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTransactionStatus = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    
    const userId = req.user

  try {
    // Validate the payment signature here
    const isValidSignature = validateWebhookSignature(
      razorpay_order_id + "|" + razorpay_payment_id,
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET
    );

    if (!isValidSignature) {
      return res.status(400).json({ status: "verification_failed" });
    }

    // Find the order and update payment details
    const order = await orderModel.findOne({
      where: { order_id: razorpay_order_id },
    });
      if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.payment_id = razorpay_payment_id;
    order.status = "paid";
    await order.save();

    // Update user's premium status
    const user = await userModel.findOne({ where: { id: userId } });
    user.isPremiumUser = true;
    await user.save();

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  purchasePremium,
  updateTransactionStatus,
};
