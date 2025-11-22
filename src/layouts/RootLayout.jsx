import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
    return (
        <>
            <Navbar />
            <main style={{ padding: "2rem", color: "#fff", background: "#0a0a0a", minHeight: "100vh" }}>
                <Outlet />
            </main>
        </>
    );
}

