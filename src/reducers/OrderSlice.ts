/*
import {Order} from "../models/order.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../service/apiService.ts";

const initialState: Order[] = [];


export const saveOrder = createAsyncThunk(
    'order/saveOrder',
    async (order: Order, { rejectWithValue }) => {
        try {
            const response = await api.post('/order/add', order);
            if (response.status !== 201 && response.status !== 200) {
                throw new Error('Failed to save order');
            }
            return response.data; // Ensure data is returned correctly
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const viewOrders = createAsyncThunk(
    'order/viewOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/order/view');
            return response.data; // Ensure data is returned correctly
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // save order
            .addCase(saveOrder.pending, () => {
                console.log("Pending saving order..."); // Proper logging
            })
            .addCase(saveOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    state.push(action.payload);
                    console.log("Order added successfully:", action.payload);
                } else {
                    console.error("Fulfilled but no data returned");
                }
            })
            .addCase(saveOrder.rejected, (_, action) => {
                console.error("Failed to save order:", action.payload);
            })

            // get all orders
            .addCase(viewOrders.pending, () => {
                console.log("Pending viewing orders..."); // Proper logging
            })
            .addCase(viewOrders.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log("Fetched orders:", action.payload);
                    state.splice(0, state.length);
                    state.push(...action.payload);
                } else {
                    console.error("Fulfilled but no data returned");
                }
            })
            .addCase(viewOrders.rejected, (_, action) => {
                console.error("Failed to get orders:", action.payload);
            });
    }
});

export default orderSlice.reducer;*/


/*
import {Order} from "../models/order.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../services/apiService.ts";

const initialState: Order[] = [];


export const saveOrder = createAsyncThunk(
    'order/saveOrder',
    async (order: Order, { rejectWithValue }) => {
        try {
            const response = await api.post('/order/add', order);
            if (response.status !== 201 && response.status !== 200) {
                throw new Error('Failed to save order');
            }
            return response.data; // Ensure data is returned correctly
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const viewOrders = createAsyncThunk(
    'order/viewOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/order/view');
            return response.data; // Ensure data is returned correctly
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // save order
            .addCase(saveOrder.pending, () => {
                console.log("Pending saving order..."); // Proper logging
            })
            .addCase(saveOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    state.push(action.payload);
                    console.log("Order added successfully:", action.payload);
                } else {
                    console.error("Fulfilled but no data returned");
                }
            })
            .addCase(saveOrder.rejected, (_, action) => {
                console.error("Failed to save order:", action.payload);
            })

            // get all orders
            .addCase(viewOrders.pending, () => {
                console.log("Pending viewing orders..."); // Proper logging
            })
            .addCase(viewOrders.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log("Fetched orders:", action.payload);
                    state.splice(0, state.length);
                    state.push(...action.payload);
                } else {
                    console.error("Fulfilled but no data returned");
                }
            })
            .addCase(viewOrders.rejected, (_, action) => {
                console.error("Failed to get orders:", action.payload);
            });
    }
});

export default orderSlice.reducer;*/


import { Order } from "../models/order.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../service/apiService.ts";

// Define the initial state
interface OrderState {
    orders: Order[]; // Array of orders
    loading: boolean; // Loading state
    error: string | null; // Error message
}

const initialState: OrderState = {
    orders: [], // Initialize as an empty array
    loading: false,
    error: null,
};

// Thunk to save an order
export const saveOrder = createAsyncThunk(
    "order/saveOrder",
    async (order: Order, { rejectWithValue }) => {
        try {
            const response = await api.post("/order/add", order);
            if (response.status !== 201 && response.status !== 200) {
                throw new Error("Failed to save order");
            }
            return response.data; // Ensure data is returned correctly
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Thunk to fetch all orders
export const viewOrders = createAsyncThunk(
    "order/viewOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/order/view");
            return response.data; // Ensure data is returned correctly
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Create the slice
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Save order
            .addCase(saveOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("Pending saving order...");
            })
            .addCase(saveOrder.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.orders.push(action.payload); // Add the new order to the orders array
                    console.log("Order added successfully:", action.payload);
                } else {
                    console.error("Fulfilled but no data returned");
                }
            })
            .addCase(saveOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.error("Failed to save order:", action.payload);
            })

            // Get all orders
            .addCase(viewOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("Pending viewing orders...");
            })
            .addCase(viewOrders.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    console.log("Fetched orders:", action.payload);
                    state.orders = action.payload; // Replace the entire orders array with the fetched data
                } else {
                    console.error("Fulfilled but no data returned");
                }
            })
            .addCase(viewOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.error("Failed to get orders:", action.payload);
            });
    },
});

export default orderSlice.reducer;