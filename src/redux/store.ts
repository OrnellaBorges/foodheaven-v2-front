import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

// brancher le store au routeReducer pour le radar
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
});
