

import { useContext, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useNotes from '../../../HOOKS/useNotes';
import { NavLink } from 'react-router-dom';
import useAxiosPublic from '../../../HOOKS/useAxiosPublic';
import Swal from 'sweetalert2';

const ManageNotes = () => {
    const { user } = useContext(AuthContext);
    const { noteData, refetch, isLoading } = useNotes(user?.email);
    const [selectedNote, setSelectedNote] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const axiosPublic = useAxiosPublic();


    const openModal = (note) => {
        setSelectedNote(note);
        setUpdatedTitle(note.title);
        setUpdatedDescription(note.description);
        document.getElementById('updateModal').showModal();
    };

   
    const handleDelete = (noteId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/notes/${noteId}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your note has been deleted.",
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        refetch(); 
                    })
                    .catch(error => {
                        console.error('Error deleting note:', error);
                    });
            }
        });
    };

    // Function to handle update submission
    const handleUpdate = () => {
        if (!selectedNote) {
            return; 
        }
        axiosPublic.put(`/notes/${selectedNote._id}`, {
            title: updatedTitle,
            description: updatedDescription
        })
        .then(res => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Note Updated",
                showConfirmButton: false,
                timer: 1500
            });
            document.getElementById('updateModal').close();
        })
        .catch(error => {
            console.error('Error updating note:', error);
        });
    };

    return (
        <div className='min-h-screen'>
            <h1 className='pt-20'>Manage Notes</h1>
            {isLoading ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <>
                    {noteData && noteData.length > 0 ? (
                        <div className='grid grid-cols-3 gap-8'>
                            {noteData.map((note) => (
                                <div key={note._id} className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <h2 className="card-title">{note.title}</h2>
                                        {
                                            note.description.length > 100 ? (
                                                <p>{note.description.slice(0, 100)}.......
                                                    <NavLink to={`/noteDetails/${note._id}`}><span className='text-blue-700 font-bold'>Read More</span></NavLink>
                                                </p>
                                            ) : (
                                                <p>{note.description}</p>
                                            )
                                        }
                                        <div className="card-actions justify-end">
                                            <button className="btn" onClick={() => openModal(note)}>Update</button>
                                            <button className="btn" onClick={() => handleDelete(note._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No notes found.</p>
                    )}

                    {/* Modal for update */}
                    <dialog id="updateModal" className="modal">
                        <div className="modal-box">
                            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                                
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('updateModal').close()}>✕</button>
                              
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">Update Note</h2>
                                    {selectedNote && (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    value={updatedTitle}
                                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    id="description"
                                                    value={updatedDescription}
                                                    onChange={(e) => setUpdatedDescription(e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 mr-2">Update</button>
                                                <button type="button" className="btn bg-gray-300 text-gray-700 hover:bg-gray-400" onClick={() => document.getElementById('updateModal').close()}>Cancel</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </form>
                        </div>
                    </dialog>
                </>
            )}
        </div>
    );
};

export default ManageNotes;
