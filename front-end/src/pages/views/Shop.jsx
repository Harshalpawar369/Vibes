import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

function Shop({ isLoggedIn, user }) {
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (status === "idle" || status === "loading") {
    return <p className="text-center mt-20">Vibe is Loading...</p>;
  }

  const filteredProducts =
    items && items.length > 0
      ? items.filter((item) => {
          const matchCategory =
            selectedCategory === "All" ||
            item.itemCategory?.toLowerCase() === selectedCategory.toLowerCase();

          const matchSearch = item.brandName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase());

          return matchCategory && matchSearch;
        })
      : [];

  return (
    <>
      {isLoggedIn && user ? (
        <div className="w-full h-screen overflow-x-hidden bg-white text-black">
          <div className="mt-[18vh] flex justify-center">
            <input
              type="text"
              placeholder="Search your vibe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-4 border-black px-4 py-2 w-1/2 font-bold"
            />
          </div>
          <div className=" flex flex-wrap gap-4 mb-12 ">
            <div className="w-full font-semibold font-[poppins] px-10 text-2xl flex flex-wrap items-center justify-around mt-[20vh]">
              {["All", "Male", "Women", "accessories"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{
                    x: 4,
                    y: 4,
                    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  animate={{
                    backgroundColor:
                      selectedCategory === item ? "#FFFFFF" : "#10b981",
                    transition: { duration: 0.5 },
                  }}
                  onClick={() => setSelectedCategory(item)}
                  className={`px-[2rem] text-[1.3vmax] border-4 border-black font-semibold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-2 `}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 mb-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -10 }}
                  className="border-4 border-black p-4 rounded-xl funky-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.brandName}
                    className="h-64 w-full object-cover mb-4"
                  />
                  <h3 className="font-black uppercase">{item.brandName}</h3>
                  <p className="text-xl font-bold">${item.price}</p>
                  {cartItems?.some((cartItem) => cartItem._id === item._id) ? (
                    <motion.button
                      whileHover={{
                        x: 4,
                        y: 4,
                        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-full bg-white text-zinc-900 border-4 border-zinc-950 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold py-2 text-md"
                      disabled
                    >
                      Ordered
                    </motion.button>
                  ) : (
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
                      className="w-full bg-emerald-400 border-4 border-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold py-2 text-md"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      Shop Now
                    </motion.button>
                  )}
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center font-bold text-xl">
                No products match your vibe 😶
              </p>
            )}
          </div>
          <Footer />
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-black font-[poppins]">
          <h1 className="text-3xl font-bold mb-4">Please Log In to Shop</h1>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 0px 0px black",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              navigate("/vibe/login");
            }}
            className="bg-emerald-400 border-4 border-black px-4 py-2 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-lg"
          >
            Log In
          </motion.button>
        </div>
      )}
    </>
  );
}

export default Shop;
