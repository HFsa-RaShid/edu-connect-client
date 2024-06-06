import { useState, useEffect } from "react";
import useAxiosPublic from "../../../HOOKS/useAxiosPublic";
import Swal from "sweetalert2";

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        // Fetch all users from the backend
        axiosPublic.get('/users')
            .then(res => {
                const nonAdminUsers = res.data.filter(user => user.role !== "admin");
                setUsers(nonAdminUsers);
                setFilteredUsers(nonAdminUsers); // Initially, set filtered users to non-admin users
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [axiosPublic]);

    // Update user role
    const updateUserRole = (userId) => {
        if (!selectedRole) {
            Swal.fire({
                title: "Please select a role",
                icon: "warning"
            });
            return;
        }

        axiosPublic.put(`/users/${userId}`, { role: selectedRole })
            .then(() => {
                // Update the role of the user in the state
                setUsers(prevUsers => prevUsers.map(user => {
                    if (user._id === userId) {
                        return { ...user, role: selectedRole };
                    }
                    return user;
                }));
                // Update filtered users if the user was filtered
                setFilteredUsers(prevUsers => prevUsers.map(user => {
                    if (user._id === userId) {
                        return { ...user, role: selectedRole };
                    }
                    return user;
                }));

                Swal.fire({
                    title: "Role Updated Successfully",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error('Error updating user role:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update user role.",
                    icon: "error"
                });
            });
    };

    // Search users by name or email
    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        // Filter users based on the search term
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
        );
        setFilteredUsers(filtered);
    };

    // Function to handle role selection
    const handleRoleSelection = (event) => {
        setSelectedRole(event.target.value);
    };

    // Function to open modal and select user
    const openModal = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.role); // Pre-select the current role
        document.getElementById('my_modal_3').showModal(); // Open the modal
    };

    return (
        <div>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Users Table */}
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">
                                {(user.role === "tutor" || user.role === "student") && (
                                    <button
                                        onClick={() => openModal(user)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Update Role
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Role Selection */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* If there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
                        <h3 className="font-bold text-lg">Update User Role</h3>
                        <div className="py-4">
                            <label htmlFor="role">Select Role:</label>
                            <select
                                className="m-4 border px-3 py-2"
                                name="role"
                                value={selectedRole}
                                onChange={handleRoleSelection}
                            >
                                <option value="tutor">tutor</option>
                                <option value="student">student</option>
                            </select>
                            <br />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    updateUserRole(selectedUser._id);
                                    document.getElementById('my_modal_3').close(); // Close the modal after updating role
                                }}
                            >
                                Update Role
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ViewUsers;
