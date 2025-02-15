import { Flower } from "../models/Flower.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../service/apiService.ts";

export const initialState: Flower[] = [];

/*export const saveFlower = createAsyncThunk(
    "flower/saveFlower",
    async (flower: Flower, { rejectWithValue }) => {
        try {
            const response = await api.post("/flower/add", flower);
            if (response.status !== 201 && response.status !== 200) {
                throw new Error("Failed to save flower");
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);*/
export const saveFlower = createAsyncThunk(
    "flower/saveFlower",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const response = await api.post("/flower/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status !== 201 && response.status !== 200) {
                throw new Error("Failed to save flower");
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const viewFlowers = createAsyncThunk(
    "flower/viewFlowers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/flower/view");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

/*export const updateFlower = createAsyncThunk(
    "flower/updateFlower",
    async ({ flowerCode, formData }: { flowerCode: number, formData: FormData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/flower/update/${flowerCode}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status !== 200) {
                throw new Error("Failed to update flower");
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);*/
export const updateFlower = createAsyncThunk(
    "flower/updateFlower",
    async ({ flowerCode, formData }: { flowerCode: number, formData: FormData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/flower/update/${flowerCode}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status !== 200) {
                throw new Error("Failed to update flower");
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const deleteFlower = createAsyncThunk(
    "flower/deleteFlower",
    async (flowerCode: number, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/flower/delete/${flowerCode}`);
            if (response.status !== 200) {
                throw new Error("Failed to delete flower");
            }
            return flowerCode;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const flowerSlice = createSlice({
    name: "flower",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveFlower.pending, () => {
                console.log("Pending saving flower...");
            })
            .addCase(saveFlower.fulfilled, (state, action) => {
                if (action.payload) {
                    state.push(action.payload);
                    console.log("Flower added successfully:", action.payload);
                }
            })
            .addCase(saveFlower.rejected, (_, action) => {
                console.error("Failed to save flower:", action.payload);
            })
            .addCase(viewFlowers.pending, () => {
                console.log("Pending viewing flowers...");
            })
            .addCase(viewFlowers.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(viewFlowers.rejected, (_, action) => {
                console.error("Failed to get flowers:", action.payload);
            })
            .addCase(updateFlower.pending, () => {
                console.log("Pending updating flower...");
            })
            .addCase(updateFlower.fulfilled, (state, action) => {
                const index = state.findIndex((flower) => flower.flower_code === action.payload.flower_code);
                if (index !== -1) {
                    state[index] = action.payload;
                    console.log("Flower updated successfully:", action.payload);
                }
            })
            .addCase(updateFlower.rejected, (_, action) => {
                console.error("Failed to update flower:", action.payload);
            })
            .addCase(deleteFlower.pending, () => {
                console.log("Pending deleting flower...");
            })
            .addCase(deleteFlower.fulfilled, (state, action) => {
                const flowerCode = action.payload;
                return state.filter((flower) => flower.flower_code !== flowerCode);
            })
            .addCase(deleteFlower.rejected, (_, action) => {
                console.error("Failed to delete flower:", action.payload);
            });
    }
});

export default flowerSlice.reducer;