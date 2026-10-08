import { useEffect, useState } from "react";

function Transactions() {
    const [books, setBooks] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [bookId, setBookId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [type, setType] = useState("Borrow");

    useEffect(() => {
        const savedBooks = localStorage.getItem("books");
        const savedTransactions =
            localStorage.getItem("transactions");

        if (savedBooks) {
            setBooks(JSON.parse(savedBooks));
        }

        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions));
        }
    }, []);

    function handleTransaction(e) {
        e.preventDefault();

        if (!bookId || quantity === "") {
            alert("Please select a book and enter quantity.");
            return;
        }

        const amount = Number(quantity);

        if (amount <= 0 || !Number.isInteger(amount)) {
            alert("Quantity must be a positive whole number.");
            return;
        }

        const selectedBook = books.find(
            (book) => book.id === Number(bookId)
        );

        if (!selectedBook) {
            alert("Book not found.");
            return;
        }

        if (
            type === "Borrow" &&
            amount > Number(selectedBook.quantity)
        ) {
            alert("Not enough copies available.");
            return;
        }

        const updatedBooks = books.map((book) => {
            if (book.id === Number(bookId)) {

                const newQuantity =
                    type === "Borrow"
                        ? Number(book.quantity) - amount
                        : Number(book.quantity) + amount;

                return {
                    ...book,
                    quantity: newQuantity
                };
            }

            return book;
        });

        const newTransaction = {
            id: Date.now(),
            bookTitle: selectedBook.title,
            type,
            quantity: amount,
            date: new Date().toLocaleString()
        };

        const updatedTransactions = [
            ...transactions,
            newTransaction
        ];

        setBooks(updatedBooks);
        setTransactions(updatedTransactions);

        localStorage.setItem(
            "books",
            JSON.stringify(updatedBooks)
        );

        localStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions)
        );

        setBookId("");
        setQuantity("");
        setType("Borrow");
    }

    return (
        <div className="page">

            <h1>Transactions</h1>

            <p>
                Borrow books or add stock to the library.
            </p>

            <div className="form-card">

                <h2>New Transaction</h2>

                <form
                    className="transaction-form"
                    onSubmit={handleTransaction}
                >

                    <select
                        value={bookId}
                        onChange={(e) =>
                            setBookId(e.target.value)
                        }
                    >
                        <option value="">
                            Select a Book
                        </option>

                        {books.map((book) => (
                            <option
                                key={book.id}
                                value={book.id}
                            >
                                {book.title}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        min="1"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.target.value)
                        }
                    />

                    <select
                        value={type}
                        onChange={(e) =>
                            setType(e.target.value)
                        }
                    >
                        <option value="Borrow">
                            Borrow
                        </option>

                        <option value="Stock">
                            Add Stock
                        </option>
                    </select>

                    <button
                        type="submit"
                        className="primary-btn"
                    >
                        Save Transaction
                    </button>

                </form>

            </div>

            <h2>Transaction History</h2>

            {transactions.length > 0 ? (
                <table>

                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>

                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>

                                <td>
                                    {transaction.bookTitle}
                                </td>

                                <td>
                                    {transaction.type}
                                </td>

                                <td>
                                    {transaction.quantity}
                                </td>

                                <td>
                                    {transaction.date}
                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>
            ) : (
                <p className="empty-message">
                    No transactions yet.
                </p>
            )}

        </div>
    );
}

export default Transactions;