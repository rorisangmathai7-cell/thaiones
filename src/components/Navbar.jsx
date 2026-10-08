import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
    return (
        <>
            <header>
                <h1>Community Library</h1>

                <button className="logout-btn" onClick={onLogout}>
                    Logout
                </button>
            </header>

            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/books">Books</Link>
                <Link to="/transactions">Transactions</Link>
                <Link to="/users">Users</Link>
            </nav>
        </>
    );
}

export default Navbar;