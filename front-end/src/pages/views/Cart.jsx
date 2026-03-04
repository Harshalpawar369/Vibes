import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/features/cartSlice.js";
import {
  createOrder,
  deleteOrder,
  fetchMyOrders,
} from "../../redux/features/orderSlice.js";

function Cart({ isLoggedIn, user }) {
  const dispatch = useDispatch();
  const { cartItems, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart,
  );
  const { orders, status, createStatus } = useSelector((state) => state.orders);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNO, setPhoneNO] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isLoggedIn && user) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, isLoggedIn, user]);

  const canPlaceOrder = useMemo(() => cartItems.length > 0, [cartItems.length]);

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    setFormError("");

    if (!address.trim() || !phoneNO.trim()) {
      setFormError("Please fill address and phone number.");
      return;
    }

    const payload = {
      items: cartItems.map((item) => ({
        items: item._id,
        quantity: item.quantity,
      })),
      address: address.trim(),
      phoneNO: Number(phoneNO),
      tottalPrice: totalAmount,
    };

    const result = await dispatch(createOrder(payload));
    if (createOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      setShowOrderForm(false);
      setAddress("");
      setPhoneNO("");
    } else {
      setFormError("Unable to place order.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-black font-[poppins]">
      <div className="pt-[18vh] px-6 md:px-12">
        <h1 className="text-3xl font-black mb-6">Your Cart</h1>

        {!isLoggedIn && (
          <div className="border-4 border-black p-4 mb-6 bg-yellow-200 font-semibold rounded-2xl">
            Please log in first to order and see your order history.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className="border-4 border-black p-6 text-center font-semibold rounded-2xl">
                Your cart is empty.
              </div>
            ) : (
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="border-4 border-black p-4 flex flex-col md:flex-row gap-4 rounded-2xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full md:w-40 h-40 object-cover border-2 border-black rounded-2xl"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-black">{item.name}</h2>
                      <p className="font-semibold">Price: ${item.price}</p>
                      <p className="font-semibold">Quantity: {item.quantity}</p>
                      <p className="font-semibold">
                        Total: ${item.totalItemPrice}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{
                        x: 4,
                        y: 4,
                        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="px-3.5  bg-emerald-400 border-4 border-black font-bold uppercase rounded-2xl"
                    >
                      Remove
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <div className="border-4 border-black p-6 h-fit sticky top-[20vh] rounded-2xl">
            <h2 className="text-2xl font-black mb-4">Summary</h2>
            <p className="font-semibold mb-2">Items: {totalQuantity}</p>
            <p className="font-semibold mb-4">Total: ${totalAmount}</p>

            <motion.button
              whileHover={{
                x: 4,
                y: 4,
                boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
              }}
              whileTap={{
                scale: 0.9,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              disabled={!canPlaceOrder || !isLoggedIn}
              onClick={() => setShowOrderForm(true)}
              className="w-full bg-emerald-400 border-4 border-black font-black uppercase py-2 disabled:opacity-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Order Now
            </motion.button>
          </div>
        </div>

        <div className="mt-12 mb-5">
          <h2 className="text-2xl font-black mb-4">Order History</h2>
          {!isLoggedIn ? (
            <div className="border-4 border-black p-6 text-center font-semibold rounded-2xl">
              Please log in to see your orders.
            </div>
          ) : status === "loading" ? (
            <div className="border-4 border-black p-6 text-center font-semibold">
              Loading your orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="border-4 border-black p-6 text-center font-semibold rounded-2xl">
              No orders yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border-4 border-black p-4 rounded-2xl">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <p className="font-bold">Order ID: {order._id}</p>
                      <p className="font-semibold">
                        Total: ${order.totalPrice}
                      </p>
                      <p className="font-semibold">
                        Delivered: {order.isDelivered ? "Yes" : "No"}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{
                        x: 4,
                        y: 4,
                        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      onClick={() => dispatch(deleteOrder(order._id))}
                      className="px-4 py-2 bg-emerald-400 border-4 border-black font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      Cancel Order
                    </motion.button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {order.items?.map((line) => (
                      <div key={line._id} className="border-2 border-black p-2 rounded-2xl">
                        <p className="font-semibold">
                          {line.items?.brandName ?? line.items?.name ?? "Item"}
                        </p>
                        <p className="font-semibold">Qty: {line.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showOrderForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white border-4 border-black p-6 w-full max-w-lg rounded-2xl"
            >
              <h2 className="text-2xl font-black mb-4">Order Details</h2>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block font-bold mb-1">Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border-4 border-black p-2"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNO}
                    onChange={(e) => setPhoneNO(e.target.value)}
                    className="w-full border-4 border-black p-2 "
                  />
                </div>
                {formError && (
                  <p className="text-red-600 font-semibold">{formError}</p>
                )}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{
                      x: 4,
                      y: 4,
                      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    type="submit"
                    disabled={createStatus === "loading"}
                    className="flex-1 bg-emerald-400 border-4 border-black font-bold py-2 uppercase disabled:opacity-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {createStatus === "loading" ? "Placing..." : "Place Order"}
                  </motion.button>
                  <motion.button
                    whileHover={{
                      x: 4,
                      y: 4,
                      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    type="button"
                    onClick={() => setShowOrderForm(false)}
                    className="flex-1 bg-white border-4 border-black font-bold py-2 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Close
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default Cart;
