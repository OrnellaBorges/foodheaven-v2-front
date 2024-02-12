import { useState } from "react";
import { editOneUser } from "../api/userApi";
import type { UpdateUserData } from "../types/userTypes";

//import de redux pour recup les infos
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../redux/slices/userSlice";

//import { useDispatch } from "react-redux";
//import { connectUser } from "../redux/slices/userSlice";

// le formulaire fait appel a ce hook
// ce hook va faire appel à une fonction dans le dossier api

export function useEditProfilUser() {
    // recup des datas le d'user connecté
    const user = useSelector(selectUser);
    //console.log("user from redux", user);
    //const userId = user.infos.userId;

    //déclaration des states error et loading
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const [statusCode, setStatusCode] = useState<number>();
    //const [userloginStatus, setUserLoginStatus] = useState<ResponseLoginUser>();

    //const dispatch = useDispatch();

    // fonction qui va essayer l'envoyer les nouvelles datas de l'user dans la bdd
    const tryUpdateUserInfo = async (newDatas: UpdateUserData, userId) => {
        console.log("tryUpdateUserInfo", newDatas);
        setIsLoading(true); // on déclanche le loader
        setIsError(false); // on passe setIsError a false

        try {
            // fait appel au fetch axios editOneUser qui fait le axios.put
            const responseAxios = await editOneUser(newDatas, userId);
            console.log("response", responseAxios);

            // stockage du code status envoyé par l'api
            const codeStatusReceived = responseAxios.data.status;
            console.log("codeStatusReceived", codeStatusReceived);
            //maj du state status code
            setStatusCode(codeStatusReceived);

            //const userIdReceived = response.data.user_id;
            //setUserId(userIdReceived);

            // reconstruire un nouvel objet:
            /* const dataUserInfoUpdated = {
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                password: response.data.password,
                userId: response.data.user_id,
            }; */

            console.log(
                "response.data.userUpdated",
                responseAxios.data.userUpdated
            );
            //envoyer dans redux les nouvelles data
            //dispatch(connectUser(dataUserInfoUpdated));
            //Utilisation de useDispatch pour dispatcher les infos du user dans le store de Redux

            //setUserDataLogin(dataReceived);

            //setUserLoginStatus(userStatusApi);
            // on va recevoir un objet : status : 200 , token, user_id, msg
            // tryGetUser(userIdReceived)
        } catch (error) {
            // ici on reçoit l'error de l'api
            console.error("Erreur :", error);
            setIsError(true);
        } finally {
            //on fait des trucs ici quoi qu'il arrive
            setIsLoading(false);
        }
    };

    /* return {
        isLoading: isLoading,
        isError: isError,
        user: user,
        register: register
    }; */
    return { isLoading, isError, statusCode, tryUpdateUserInfo };
}
