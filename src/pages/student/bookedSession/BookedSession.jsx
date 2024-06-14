import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../HOOKS/useAxiosSecure";
import { NavLink } from "react-router-dom";

const BookedSession = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [bookedSessions, setBookedSessions] = useState([]); 
    const [sessionDetails, setSessionDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/bookedSession/${user.email}`)
                .then(res => {
                    setBookedSessions(res.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching booked sessions:', error);
                    setIsLoading(false);
                });
        }
    }, [axiosSecure, user]);

    useEffect(() => {
        if (bookedSessions.length > 0) {
            bookedSessions.forEach(session => {
                axiosSecure.get(`/sessions/${session.sessionId}`)
                    .then(res => {
                        setSessionDetails(prevDetails => ({
                            ...prevDetails,
                            [session.sessionId]: res.data
                        }));
                    })
                    .catch(error => {
                        console.error('Error fetching session details:', error);
                    });
            });
        }
    }, [bookedSessions, axiosSecure]);

    return (
        <div className="min-h-screen">
            <h2 className="text-2xl font-bold mb-4 pt-20">Booked Sessions</h2>
            {isLoading ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10 ">
                    {bookedSessions.map((session) => (
                        <div key={session.sessionId} className="card bg-base-100 shadow-2xl h-56">
                            <div className="card-body">
                               
                                {sessionDetails[session.sessionId] ? (
                                    <div>
                                        <p><strong>Session Name:</strong> {sessionDetails[session.sessionId].title}</p>
                                        <p><strong>Instructor:</strong> {sessionDetails[session.sessionId].tutorName}</p>
                                        <p><strong>Class Start Date:</strong> {sessionDetails[session.sessionId].classStartDate}</p>
                                        <NavLink to={`/bookedSessionDetails/${session.sessionId}`}>
                                            <button className="btn mt-4">View Details</button>
                                        </NavLink>
                                    </div>
                                ) : (
                                    <p>Loading details...</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookedSession;
