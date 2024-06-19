
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../HOOKS/useAxiosSecure';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosMaterials from '../../../HOOKS/useAxiosMaterials';

const ViewAllMaterials = () => {
    const { user } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();
    const { material, refetch, isLoading } = useAxiosMaterials(currentPage);

    useEffect(() => {
        if (user) {
            refetch();
        }
    }, [user, refetch, currentPage]);

    useEffect(() => {
        const fetchSessions = async () => {
            if (material.materials.length > 0) {
                const sessionIds = material.materials.map(material => material.sessionId);
                Promise.all(sessionIds.map(sessionId => 
                    axiosSecure.get(`/sessions/${sessionId}`)
                        .then(response => response.data)
                        .catch(error => {
                            console.error('Error fetching session:', error);
                            return null;
                        })
                ))
                .then(sessionsData => {
                    setSessions(sessionsData.filter(session => session !== null));
                })
                .catch(error => {
                    console.error('Error fetching sessions:', error);
                });
            }
        };

        fetchSessions();
    }, [material, axiosSecure]);

    const handleDeleteMaterial = (id) => {
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
                axiosSecure.delete(`/materials/${id}`)
                    .then(res => {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.error('Error deleting material:', error);
                        Swal.fire('Error!', 'An error occurred while deleting the material.', 'error');
                    });
            }
        });
    };

    const handleShowImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    

    return (
        <div className="min-h-screen p-4">
            <h2 className="text-2xl font-semibold mb-4 pt-20">Uploaded Materials</h2>
            {isLoading ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {material.materials.map(material => (
                        <div key={material._id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{material.title}</h2>
                                {sessions.map(session => {
                                    if (session._id === material.sessionId) {
                                        return (
                                            <div key={session._id}>
                                                <p className="card-subtitle">Session End Date: {session.classEndDate}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                                <a href={material.googleDriveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                            Drive Link
                                                        </a>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-outline border-0 border-b-4 border-t-2 border-black" onClick={() => handleShowImage(material.image)}>See Image</button>
                                   
                                    <button className="btn bg-red-800 text-white" onClick={() => handleDeleteMaterial(material._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedImage && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>✕</button>
                        <img src={selectedImage} alt="Material" className="w-full h-auto" />
                    </div>
                </div>
            )}

            <div className="join mt-4">
                {[...Array(material.totalPages).keys()].map(page => (
                    <button
                        key={page + 1}
                        className={`join-item btn ${currentPage === page + 1 ? 'btn-active' : ''}`}
                        onClick={() => setCurrentPage(page + 1)}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
};

export default ViewAllMaterials;
