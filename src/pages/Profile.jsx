// src/pages/Profile.jsx
import { useAuth } from "../context/AuthContext";
import "./Profile.css";


export default function Profile() {
    const { user, logout } = useAuth();

    // Вырежем букву для аватара
    const letter = user?.email?.charAt(0).toUpperCase();

    return (
        <div className="profile-page">
            <div className="profile-card">
                <h2>Your Profile</h2>

                <div className="profile-avatar">
                    {letter}
                </div>

                <div className="profile-info">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>UID:</strong> {user?.uid}</p>
                </div>

                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}
