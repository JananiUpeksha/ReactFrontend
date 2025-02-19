/*
import {createSlice} from "@reduxjs/toolkit";
import {Customer} from "../models/customer.ts";

const initialState: Customer[] = [];

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        addCustomer: (state, action) => {
            state.push(action.payload);
        },
        updateCustomer: (state, action) => {
            const index = state.findIndex((customer) => customer.customer_id === action.payload.customer_id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteCustomer: (state, action) => {
            return state.filter((customer) => customer.customer_id !== action.payload.customer_id);
        }
    }
})

export const {addCustomer, updateCustomer, deleteCustomer} = customerSlice.actions;
export default customerSlice.reducer;*/
/*
import { Customer } from "../models/Customer.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../services/apiService.ts";

export const initialState: Customer[] = [];

// Save Customer
export const saveCustomer = createAsyncThunk(
    "customer/saveCustomer",
    async (customer: Customer, { rejectWithValue }) => {
        console.log("Attempting to save customer:", customer); // Log the customer data before sending it
        try {
            const response = await api.post("/customer/add", customer);
            console.log("API Response:", response); // Log the response received from the server

            if (response.status !== 201 && response.status !== 200) {
                console.error("Failed to save customer. Response status:", response.status); // Log status if not success
                throw new Error("Failed to save customer");
            }

            return response.data; // This will be passed to the reducer
        } catch (error: any) {
            console.error("Error in saveCustomer:", error); // Log the error if it happens
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// View Customers
export const viewCustomers = createAsyncThunk(
    "customer/viewCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/customer/view");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Update Customer
export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async ({ customerId, customerData }: { customerId: number, customerData: Customer }, { rejectWithValue }) => {
        try {
            // Map the customer phone field to the new field name 'contact'
            const response = await api.put(`/customer/update/${customerId}`, {
                ...customerData,
                contact: customerData.customer_phone // Rename the field here
            });
            if (response.status !== 200) {
                throw new Error("Failed to update customer");
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Delete Customer
export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (customerId: number, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/customer/delete/${customerId}`);
            if (response.status !== 200) {
                throw new Error("Failed to delete customer");
            }
            return customerId;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Customer Slice
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveCustomer.pending, () => {
                console.log("Pending saving customer..."); // Log when saving starts
            })
            .addCase(saveCustomer.fulfilled, (state, action) => {
                console.log("Customer added successfully:", action.payload); // Log the customer added successfully
                state.push(action.payload); // Push the new customer to the state
            })
            .addCase(saveCustomer.rejected, (_, action) => {
                console.error("Failed to save customer:", action.payload); // Log the error message
            })
            .addCase(viewCustomers.pending, () => {
                console.log("Pending viewing customers...");
            })
            .addCase(viewCustomers.fulfilled, (state, action) => {
                console.log("Fetched customers:", action.payload); // Log the customers fetched
                return action.payload;
            })
            .addCase(viewCustomers.rejected, (_, action) => {
                console.error("Failed to get customers:", action.payload);
            })
            .addCase(updateCustomer.pending, () => {
                console.log("Pending updating customer...");
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                console.log("Customer updated successfully:", action.payload); // Log the updated customer data
                const index = state.findIndex((customer) => customer.customer_id === action.payload.customer_id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateCustomer.rejected, (_, action) => {
                console.error("Failed to update customer:", action.payload);
            })
            .addCase(deleteCustomer.pending, () => {
                console.log("Pending deleting customer...");
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                console.log("Customer deleted successfully:", action.payload); // Log the customer deleted
                const customerId = action.payload;
                return state.filter((customer) => customer.customer_id !== customerId);
            })
            .addCase(deleteCustomer.rejected, (_, action) => {
                console.error("Failed to delete customer:", action.payload);
            });
    }
});

export default customerSlice.reducer;*/
import { Customer } from "../models/Customer.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../service/apiService.ts";

export const initialState: Customer[] = [];

