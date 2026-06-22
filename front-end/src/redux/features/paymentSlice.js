import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiospaymentapi from "../../api/axiosPaymentapi.jsx";


export const createPaymentOrder = createAsyncThunk(
  "payment/createPaymentOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await axiospaymentapi.post(
        "/create-order",
        { amount }
      );

      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);


export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axiospaymentapi.post(
        "/verify",
        paymentData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",

  initialState: {
    razorpayOrder: null,

    paymentResult: null,

    createOrderStatus: "idle",
    verifyStatus: "idle",

    error: null,
  },

  reducers: {
    clearPaymentState: (state) => {
      state.razorpayOrder = null;
      state.paymentResult = null;
      state.createOrderStatus = "idle";
      state.verifyStatus = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createPaymentOrder.pending, (state) => {
        state.createOrderStatus = "loading";
        state.error = null;
      })

      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.createOrderStatus = "succeeded";
        state.razorpayOrder = action.payload;
      })

      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.createOrderStatus = "failed";
        state.error = action.payload;
      })


      .addCase(verifyPayment.pending, (state) => {
        state.verifyStatus = "loading";
        state.error = null;
      })

      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verifyStatus = "succeeded";
        state.paymentResult = action.payload;
      })

      .addCase(verifyPayment.rejected, (state, action) => {
        state.verifyStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } =
  paymentSlice.actions;

export default paymentSlice.reducer;