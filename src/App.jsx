import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("libraryLoggedIn") === "true"
    );

    function handleLogin() {
        localStorage.setItem("libraryLoggedIn", "true");
        setIsLoggedIn(true);
    }

    function handleLogout() {
        localStorage.removeItem("libraryLoggedIn");
        setIsLoggedIn(false);
    }

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <BrowserRouter>
            <Navbar onLogout={handleLogout} />

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/books" element={<Books />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;