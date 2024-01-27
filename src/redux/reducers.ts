import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

// ce fichier permet de combiner tous les reducers on deplace tout ce qu'il y a dans le store
export const rootReducer = combineReducers({
    user: userReducer,
});
