import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../HOOKS/useAxiosSecure';

const ViewMaterials = () => {
    const { user } = useContext(AuthContext);
    const [materials, setMaterials] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if ( user) {
            axiosSecure.get(`/materials/${user?.email}`)
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
    }, [user,axiosSecure]);

    return (
        <div className="min-h-screen p-4">
        <h2 className="text-2xl font-semibold mb-4">Uploaded Materials</h2>
        {Loading ? (
            <div className="text-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
                ) : 
        // {materials.length === 0 ? (
        //     <p>No materials uploaded yet.</p>
        // ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map(material => (
                    <div key={material._id} className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{material.title}</h2>
                            <p>Google Drive Link: <a href={material.googleDriveLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">{material.googleDriveLink}</a></p>
                            {material.imageLink && (
                                <div className="card-image">
                                    <img src={material.imageLink} alt={material.title} className="w-full h-auto" />
                                </div>
                            )}
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        // )}
    }
    </div>
    );
};

export default ViewMaterials;
