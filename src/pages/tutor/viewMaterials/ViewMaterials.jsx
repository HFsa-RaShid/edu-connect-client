

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../HOOKS/useAxiosSecure';
import useAxiosPublic from '../../../HOOKS/useAxiosPublic'; 
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewMaterials = () => {
    const { user } = useContext(AuthContext);
    const [materials, setMaterials] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const image_hosting_key = import.meta.env.VITE_image_hosting_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`; 

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    useEffect(() => {
        if (user) {
            axiosSecure.get(`/materials/email/${user?.email}`)
                .then(response => {
                    const materialsData = Array.isArray(response.data) ? response.data : [];
                    setMaterials(materialsData);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching materials:', error);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    const handleDelete = (id) => {
        axiosSecure.delete(`/materials/${id}`)
            .then(res => {
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
                        setMaterials(materials.filter(material => material._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                });
            })
            .catch(error => {
                console.error('Error deleting material:', error);
                Swal.fire('Error!', 'An error occurred while deleting the material.', 'error');
            });
    };

    const handleUpdateClick = (material) => {
        setSelectedMaterial(material);
        setValue('title', material.title);
        setValue('googleDriveLink', material.googleDriveLink);
        setValue('image', material.image);
        document.getElementById('update_modal').showModal();
    };

    const onSubmit = (data) => {
        setLoading(true);
        const imageFile = { image: data.image[0] };
        axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            if (res.data.success) {
                const materialData = {
                    title: data.title,
                    googleDriveLink: data.googleDriveLink,
                    image: res.data.data.display_url,
                };
                axiosSecure.put(`/materials/${selectedMaterial?._id}`, materialData)
                    .then(materialRes => {
                        if (materialRes.data.modifiedCount > 0) {
                            setMaterials(materials.map(material => material._id === selectedMaterial?._id ? { ...material, ...materialData } : material));
                            toast.success('Materials updated successfully');
                            reset();
                            document.getElementById('update_modal').close();
                        }
                    })
                    .catch(error => {
                        console.error('Error updating material:', error);
                        toast.error('An error occurred while updating the material');
                    })
                    .finally(() => setLoading(false));
            } else {
                toast.error('Failed to upload image');
                setLoading(false);
            }
        }).catch(error => {
            console.error('Error uploading image:', error);
            toast.error('An error occurred while uploading the image');
            setLoading(false);
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
            {loading ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                materials.length === 0 ? (
                    <p>No materials uploaded yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {materials.map(material => (
                            <div key={material._id} className="card  bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{material.title}</h2>
                                    <a href={material.googleDriveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                            Drive Link
                                                        </a>
                                    {/* {material.image && (
                                        <div className="card-image">
                                            <img src={material.image} alt={material.title} className="w-full h-auto" />
                                        </div>
                                    )} */}
                                    <div className="card-actions justify-end">
                                    <button className="btn btn-danger" onClick={() => handleShowImage(material.image)}>See Image</button>
                                        <button className="btn btn-danger" onClick={() => handleUpdateClick(material)}>Update</button>
                                        
                                        <button className="btn btn-danger" onClick={() => handleDelete(material._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            <dialog id="update_modal" className="modal">
                <div className="modal-box">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => document.getElementById('update_modal').close()}>✕</button>
                        <h3 className="font-bold text-lg">Update Material</h3>
                        <div>
                            <label className="block font-bold">Title:</label>
                            <input
                                type="text"
                                {...register("title", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.title && <span className="text-red-600">Title is required</span>}
                        </div>
                   
                        <div>
                            <label className="block font-bold">Google Drive Link:</label>
                            <input
                                type="text"
                                {...register("googleDriveLink", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.googleDriveLink && <span className="text-red-600">Google Drive link is required</span>}
                        </div>
                        <div>
                            <label className="block font-bold">Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("image", { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.image && <span className="text-red-600">Image is required</span>}
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            {loading ? "Uploading..." : "Update Material"}
                        </button>
                    </form>
                </div>
            </dialog>

            {selectedImage && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>✕</button>
                        <img src={selectedImage} alt="Material" className="w-full h-auto" />
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default ViewMaterials;

