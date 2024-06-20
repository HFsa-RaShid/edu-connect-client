

import  { useEffect, useState, useContext } from 'react';
import useAxiosSecure from "../../../HOOKS/useAxiosSecure";
import { AuthContext } from '../../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { FiDownload } from "react-icons/fi";

const BookedSessionMaterials = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [bookedSessions, setBookedSessions] = useState([]);
    const [sessionMaterials, setSessionMaterials] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchBookedSessions = async () => {
            try {
                const response = await axiosSecure.get(`/bookedSession/${user.email}`);
                // console.log('Booked Sessions:', response.data);
                setBookedSessions(response.data);
            } catch (error) {
                console.error('Error fetching booked sessions:', error);
            }
        };

        if (user?.email) {
            fetchBookedSessions();
        }
    }, [axiosSecure, user]);

    useEffect(() => {
        const fetchMaterialsForSessions = async () => {
            const materialsPromises = bookedSessions.map(async (session) => {
                try {
                    const response = await axiosSecure.get(`/materials/session/${session.sessionId}`);
                    // console.log(`Materials for session ${session.sessionId}:`, response.data); 
                    return { sessionId: session.sessionId, materials: response.data };
                } catch (error) {
                    console.error(`Error fetching materials for session ${session.sessionId}:`, error);
                    return { sessionId: session.sessionId, materials: [] };
                }
            });

            const materialsResults = await Promise.all(materialsPromises);
            const materialsMap = materialsResults.reduce((acc, { sessionId, materials }) => {
                acc[sessionId] = materials;
                return acc;
            }, {});

            // console.log('Materials Map:', materialsMap);
            setSessionMaterials(materialsMap);
        };

        if (bookedSessions.length > 0) {
            fetchMaterialsForSessions();
        }
    }, [axiosSecure, bookedSessions]);

    const handleShowImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleDownloadImage = (imageUrl, title) => {
        Swal.fire({
            title: `Download ${title}`,
            showCancelButton: true,
            confirmButtonText: 'Download',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = title;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    Swal.close();
                } catch (error) {
                    console.error('Error downloading image:', error);
                    Swal.showValidationMessage('Download failed');
                }
            }
        });
    };

    return (
        <div className="flex flex-col items-center space-y-4 min-h-screen mb-10">
            <p className='pt-20 text-2xl font-bold text-center pb-6'>Materials</p>
            {bookedSessions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {bookedSessions.map((session) => (
                        <div key={session.sessionId} className="card bg-base-100 shadow-xl">
                            <div className="card-body ">
                                
                                <div>
                                    {sessionMaterials[session.sessionId]?.length > 0 ? (
                                        <ul>
                                            {sessionMaterials[session.sessionId].map((material) => (
                                                <li key={material._id} className="grid grid-col-1 w-96 items-center  text-center">
                                                    <div>
                                                        <h3 className="text-2xl font-semibold mb-4">{material.title}</h3>
                                                        <a href={material.googleDriveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                            Drive Link
                                                        </a>
                                                    </div>
                                                    <div>
                                                    <button className="btn btn-outline border-0 border-b-4 border-t-2 border-black  px-8  font-bold my-4" onClick={() => handleShowImage(material.image)}>See Image</button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No materials found for this session.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No booked sessions found.</p>
            )}

            {selectedImage && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>✕</button>
                        <img src={selectedImage} alt="Material" className="w-[80%] md:w-full h-[400px] md:h-[480px]" />
                        <div className="mt-4 flex justify-center">
                            <button className="btn btn-outline border-0 border-b-4 border-t-2 border-black  px-8 font-bold" onClick={() => handleDownloadImage(selectedImage, 'Material Image')}><span>Download</span> <FiDownload /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookedSessionMaterials;
