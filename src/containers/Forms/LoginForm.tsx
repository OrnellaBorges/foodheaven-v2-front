import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
//HOOK PERSO
import { useLoginUser } from "../../hooks/useLoginUser";

export function LoginForm({ setNotification }) {
    // lui il vien de redux
    const user = useSelector(selectUser);
    console.log("usertest", user);

    //declaration des state qui vont acceuillir les data des formulaires
    const [email, setEmail] = useState<string>("john.doe@gmail.com");
    const [password, setPassword] = useState<string>("123456");
    const [isEmptyField, setIsEmptyField] = useState<boolean>(false);

    // ce state permet de faire apparaitre la popup de message
    const [warnMode, setWarnMode] = useState<boolean>(false);

    //
    const navigate = useNavigate();

    const { isLoading, isError, statusCode, tryLogUser } = useLoginUser();

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

    // quand l'user est connecté on doit bloquer la navigation vers la page Loggin
    // soluce faire ine condition en fonction du state is Logged
    // utiliser soit Navigate ou navigate de react - redux
    if (user.isLogged) {
        console.log("first");
        return <Navigate to="/" />;
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
                    //type="password"
                    name="password"
                    placeholder="password *"
                />

                <button disabled={isLoading} type="submit">
                    Se connecter
                </button>
            </form>

            {/* Affichage des messages en cas de problèmes... */}
            {isError && <p style={{ color: "red" }}>Serveur indisponible</p>}

            {!isError && isEmptyField && (
                <p style={{ color: "red" }}>Les champs sont vide</p>
            )}

            {statusCode === 401 && (
                <p style={{ color: "red" }}>Mot de passe incorrect!</p>
            )}

            {statusCode === 500 && (
                <p style={{ color: "red" }}>
                    Problème lors de la creation du compte
                </p>
            )}
        </>
    );
}
