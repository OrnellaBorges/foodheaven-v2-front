import "./header.css";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="header">
            <Link to="/">
                <img src="logo.jpg" />
            </Link>
            <div>
                <Link to="/login">login</Link>
                <Link to="/register">register</Link>
            </div>
        </header>
    );
}
