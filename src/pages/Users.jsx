import { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [memberId, setMemberId] = useState("");
    const [role, setRole] = useState("Member");

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const savedUsers = localStorage.getItem("users");

        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        }
    }, []);

    function saveUsers(updatedUsers) {
        setUsers(updatedUsers);

        localStorage.setItem(
            "users",
            JSON.stringify(updatedUsers)
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !memberId || !role) {
            alert("Please fill in all fields.");
            return;
        }

        if (editId) {
            const updatedUsers = users.map((user) =>
                user.id === editId
                    ? {
                        ...user,
                        name,
                        memberId,
                        role
                    }
                    : user
            );

            saveUsers(updatedUsers);
        } else {
            const newUser = {
                id: Date.now(),
                name,
                memberId,
                role
            };

            saveUsers([...users, newUser]);
        }

        clearForm();
    }

    function clearForm() {
        setName("");
        setMemberId("");
        setRole("Member");
        setEditId(null);
    }

    function editUser(user) {
        setName(user.name);
        setMemberId(user.memberId);
        setRole(user.role);
        setEditId(user.id);
    }

    function deleteUser(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        const updatedUsers = users.filter(
            (user) => user.id !== id
        );

        saveUsers(updatedUsers);
    }

    return (
        <div className="page">

            <h1>User Management</h1>

            <p>
                Add, update and manage library users.
            </p>

            <div className="form-card">

                <h2>
                    {editId ? "Update User" : "Add New User"}
                </h2>

                <form
                    className="add-user-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Membership ID"
                        value={memberId}
                        onChange={(e) =>
                            setMemberId(e.target.value)
                        }
                    />

                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(e.target.value)
                        }
                    >
                        <option value="Member">
                            Member
                        </option>

                        <option value="Librarian">
                            Librarian
                        </option>

                        <option value="Admin">
                            Admin
                        </option>
                    </select>

                    <div>

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            {editId
                                ? "Update User"
                                : "Add User"}
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

            <h2>User List</h2>

            {users.length > 0 ? (
                <table>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Membership ID</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {users.map((user) => (
                            <tr key={user.id}>

                                <td>{user.name}</td>

                                <td>{user.memberId}</td>

                                <td>{user.role}</td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            editUser(user)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteUser(user.id)
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
                    No users have been added yet.
                </p>
            )}

        </div>
    );
}

export default Users;