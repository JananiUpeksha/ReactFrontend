import {configureStore} from "@reduxjs/toolkit";
import FlowerSlice from "../reducers/FlowerSlice.ts";
import CustomerSlice from "../reducers/CustomerSlice.ts";
import UserSlice from "../reducers/UserSlice.ts";

export const store = configureStore({
    reducer: {
        flower: FlowerSlice,
        customer: CustomerSlice,
        user: UserSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;