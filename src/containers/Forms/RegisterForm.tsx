import { useState, useEffect } from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { useNavigate } from "react-router-dom";

export function RegisterForm({ setNotification }) {
    /* const result = useRegisterUser();
    const isLoading = result.isLoading;
    const isError = result.isError;
    const user = result.user;
    const register = result.register */
    const navigate = useNavigate();
    const { isLoading, isError, userStatus, register } = useRegisterUser();
    /* console.log("isLoading", isLoading);
    console.log("userStatus", userStatus);
    console.log("isError", isError); */

    const [email, setEmail] = useState<string>("abc@gmail.com");
    const [password, setPassword] = useState<string>("123456");
    const [firstName, setFirstName] = useState<string>("a");
    const [lastName, setLastName] = useState<string>("b");
    const [isEmptyField, setIsEmptyField] = useState<boolean>(false);
    const [warnModeUser, setWarnModeUser] = useState<boolean>(true);

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
            setWarnModeUser(false);
            return false;
        }
    };

    useEffect(() => {
        if (!warnModeUser) checkFields();
    }, [email, password, lastName, firstName]);

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const datas = { email, password, firstName, lastName };
        console.log("datas", datas);
        const isFormValid = checkFields();
        if (isFormValid) register(datas);
    };

    if (userStatus?.status === 200) {
        setNotification("Votre compte à bien été créé!");
        navigate("/login");
    }

    return (
        <>
            <h1>REGISTER</h1>
            <form onSubmit={(e) => onSubmitForm(e)}>
                <input
                    defaultValue={email}
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <input
                    defaultValue={password}
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <input
                    defaultValue={firstName}
                    name="firstName"
                    placeholder="firstName"
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                />
                <input
                    defaultValue={lastName}
                    name="lastName"
                    placeholder="lastName"
                    onChange={(e) => setLastName(e.currentTarget.value)}
                />

                {isError && (
                    <p style={{ color: "red" }}>Serveur indisponible</p>
                )}

                {!isError && isEmptyField && (
                    <p style={{ color: "red" }}>Les champs sont vide</p>
                )}

                <button disabled={isLoading} type="submit">
                    Enregistrer
                </button>
            </form>
        </>
    );
}
