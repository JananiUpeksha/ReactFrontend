import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {User} from "../models/user.ts";


interface UserState {
    isAuthenticated: boolean;
    jwt_token: string | null;
    refresh_token: string | null;
    username: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    jwt_token: null,
    refresh_token: null,
    username: null,
    loading: false,
    error: null,
};

/*// Define `registerUser` with `createAsyncThunk`
export const registerUser = createAsyncThunk<
    any, // Adjust if needed
    User,
    { rejectValue: string }
>(
    "user/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/auth/register", userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

// Define `loginUser` with `createAsyncThunk`
export const loginUser = createAsyncThunk<
    any,
    { username: string; password: string },
    { rejectValue: string }
>(
    "user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/auth/login", credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);*/
const API_URL = "http://localhost:3003"; // Use the correct backend port

export const registerUser = createAsyncThunk<
    any,
    User,
    { rejectValue: string }
>(
    "user/register",
    async (userData, { rejectWithValue }) => {
        console.log("Registering User:", userData); // Debugging line
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData);
            return response.data;
        } catch (error: any) {
            console.error("Registration Error:", error.response?.data); // Log backend response
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);


export const loginUser = createAsyncThunk<
    any,
    { username: string; password: string },
    { rejectValue: string }
>(
    "user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOutUser(state) {
            state.isAuthenticated = false;
            state.jwt_token = null;
            state.refresh_token = null;
            state.username = null;
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("refresh_token");
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
                console.log("User Registered Successfully", action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.isAuthenticated = true;
                state.username = action.payload.username;

                // Save tokens to local storage
                localStorage.setItem("jwt_token", action.payload.accessToken);
                localStorage.setItem("refresh_token", action.payload.refreshToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            });
    },
});

export const { logOutUser, clearError } = userSlice.actions;
export default userSlice.reducer;
