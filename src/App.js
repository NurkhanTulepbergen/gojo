// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import AnimeListPage from "./pages/AnimeListPage";
import AnimeDetails from "./pages/AnimeDetails";
import Favorites from "./pages/Favorites";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

function Protected({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Главная страница — указываем Login */}
                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Signup />} />

                    {/* Приватные страницы */}
                    <Route
                        path="/"
                        element={
                            <Protected>
                                <RootLayout />
                            </Protected>
                        }
                    >
                        <Route index element={<Home />} />
                        <Route path="items" element={<AnimeListPage />} />
                        <Route path="items/:id" element={<AnimeDetails />} />
                        <Route path="favorites" element={<Favorites />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>

                    {/* Редирект всего неизвестного */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
