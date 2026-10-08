import { useState, useEffect } from "react";

function Dashboard() {
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const booksData = localStorage.getItem("books");
        const usersData = localStorage.getItem("users");

        if (booksData) {
            setBooks(JSON.parse(booksData));
        }

        if (usersData) {
            setUsers(JSON.parse(usersData));
        }
    }, []);

    const totalCopies = books.reduce(
        (total, book) => total + Number(book.quantity || 0),
        0
    );

    const lowStockBooks = books.filter(
        (book) => Number(book.quantity || 0) < 2
    ).length;

    return (
        <div className="page">

            <h1>Library Dashboard</h1>

            <p>
                Welcome to the Community Library Management System.
            </p>

            <div className="dashboard-cards">

                <div className="card">
                    <h3>Total Books</h3>
                    <p>{books.length}</p>
                </div>

                <div className="card">
                    <h3>Total Copies</h3>
                    <p>{totalCopies}</p>
                </div>

                <div className="card">
                    <h3>Total Users</h3>
                    <p>{users.length}</p>
                </div>

                <div className="card">
                    <h3>Low Stock Books</h3>
                    <p>{lowStockBooks}</p>
                </div>

            </div>

            <h2>Books Available</h2>

            {books.length > 0 ? (
                <table>

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>ISBN</th>
                            <th>Available Copies</th>
                        </tr>
                    </thead>

                    <tbody>

                        {books.map((book) => (
                            <tr key={book.id}>

                                <td>{book.title}</td>

                                <td>{book.author}</td>

                                <td>{book.genre}</td>

                                <td>{book.isbn}</td>

                                <td
                                    className={
                                        Number(book.quantity || 0) < 2
                                            ? "low-stock"
                                            : ""
                                    }
                                >
                                    {book.quantity}
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            ) : (
                <p className="empty-message">
                    No books available.
                </p>
            )}

        </div>
    );
}

export default Dashboard;