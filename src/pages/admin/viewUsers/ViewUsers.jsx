
import  { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from "../../../HOOKS/useAxiosPublic";

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/users')
            .then(res => {
                const nonAdminUsers = res.data;
                setUsers(nonAdminUsers);
                setFilteredUsers(nonAdminUsers); 
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [axiosPublic]);

    // Update user role
    const updateUserRole = (userId) => {

        axiosPublic.put(`/users/${userId}`, { role: selectedRole })
            .then(() => {
                setUsers(prevUsers => prevUsers.map(user => {
                    if (user._id === userId) {
                        return { ...user, role: selectedRole };
                    }
                    return user;
                }));
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
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        
        if (searchTerm === "") {
            setFilteredUsers(users);
        } else {
            axiosPublic.get(`/searchUsers?q=${searchTerm}`)
                .then(res => {
                    setFilteredUsers(res.data.filter(user => user.role !== "admin"));
                })
                .catch(error => {
                    console.error('Error searching users:', error);
                });
        }
    };

    const handleRoleSelection = (event) => {
        setSelectedRole(event.target.value);
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.role);
        document.getElementById('my_modal_3').showModal();
    };

    return (
        <div className='min-h-screen mb-4'>
            <h1 className="pt-20 text-center font-bold text-3xl">Users</h1>
            <div className="flex justify-center py-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by name or email"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            {/* Users Table */}
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Photo</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(filteredUsers) && filteredUsers.map(user => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2 flex justify-center">
                                <img src={user.image} className='w-[40px] h-[40px] rounded-full' />
                            </td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">
                                {(user.role === "tutor" || user.role === "student") && (
                                    <button
                                        onClick={() => openModal(user)}
                                        className="btn btn-outline border-0 border-b-4 border-t-2 border-black"
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
                    {selectedUser && (
                        <form method="dialog">
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
                                    className="btn btn-outline border-0 border-b-4 border-t-2 border-black"
                                    onClick={() => {
                                        updateUserRole(selectedUser._id);
                                        document.getElementById('my_modal_3').close();
                                    }}
                                >
                                    Update Role
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default ViewUsers;



