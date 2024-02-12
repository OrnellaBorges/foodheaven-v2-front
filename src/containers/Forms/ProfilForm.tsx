import { useEffect, useState } from "react";
import "./form.css";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../redux/slices/userSlice";

import { useEditProfilUser } from "../../hooks/useEditProfilUser";

export function ProfilForm({ setNotification }) {
    const user = useSelector(selectUser);
    console.log("user from redux", user);
    const userId = user.infos.userId;

    const [email, setEmail] = useState<string>(user.infos.email);
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>(user.infos.firstName);
    const [lastName, setLastName] = useState<string>(user.infos.lastName);

    //state actif si les champs sont vide dans la fonction checkFields
    const [isEmptyField, setIsEmptyField] = useState<boolean>(false);
    // ce state permet de faire apparaitre un message si les champs sont mauvais
    const [warnMode, setWarnMode] = useState<boolean>(false);

    //HOOK perso
    const { isLoading, isError, statusCode, tryUpdateUserInfo } =
        useEditProfilUser();

    // creation d'une fonction qui permet de verifier les champs
    const checkFields = () => {
        if (
            email !== "" &&
            password !== "" &&
            lastName !== "" &&
            firstName !== ""
        ) {
            setIsEmptyField(false);
            return true;
        } else {
            setIsEmptyField(true);
            setWarnMode(true);
            return false;
        }
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log("je suis dans onsubmit");

        // 1- check les champs
        const isFormValid = checkFields(); // true ou false

        // si les champs sont valides === true
        if (isFormValid) {
            console.log("fields are valid");
            // on stock les nouvelles données dans une constante
            const newData = { email, password, lastName, firstName };
            //console.log("newData", newData);
            // on passe newData à la fonction du hookperso
            tryUpdateUserInfo(newData, userId);
        }
    };

    if (statusCode === 200) {
        setNotification("Vos données on bien été modifiées!");
    }

    return (
        <form onSubmit={onSubmitForm}>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                Lastname:
                <input
                    type="text"
                    name="lastName"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    defaultValue="123456"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
            </label>

            {isError && <p style={{ color: "red" }}>Serveur indisponible</p>}

            {!isError && isEmptyField && (
                <p style={{ color: "red" }}>Les champs sont vide</p>
            )}

            <button type="submit">Enregistrer les modifications</button>
        </form>
    );
}
