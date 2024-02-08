import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";

const retrieveDataFromLocalStorage = () => {
    const globalStateInLocalStorage = JSON.parse(
        localStorage.getItem("globalState")
    );
    const initialGlobalState = {
        user: {
            infos: {},
            isLogged: false,
        },
    };
    const data =
        globalStateInLocalStorage !== null
            ? globalStateInLocalStorage
            : initialGlobalState;
    return data;
};

// brancher le store au routeReducer pour le radar
export const store = configureStore({
    reducer: rootReducer,
    // Persistance rechargement de la page via LS
    preloadedState: retrieveDataFromLocalStorage(),
    devTools: process.env.NODE_ENV !== "production", // pour le plugin du radar de redux de chrome
});
