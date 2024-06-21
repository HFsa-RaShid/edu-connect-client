
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../HOOKS/useAxiosSecure";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BookedSession = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [bookedSessions, setBookedSessions] = useState([]);
    const [sessionDetails, setSessionDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [areDetailsLoaded, setAreDetailsLoaded] = useState(false);

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
            const fetchDetails = async () => {
                try {
                    const detailsPromises = bookedSessions.map(session => 
                        axiosSecure.get(`/sessions/${session.sessionId}`)
                    );
                    const detailsResponses = await Promise.all(detailsPromises);
                    const newDetails = detailsResponses.reduce((acc, res, index) => {
                        acc[bookedSessions[index].sessionId] = res.data;
                        return acc;
                    }, {});
                    setSessionDetails(newDetails);
                    setAreDetailsLoaded(true);
                } catch (error) {
                    console.error('Error fetching session details:', error);
                }
            };
            fetchDetails();
        }
    }, [bookedSessions, axiosSecure]);

    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Booked_Session | EduConnect</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-4 pt-20 text-center">Booked Sessions</h2>
            {isLoading ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <>
                    {bookedSessions.length === 0 ? (
                        <p>No sessions booked.</p>
                    ) : (
                        !areDetailsLoaded ? (
                            <p>Loading sessions...</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
                                {bookedSessions.map((session) => (
                                    <div key={session.sessionId} className="card bg-base-100 shadow-2xl h-56">
                                        <div className="card-body">
                                            <div>
                                                <p><strong>Session Name:</strong> {sessionDetails[session.sessionId]?.title || 'Session is Removed'}</p>
                                                <p><strong>Instructor:</strong> {sessionDetails[session.sessionId]?.tutorName || 'Session is Removed'}</p>
                                                <p><strong>Class Start Date:</strong> {sessionDetails[session.sessionId]?.classStartDate || 'Session is Removed'}</p>
                                                <NavLink to={`/bookedSessionDetails/${session.sessionId}`}>
                                                    <button className="btn btn-outline border-0 border-b-4 border-t-2 border-black px-4 font-bold mt-8">View Details</button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </>
            )}
        </div>
    );
};

export default BookedSession;
