import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice.js";
import searchReducer from "./features/searchSlice.js";
import orderReducer from "./features/orderSlice.js";
import cartReducer from "./features/cartSlice.js";

const CART_STORAGE_KEY = "vibes_cart";

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    if (!serializedState) return undefined;
    const parsed = JSON.parse(serializedState);
    if (!parsed || typeof parsed !== "object") return undefined;
    return parsed;
  } catch {
    return undefined;
  }
};

const saveCartState = (cartState) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch {
    // Ignore write errors (e.g., storage full, private mode)
  }
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    search: searchReducer,
    orders: orderReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartState(),
  },
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});
