import { createSlice } from "@reduxjs/toolkit";

export interface UserLoginData {
    firstName?: string;
    lastName?: string;
    userId?: number;
}

// ici on crée un Objet user = state initiale
const initialState = {
    infos: {},
    isLogged: false,
};

// creer la tranche
// createSlice est une méthode qui provient de reduxToolkit

type StateType = {
    user: {
        infos: UserLoginData;
        isLogged: boolean;
    };
};

export const userSlice = createSlice({
    name: "user", // nom de la slice
    initialState,
    reducers: {
        // connectUser: (state = initialState, action) => ({...state, user: {infos: action.payload, isLogged: true}}),
        connectUser: (state = initialState, action) => {
            console.log("connectUser");
            return {
                ...state,
                infos: action.payload,
                isLogged: true,
            };
        },
        //logoutUser:(state = initialState) => ({...state, user: {...initialState}}),
        logoutUser: (state = initialState) => {
            console.log("logoutUser");
            return {
                ...state, // state de connectUser
                ...initialState, //nettoyage  valeur de state remplacé par la copie ... du state du départ
            };
        },
    },
});

export const { connectUser, logoutUser } = userSlice.actions;
export const selectUser = (state: StateType) => state.user;
export default userSlice.reducer;
