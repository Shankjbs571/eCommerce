import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosConfig';

// Thunk for placing an order
export const placeOrder = createAsyncThunk('order/placeOrder', async (orderData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/order/placeOrder', orderData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for fetching all orders for the admin
export const fetchAllOrdersAdmin = createAsyncThunk('order/fetchAllOrdersAdmin', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/order/getAllOrdersAdmin');
    return response.data.data;  // Assuming the API returns orders under `data.data`
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk for fetching orders for a specific user
export const fetchOrders = createAsyncThunk('order/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/order/getAllOrders');
    return response.data.data;  // Assuming the API returns orders under `data.data`
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    adminOrders: [],  // State to store orders fetched by admin
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;  // Populate the orders state
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAllOrdersAdmin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.adminOrders = action.payload;  // Populate the adminOrders state
      })
      .addCase(fetchAllOrdersAdmin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
