import { createSlice } from "@reduxjs/toolkit";

// ici on crée un Objet user = state initiale
const initialState = {
    infos: {},
    isLogged: false,
};

// creer la tranche
// createSlice est une méthode qui provient de reduxToolkit

type StateType = {
    user: {
        infos: {};
        isLogged: boolean;
    };
};

export const userSlice = createSlice({
    name: "user", // nom de la slice
    initialState,
    reducers: {
        // connectUser: (state = initialState, action) => ({...state, user: {infos: action.payload, isLogged: true}}),
        connectUser: (state = initialState, action) => {
            return {
                ...state,
                user: {
                    infos: action.payload,
                    isLogged: true,
                },
            };
        },
        //logoutUser:(state = initialState) => ({...state, user: {...initialState}}),
        logoutUser: (state = initialState) => {
            return {
                ...state, // state de connectUser
                user: { ...initialState }, //nettoyage  valeur de state remplacé par la copie ... du state du départ
            };
        },
    },
});

export const { connectUser, logoutUser } = userSlice.actions;
export const selectUser = (state: StateType) => state.user;
export default userSlice.reducer;
