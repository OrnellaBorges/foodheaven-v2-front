import { useState, useEffect } from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser";

import { useNavigate, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";

export function RegisterForm({ setNotification }) {
    /* const result = useRegisterUser();
    const isLoading = result.isLoading;
    const isError = result.isError;
    const user = result.user;
    const tryRegisterUser = result.tryRegisterUser */
    const navigate = useNavigate();

    const user = useSelector(selectUser);

    // le Hook nous renvoi ici tryRegisterUser
    const { isLoading, isError, statusCode, tryRegisterUser } =
        useRegisterUser();

    const [email, setEmail] = useState<string>("john.doe@gmail.com");
    const [password, setPassword] = useState<string>("123456");
    const [firstName, setFirstName] = useState<string>("John");
    const [lastName, setLastName] = useState<string>("Doe");
    const [isEmptyField, setIsEmptyField] = useState<boolean>(false);
    // ce state permet de faire apparaitre la popup de message
    const [warnMode, setWarnMode] = useState<boolean>(false);

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = checkFields();
        if (isFormValid) {
            const datas = { email, password, firstName, lastName };
            tryRegisterUser(datas);
        }
    };

    const checkFields = () => {
        if (
            email !== "" &&
            password !== "" &&
            firstName !== "" &&
            lastName !== ""
        ) {
            setIsEmptyField(false);
            return true;
        } else {
            setIsEmptyField(true);
            setWarnMode(true);
            return false;
        }
    };

    //ce UE va executer  le if a chaque fois qu'un champs va changer
    // au départ il est bloqué par le bouleen de warnmode qui est a false au départ
    useEffect(() => {
        if (warnMode) checkFields();
    }, [email, password, lastName, firstName]);

    // si le status de l'api revoie 200
    if (statusCode === 200) {
        setNotification("Votre compte à bien été créé!");
        navigate("/login");
    }

    if (user.isLogged) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <h1>REGISTER</h1>
            <form onSubmit={(e) => onSubmitForm(e)}>
                <input
                    defaultValue={email}
                    type="email"
                    name="email"
                    placeholder="email *"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <input
                    defaultValue={password}
                    type="password"
                    name="password"
                    placeholder="password *"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <input
                    defaultValue={firstName}
                    name="firstName"
                    placeholder="firstName *"
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                />
                <input
                    defaultValue={lastName}
                    name="lastName"
                    placeholder="lastName *"
                    onChange={(e) => setLastName(e.currentTarget.value)}
                />

                {isError && (
                    <p style={{ color: "red" }}>Serveur indisponible</p>
                )}

                {!isError && isEmptyField && (
                    <p style={{ color: "red" }}>Les champs sont vide</p>
                )}

                {statusCode === 401 && (
                    <p style={{ color: "red" }}>Cet email est déjà pris</p>
                )}

                {statusCode === 500 && (
                    <p style={{ color: "red" }}>
                        Problème lors de la creation du compte
                    </p>
                )}

                <button disabled={isLoading} type="submit">
                    Enregistrer
                </button>
            </form>
        </>
    );
}
