import { createSlice } from "@reduxjs/toolkit";

export type UserLoginData = {
    firstName?: string;
    lastName?: string;
    userId?: number;
    email?: string;
};

// ici on crée un Objet user = state initiale
const initialState = {
    infos: {},
    isLogged: false,
};

// creer la tranche
// createSlice est une function qui provient de reduxToolkit

type StateType = {
    user: {
        infos: UserLoginData;
        isLogged: boolean;
    };
};

type UserActionType = {
    payload: UserLoginData;
    type: string;
};

export const userSlice = createSlice({
    name: "user", // nom de la slice
    initialState,
    reducers: {
        // connectUser: (state = initialState, action) => ({...state, user: {infos: action.payload, isLogged: true}}),
        connectUser: (state = initialState, action: UserActionType) => {
            // persistance redux avec LS
            const loggedUserData = {
                ...state,
                infos: action.payload,
                isLogged: true,
            };
            const globalState = {
                user: loggedUserData,
            };
            localStorage.setItem("globalState", JSON.stringify(globalState));
            return loggedUserData;
        },
        //logoutUser:(state = initialState) => ({...state, user: {...initialState}}),
        logoutUser: (state = initialState) => {
            localStorage.removeItem("globalState");
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
