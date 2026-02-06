import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosordersapi from '../../api/axiosordersapi.jsx';

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosordersapi.get('/my');
      return response.data.orders || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchAdminOrders = createAsyncThunk(
  'orders/fetchAdminOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosordersapi.get('/admin');
      return response.data.orders || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderPayload, { rejectWithValue }) => {
    try {
      const response = await axiosordersapi.post('/', orderPayload);
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      await axiosordersapi.delete(`/${orderId}`);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle', 
    error: null,
    createStatus: 'idle',
    deleteStatus: 'idle',
  },
  reducers: {   
      
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMyOrders.pending, (state) => {
            state.status = 'loading';
            state.error = null;

        })
        .addCase(fetchMyOrders.fulfilled, (state, action) => {
            state.status = 'succeeded';
        
            state.orders = action.payload;
        })

        .addCase(fetchMyOrders.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });

        builder
        .addCase(fetchAdminOrders.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchAdminOrders.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orders = action.payload;
        })
        .addCase(fetchAdminOrders.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });

        builder
        .addCase(createOrder.pending, (state) => {
          state.createStatus = 'loading';
          state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.createStatus = 'succeeded';
          if (action.payload) {
            state.orders = [action.payload, ...state.orders];
          }
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.createStatus = 'failed';
          state.error = action.payload;
        });

        builder
        .addCase(deleteOrder.pending, (state) => {
          state.deleteStatus = 'loading';
          state.error = null;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
          state.deleteStatus = 'succeeded';
          state.orders = state.orders.filter((order) => order._id !== action.payload);
        })
        .addCase(deleteOrder.rejected, (state, action) => {
          state.deleteStatus = 'failed';
          state.error = action.payload;
        });
    },
}); 
export default orderSlice.reducer;


            