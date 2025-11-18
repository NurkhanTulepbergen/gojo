import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                {/* ✅ Обычный Link, не реагирует как активный */}
                <Link to="/" className="logo">
                    🎌 <span>Anime Finder</span>
                </Link>
            </div>

            <div className="navbar-links">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/items">All Anime</NavLink>
                <NavLink to="/favorites">Favorites</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </div>
        </nav>
    );
}
