const path = require('path');
const orderModel = require('../../models/orderModel');
const Payment = require('../../models/paymentModel');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder =
      await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      order: razorpayOrder,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      orderData,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
        "|" +
        razorpay_payment_id
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const createdOrder = await orderModel.create({
      user: req.user._id,
      items: orderData.items,
      address: orderData.address,
      phoneNO: orderData.phoneNO,
      totalPrice: orderData.totalPrice,
    });

    await Payment.create({
      orderId: createdOrder._id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      totalPrice: orderData.totalPrice,
      status: "completed",
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified",
      order: createdOrder,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    createRazorpayOrder,
    verifyPayment,
}