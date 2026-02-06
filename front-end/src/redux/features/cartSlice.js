import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload; 
      const existingItem = state.cartItems.find((item) => item._id === newItem._id);
      
      state.totalQuantity++;
      
      if (!existingItem) {
        
        state.cartItems.push({
          _id: newItem._id,
          price: newItem.price,
          quantity: 1,
          totalItemPrice: newItem.price,
          name: newItem.name ?? newItem.brandName,
          image: newItem.image
        });
      } else {
        existingItem.quantity++;
        existingItem.totalItemPrice += newItem.price;
      }
      
      state.totalAmount += newItem.price;
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);
      
      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;

        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item._id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalItemPrice -= existingItem.price;
        }
      }
    },

    clearCart(state) {
      return initialState;
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;


export default cartSlice.reducer;