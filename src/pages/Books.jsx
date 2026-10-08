import { useEffect, useState } from "react";

function Books() {
    const [books, setBooks] = useState([]);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [isbn, setIsbn] = useState("");
    const [quantity, setQuantity] = useState("");

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const savedBooks = localStorage.getItem("books");

        if (savedBooks) {
            setBooks(JSON.parse(savedBooks));
        }
    }, []);

    function saveBooks(updatedBooks) {
        setBooks(updatedBooks);

        localStorage.setItem(
            "books",
            JSON.stringify(updatedBooks)
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (
            !title ||
            !author ||
            !genre ||
            !isbn ||
            quantity === ""
        ) {
            alert("Please fill in all fields.");
            return;
        }

        if (editId) {
            const updatedBooks = books.map((book) =>
                book.id === editId
                    ? {
                        ...book,
                        title,
                        author,
                        genre,
                        isbn,
                        quantity: Number(quantity)
                    }
                    : book
            );

            saveBooks(updatedBooks);

            setEditId(null);
        } else {
            const newBook = {
                id: Date.now(),
                title,
                author,
                genre,
                isbn,
                quantity: Number(quantity)
            };

            saveBooks([...books, newBook]);
        }

        clearForm();
    }

    function clearForm() {
        setTitle("");
        setAuthor("");
        setGenre("");
        setIsbn("");
        setQuantity("");
        setEditId(null);
    }

    function editBook(book) {
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setIsbn(book.isbn);
        setQuantity(book.quantity);
        setEditId(book.id);
    }

    function deleteBook(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) {
            return;
        }

        const updatedBooks = books.filter(
            (book) => book.id !== id
        );

        saveBooks(updatedBooks);
    }

    return (
        <div className="page">

            <h1>Book Management</h1>

            <p>
                Add, update and delete books in the library.
            </p>

            <div className="form-card">

                <h2>
                    {editId ? "Update Book" : "Add New Book"}
                </h2>

                <form
                    className="book-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Book Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />

                    <input
                        type="number"
                        min="0"
                        placeholder="Initial Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <div>
                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            {editId ? "Update Book" : "Add Book"}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                className="edit-btn"
                                onClick={clearForm}
                                style={{ marginLeft: "8px" }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                </form>

            </div>

            <h2>Book List</h2>

            {books.length > 0 ? (
                <table>

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>ISBN</th>
                            <th>Quantity</th>
                            <th>Actions</th>
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
                                        Number(book.quantity) < 2
                                            ? "low-stock"
                                            : ""
                                    }
                                >
                                    {book.quantity}
                                </td>

                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            editBook(book)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteBook(book.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            ) : (
                <p className="empty-message">
                    No books have been added yet.
                </p>
            )}

        </div>
    );
}

export default Books;