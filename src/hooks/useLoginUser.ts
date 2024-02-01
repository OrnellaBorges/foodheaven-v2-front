import { useState } from "react";
import { logOneUser } from "../api/userApi";
import type { LoginUserData } from "../types/userTypes";

// le formulaire fait appal a ce hook
// ce hook va faire appel à une fonction dans le dossier api

export function useLoginUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  //const [userloginStatus, setUserLoginStatus] = useState<ResponseLoginUser>();
  const [statusCode, setStatusCode] = useState<number>();
  const [userId, setUserId] = useState<number>();

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
      const codeReceived = response.data.status;
      setStatusCode(codeReceived);
      const token = response.data.token;
      const userIdReceived = response.data.user_id;
      setUserId(userIdReceived);
      const stringifiedToken = JSON.stringify(token);
      localStorage.setItem("token", stringifiedToken);
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
  return { isLoading, isError, statusCode, userId, tryLogUser };
}
