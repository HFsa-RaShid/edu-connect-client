import { useEffect, useState } from "react";
import useAxiosSessions from "../../../HOOKS/useAxiosSessions";


const ViewStudySessions = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSessions = useAxiosSessions();

    useEffect(() => {
            axiosSessions.get('/')
                .then(res => {
                    setSessions(res.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });

    }, [axiosSessions]);
    return (
        <div className="min-h-screen">
            <h1 className="pt-20 text-center font-bold text-3xl">All Sessions</h1>
            <div>
            {loading ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 px-4">
                    {sessions.map(allSessions => (
                        
                        <div key={allSessions._id} className=" card w-96 bg-neutral text-neutral-content">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Cookies!</h2>
                                <p>We are using cookies for no reason.</p>
                                <div className="card-actions justify-end">
                                <button className="btn btn-primary">Accept</button>
                                <button className="btn btn-ghost">Deny</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default ViewStudySessions;