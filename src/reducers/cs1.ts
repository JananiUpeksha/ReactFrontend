import {Customer} from "../models/Customer.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState: Customer[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const saveCustomer = createAsyncThunk(
    'customer/saveCustomer',
    async (customer: Customer, { rejectWithValue }) => {
        try {
            const response = await api.post('/customer/add', customer);
            if (response.status !== 201 && response.status !== 200) {
                throw new Error('Failed to save customer');
            }
            return response.data; // Ensure data is returned correctly
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const viewCustomers = createAsyncThunk(
    'customer/viewCustomers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/customer/view');
            return response.data; // Ensure data is returned correctly
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (customer: Customer, { rejectWithValue }) => {
        try {
            const response = await api.put(/customer/update/${customer.id}, customer);
            if (response.status !== 201 && response.status !== 200) {
                throw new Error('Failed to update customer');
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (customerId: number, { rejectWithValue }) => {
        try {
            const response = await api.delete(/customer/delete/${customerId});
            if (response.status !== 200) {
                throw new Error("Failed to delete customer");
            }
            return customerId; // Return the ID of the deleted customer
        } catch (error: any) {
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);


const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // save customer
            .addCase(saveCustomer.pending, (state) => {
                console.log("Pending saving customer..."); // Proper logging
            })
            .addCase(saveCustomer.fulfilled, (state, action) => {
                if (action.payload) {
                    state.push(action.payload);
                    console.log("Customer added successfully:", action.payload);
                } else {
                    console.error("Fulfilled but no data returned");
                }
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.error("Failed to save customer:", action.payload);
            })

            // get all customers
            .addCase(viewCustomers.pending, (state) => {
                console.log("Pending viewing customers..."); // Proper logging
            })
            .addCase(viewCustomers.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log("Fetched customers:", action.payload);
                    return action.payload;
                } else {
                    console.error("Fulfilled but no data returned");
                }
            })
            .addCase(viewCustomers.rejected, (state, action) => {
                console.error("Failed to get customers:", action.payload);
            })

            // update customer
            .addCase(updateCustomer.pending, (state) => {
                console.log("Pending updating customer..."); // Proper logging
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.findIndex((customer) => customer.id === action.payload.id);
                    if (index !== -1) {
                        state[index] = action.payload; // Update the existing customer in the state
                        console.log("Customer updated successfully:", action.payload);
                    } else {
                        console.warn("Customer not found in state after update.");
                    }
                } else {
                    console.error("Fulfilled but no data returned");
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                console.error("Failed to update customer:", action.payload);
            })

            // delete customer
            .addCase(deleteCustomer.pending, (state) => {
                console.log("Pending deleting customer..."); // Proper logging
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                const customerId = action.payload;
                const index = state.findIndex((customer) => customer.id === customerId);
                if (index !== -1) {
                    state.splice(index, 1); // Remove the customer from the state
                    console.log("Customer deleted successfully:", customerId);
                } else {
                    console.warn("Customer not found in state during deletion.");
                }
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                console.error("Failed to delete customer:", action.payload);
            });
    }
})

export default customerSlice.reducer