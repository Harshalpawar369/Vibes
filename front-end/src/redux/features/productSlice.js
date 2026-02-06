import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiositemsapi from '../../api/axiositemsapi.jsx';


export const fetchAllItems = createAsyncThunk(
  'products/fetchAllItems', async () => {
    try {
      const response = await axiositemsapi.get('/');
      return response.data; 
    } catch (error) {
    
      console.log('Error fetching items:', error);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', 
    error: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchAllItems.pending, (state) => {
        state.status = 'loading';
      })
      
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;