import { useState } from "react";
import { logOneUser } from "../api/userApi";
import type { LoginUserData } from "../types/userTypes";

import { useDispatch } from "react-redux";
import { connectUser } from "../redux/slices/userSlice";

// le formulaire fait appel a ce hook
// ce hook va faire appel à une fonction dans le dossier api

export function useLoginUser() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    //const [userloginStatus, setUserLoginStatus] = useState<ResponseLoginUser>();
    const [statusCode, setStatusCode] = useState<number>();
    const dispatch = useDispatch();

    /*   const tryGetUser = async (userIdReceived: number) => {
    try {
      const response = await getUserDetails(userIdReceived);
    } catch {
    } finally {
    }
  }; */

    // fonction qui va essayer d'enregistrer le user dans la bdd
    const tryLogUser = async (datas: LoginUserData) => {
        setIsLoading(true); // lorsque le client appui sur le bouton on attend le retour de la bdd
        try {
            const response = await logOneUser(datas); // dedans il y a l'axios.get
            console.log("response", response);
            const codeReceived = response.data.status;

            setStatusCode(codeReceived);
            const token = response.data.token;
            // stockage du token dans le LS
            const stringifiedToken = JSON.stringify(token);
            localStorage.setItem("token", stringifiedToken);
            //const userIdReceived = response.data.user_id;
            //setUserId(userIdReceived);

            // objet UserData :pour envoyer dans le redux
            const dataUserInfo = {
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                userId: response.data.user_id,
                email: response.data.email,
            };
            dispatch(connectUser(dataUserInfo));
            //Utilisation de useDispatch pour dispatcher les infos du user dans le store de Redux

            //setUserDataLogin(dataReceived);

            //setUserLoginStatus(userStatusApi);
            // on va recevoir un objet : status : 200 , token, user_id, msg
            /* tryGetUser(userIdReceived); */
        } catch (error) {
            // ici on reçois l'error de l'api
            console.error("Erreur lors de la connexion :", error);
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
    return { isLoading, isError, statusCode, tryLogUser };
}
