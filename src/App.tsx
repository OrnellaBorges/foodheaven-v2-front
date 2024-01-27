import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./Layout";
import { Home } from "./containers/Home/Home";
import { RegisterForm } from "./containers/Forms/RegisterForm";
import { LoginForm } from "./containers/Forms/LoginForm";
import { useEffect, useState } from "react";
import { Notification } from "./components/Notification/Notification";

const seconds = 3;

export default function App() {
    const [notification, setNotification] = useState<string>("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // À l'intérieur de cette fonction, nous mettons à jour l'état après 3 secondes
            setNotification("");
        }, seconds * 1000);

        // La fonction de nettoyage pour annuler le setTimeout si le composant est démonté avant son déclenchement
        return () => clearTimeout(timeoutId);
    }, [notification]); // Le tableau de dépendances vide signifie que cela s'exécute une seule fois après le montage initial

    return (
        <>
            {notification && <Notification>{notification}</Notification>}
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route
                        path="/register"
                        element={
                            <RegisterForm setNotification={setNotification} />
                        }
                    />
                </Routes>
            </Layout>
            {/* <button onClick={() => setNotification("message")}>notify</button> */}
        </>
    );
}
