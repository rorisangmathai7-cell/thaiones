import { useState } from "react";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (username === "admin" && password === "1234") {
            onLogin();
        } else {
            alert("Incorrect username or password.");
        }
    }

    return (
        <div className="login-container">
            <h1>Community Library</h1>

            <p>Library Management System</p>

            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label>Username</label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="primary-btn"
                >
                    Login
                </button>

            </form>
        </div>
    );
}

export default Login;