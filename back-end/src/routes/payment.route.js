const express = require("express");
const { createRazorpayOrder, verifyPayment } = require("../controllers/paymentController");


const { authRoleMiddleware, requireUser } = require("../middlewares/user.middleware.js");

const router = express.Router();



router.post(
  "/create-order",
  authRoleMiddleware,
  requireUser,
  createRazorpayOrder
);

router.post(
  "/verify",
  authRoleMiddleware,
  requireUser,
  verifyPayment
);

module.exports = router;