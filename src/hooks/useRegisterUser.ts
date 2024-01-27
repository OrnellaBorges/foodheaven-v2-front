import { useState } from "react";
import { createOneUser } from "../api/userApi";
import type {
    RegisterUserData,
    ResponseRegisterUser,
} from "../types/userTypes";

// le formulaire fait appal a ce hook
// ce hook va faire appel à une fonction dans le dossier api

export function useRegisterUser() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [userStatus, setUserStatus] = useState<ResponseRegisterUser>();

    // fonction qui va essayer d'enregistrer le user dans la bdd
    const register = async (datas: RegisterUserData) => {
        setIsLoading(true); // lorsque le client appui sur le bouton on attend le retour de la bdd
        try {
            const response = await createOneUser(datas);
            const userStatusApi = response.data;
            setUserStatus(userStatusApi);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    /* return {
        isLoading: isLoading,
        isError: isError,
        user: user,
        register: register
    }; */
    return { isLoading, isError, userStatus, register };
}