// Save Customer
export const saveCustomer = createAsyncThunk(
    "customer/saveCustomer",
    async (customer: Customer, { rejectWithValue }) => {
        console.log("Attempting to save customer:", customer); // Log the customer data before sending it
        try {
            const response = await api.post("/customer/add", customer);
            console.log("API Response:", response); // Log the response received from the server

            if (response.status !== 201 && response.status !== 200) {
                console.error("Failed to save customer. Response status:", response.status); // Log status if not success
                throw new Error("Failed to save customer");
            }

            return response.data; // This will be passed to the reducer
        } catch (error: any) {
            console.error("Error in saveCustomer:", error); // Log the error if it happens
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// View Customers
export const viewCustomers = createAsyncThunk(
    "customer/viewCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/customer/view");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

/*// Update Customer
export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async ({ customerId, customerData }: { customerId: number, customerData: Customer }, { rejectWithValue }) => {
        try {
            // Log the customer data for debugging
            console.log("Customer data for update:", customerData);

            // Safely map the customer phone field to 'contact', with fallback for missing values
            const response = await api.put(`/customer/update/${customerId}`, {
                ...customerData,
                contact: customerData?.customer_phone || "", // Use empty string if customer_phone is undefined
            });
            if (response.status !== 200) {
                throw new Error("Failed to update customer");
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);*/
/*export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async ({ customerId, customerData }: { customerId: number, customerData: Customer }, { rejectWithValue }) => {
        if (!customerId) {
            console.error("Invalid customer ID:", customerId);
            return rejectWithValue("Customer ID is missing");
        }

        try {
            console.log("Customer data for update:", customerData);
            const response = await api.put(`/customer/update/${customerId}`, {
                ...customerData,
                contact: customerData?.customer_phone || "",
            });

            if (response.status !== 200) {
                throw new Error("Failed to update customer");
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);*/
export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async ({ customerId, customerData }: { customerId: number, customerData: Customer }, { rejectWithValue }) => {
        if (!customerId) {
            console.error("Invalid customer ID:", customerId);
            return rejectWithValue("Customer ID is missing or invalid");
        }

        try {
            console.log("Customer data for update:", customerData);
            const response = await api.put(`/customer/update/${customerId}`, {
                ...customerData,
                contact: customerData?.customer_phone || "",
            });

            if (response.status !== 200) {
                throw new Error("Failed to update customer");
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


// Delete Customer
export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (customerId: number, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/customer/delete/${customerId}`);
            if (response.status !== 200) {
                throw new Error("Failed to delete customer");
            }
            return customerId;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Customer Slice
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveCustomer.pending, () => {
                console.log("Pending saving customer..."); // Log when saving starts
            })
            .addCase(saveCustomer.fulfilled, (state, action) => {
                console.log("Customer added successfully:", action.payload); // Log the customer added successfully
                state.push(action.payload); // Push the new customer to the state
            })
            .addCase(saveCustomer.rejected, (_, action) => {
                console.error("Failed to save customer:", action.payload); // Log the error message
            })
            .addCase(viewCustomers.pending, () => {
                console.log("Pending viewing customers...");
            })
            .addCase(viewCustomers.fulfilled, (state, action) => {
                console.log("Fetched customers:", action.payload); // Log the customers fetched
                return action.payload;
            })
            .addCase(viewCustomers.rejected, (_, action) => {
                console.error("Failed to get customers:", action.payload);
            })
            .addCase(updateCustomer.pending, () => {
                console.log("Pending updating customer...");
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                console.log("Customer updated successfully:", action.payload); // Log the updated customer data
                const index = state.findIndex((customer) => customer.customer_id === action.payload.customer_id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateCustomer.rejected, (_, action) => {
                console.error("Failed to update customer:", action.payload);
            })
            .addCase(deleteCustomer.pending, () => {
                console.log("Pending deleting customer...");
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                console.log("Customer deleted successfully:", action.payload); // Log the customer deleted
                const customerId = action.payload;
                return state.filter((customer) => customer.customer_id !== customerId);
            })
            .addCase(deleteCustomer.rejected, (_, action) => {
                console.error("Failed to delete customer:", action.payload);
            });
    }
});

export default customerSlice.reducer;
