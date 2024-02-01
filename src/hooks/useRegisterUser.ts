import { useState } from "react";
import { createOneUser } from "../api/userApi";
import type {
  RegisterUserData,
  //ResponseRegisterUser,
} from "../types/userTypes";

// le formulaire fait appal a ce hook
// ce hook va faire appel à une fonction dans le dossier api

export function useRegisterUser() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  //const [userStatus, setUserStatus] = useState<ResponseRegisterUser>();
  //const [isLogged, setIsLogged] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>();

  // fonction qui va essayer de logger l'utilisateur
  // user dans la bdd
  const tryRegisterUser = async (datas: RegisterUserData) => {
    setIsLoading(true);
    //on met a jour le state is loading
    try {
      const response = await createOneUser(datas);
      // axios met toutes les données de la reponse dans un objet.data
      const codeReceived = response.data.status; // const {data} = response
      //setUserStatus(code);
      setStatusCode(codeReceived);
    } catch (error) {
      //dans le cas ou l'api renvoi une erreur
      console.error("Erreur lors de l'enregistrement:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* return {
        isLoading: isLoading,
        isError: isError,
        user: user,
        tryRegisterUser: tryRegisterUser
    }; */
  return { isLoading, isError, statusCode, tryRegisterUser };
}
