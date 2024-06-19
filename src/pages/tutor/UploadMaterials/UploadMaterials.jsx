import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../../HOOKS/useAxiosSecure";
import useAxiosSessionsByTutor from "../../../HOOKS/useAxiosSessionsByTutor";
import { AuthContext } from "../../../provider/AuthProvider";


const UploadMaterials = () => {

    const { user, loading } = useContext(AuthContext);
    const [Loading, setLoading] = useState(true);
    const { refetch } = useAxiosSessionsByTutor();
    const [approvedSessions, setApprovedSessions] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!loading && user) {
            axiosSecure.get(`/sessionsByTutor/${user.email}?status=approved`)
                .then(response => {
                   
                    setApprovedSessions(response.data);
                    refetch();
                    setLoading(false);
                    
                })
                .catch(error => {
                    console.error('Error fetching approved sessions:', error);
                    setLoading(false);
                });

          
        }
    }, [axiosSecure, user, loading,refetch]);
    return (
        <div className="min-h-screen">
            <h2 className="text-xl font-semibold mb-2 pt-20">Approved Sessions</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Upload</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            {Loading ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : <tbody>
            {approvedSessions.map(session => (
                <tr key={session._id} className="text-center">
                    <td className="border px-4 py-2">{session.title}</td>
                    <td className="border px-4 py-2">
                    <NavLink to={`/studyMaterials/${session._id}`}>
                        <button className="btn btn-outline border-0 border-b-4 border-t-2 border-black">
                            Upload Study Materials
                        </button>
                        </NavLink>
                    </td>
                    <td className="border px-4 py-2 text-green-600 font-semibold">{session.status}</td>
                    
                </tr>
            ))}
        </tbody>
}
                            
                        </table>
                    </div>
            
        </div>
    );
};

export default UploadMaterials;