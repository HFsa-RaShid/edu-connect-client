
import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../HOOKS/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ViewUsers = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); 
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['users', searchTerm],
        queryFn: async () => {
            const url = searchTerm ? `/searchUsers?q=${encodeURIComponent(searchTerm)}` : '/users';
            const res = await axiosSecure.get(url);
            return res.data;
        },
    });

    const updateUserRole = (userId) => {
        axiosSecure.put(`/users/${userId}`, { role: selectedRole })
            .then(() => {
                refetch(); 
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

    const openModal = (user) => {
        setSelectedUser(user);
        setSelectedRole(user.role);
        document.getElementById('my_modal_3').showModal();
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <div className='min-h-screen mb-4'>
            <h1 className="pt-20 text-center font-bold text-3xl">Users</h1>

            <div className="flex justify-center mt-4 mb-4">
                <input
                    type="text"
                    className="border px-4 py-2"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

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
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2 flex justify-center">
                                <img src={user.image} className='w-[40px] h-[40px] rounded-full' alt={`${user.name}'s profile`} />
                            </td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => openModal(user)}
                                    className="btn btn-outline border-0 border-b-4 border-t-2 border-black"
                                >
                                    Update Role
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                                    onChange={(event) => setSelectedRole(event.target.value)}
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
