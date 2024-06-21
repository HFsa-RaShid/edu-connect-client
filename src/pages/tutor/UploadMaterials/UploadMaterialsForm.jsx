import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../HOOKS/useAxiosPublic';
import useAxiosSecure from '../../../HOOKS/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UploadMaterialsForm = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            const materialData = {
                title: data.title,
                googleDriveLink: data.googleDriveLink,
                image: res.data.data.display_url,
                sessionId: id,
                tutorEmail: user.email
            };
            const materialRes = await axiosSecure.post('/materials', materialData);
            if(materialRes.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Materials Uploaded successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                reset(); 
                setLoading(false);
            }
            else{
               
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to upload materials!",
                  });
                  
                setLoading(false);
            }
            
        }
        // console.log(res.data);
        
    };

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <Helmet>
                <title>Upload_Material | EduConnect</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4 pt-20">Upload Material</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <label className="block font-bold">Study Session ID:</label>
                    <input
                        type="text"
                        value={id}
                        readOnly
                        className="input input-bordered w-full bg-gray-200"
                    />
                </div>
                <div>
                    <label className="block font-bold">Tutor Email:</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="input input-bordered w-full bg-gray-200"
                    />
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
                <button type="submit" className="btn btn-outline border-0 border-b-4 border-t-2 border-black text-xl  font-bold w-full" disabled={loading}>
                    {loading ? "Uploading..." : "Upload Material"}
                </button>
            </form>
        </div>
    );
};

export default UploadMaterialsForm;
