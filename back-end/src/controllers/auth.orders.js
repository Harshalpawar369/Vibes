const orderModel = require("../../models/orderModel");

async function createOrder(req, res) {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized: missing user session" });
    }

    const { quantity, address, tottalPrice, totalPrice, item, items, phoneNO } = req.body;
    const resolvedPhoneNo = phoneNO ?? req.user?.contactNo;
    const resolvedTotalPrice = tottalPrice ?? totalPrice;

    const resolvedItems = Array.isArray(items)
      ? items
      : [
          {
            items: item,
            quantity: quantity,
          },
        ];

    if (!address || !resolvedPhoneNo || !resolvedTotalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = await orderModel.create({
      user: req.user._id,
      items: resolvedItems,
      address: address,
      phoneNO: resolvedPhoneNo,
      totalPrice: resolvedTotalPrice,
    });

    res.status(201).json({
      message: "Order successfully",
      order: newOrder,
    });

  } catch (error) {
    console.error("createOrder error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message || "Unknown error",
    });
  }
}

async function getMyOrders(req, res) {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized: missing user session" });
    }

    const orders = await orderModel
      .find({ user: req.user._id })
      .populate("items.items")
      .exec();
    res.status(200).json({ orders });
  } catch (error) {
    console.error("getMyOrders error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message || "Unknown error",
    });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await orderModel.find().populate("items.items").exec();
    res.status(200).json({ orders });
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error?.message || "Unknown error",
    });
  }
}

async function markDelivered(req, res) {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isDelivered = true;
    order.deliveredAt = new Date();
    await order.save();

    return res.status(200).json({ message: "Order delivered", order });
  } catch (error) {
    console.error("markDelivered error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error?.message || "Unknown error",
    });
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.role === "user" && String(order.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await order.deleteOne();
    return res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.error("deleteOrder error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error?.message || "Unknown error",
    });
  }
}

module.exports = { createOrder, getMyOrders, getAllOrders, markDelivered, deleteOrder };

