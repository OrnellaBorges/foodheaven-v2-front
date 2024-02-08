import "./header.css";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser, selectUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export function Header() {
    const user = useSelector(selectUser);
    console.log("user", user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <header className="header">
            <Link to="/">
                <img src="logo.jpg" />
            </Link>

            {/* Conditionnement de l'affichage des bouton de connexion */}
            {user.isLogged ? (
                <div>
                    Bonjour {user.infos.firstName}
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link to="/login">login</Link>
                    <Link to="/register">register</Link>
                </div>
            )}
        </header>
    );
}
