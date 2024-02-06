import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//HOOK PERSO
import { useLoginUser } from "../../hooks/useLoginUser";

export function LoginForm({ setNotification }) {
    //declaration des state qui vont acceuillir les data des formulaires
    const [email, setEmail] = useState<string>("aze@gmail.com");
    const [password, setPassword] = useState<string>("123456");
    const [isEmptyField, setIsEmptyField] = useState<boolean>(false);
    // ce state permet de faire apparaitre la popup de message
    const [warnMode, setWarnMode] = useState<boolean>(false);
    const navigate = useNavigate();

    const { isLoading, isError, statusCode, userDataLogin, tryLogUser } =
        useLoginUser();

    // creation d'une fonction qui permet de verifier les champs
    const checkFields = () => {
        if (email !== "" && password !== "") {
            setIsEmptyField(false);
            return true;
        } else {
            setIsEmptyField(true);
            setWarnMode(true);
            return false;
        }
    };

    useEffect(() => {
        // si le warnmode est différent de
        if (warnMode) checkFields();
    }, [email, password]);

    // fonction onSubmitForm
    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = checkFields();
        if (isFormValid) {
            const datas = { email, password };
            tryLogUser(datas);
        }
    };

    if (statusCode === 200) {
        setNotification("Vous êtes bien connecté!");
        navigate("/");
    }

    return (
        <>
            <h1>Login</h1>
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
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    type="password"
                    name="password"
                    placeholder="password *"
                />

                <button type="submit">Se connecter</button>
            </form>
        </>
    );
}
