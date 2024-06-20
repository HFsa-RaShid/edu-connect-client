import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../HOOKS/useAxiosPublic';
import { AuthContext } from '../../../provider/AuthProvider';
import Swal from 'sweetalert2';

const SessionDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [sessionDetails, setSessionDetails] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState('');
    const [userFee, setUserFee] = useState('');
    const [bookedSessions, setBookedSessions] = useState([]); 
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        axiosPublic.get(`/sessions/${id}`)
            .then((res) => {
                setSessionDetails(res.data);
                 setUserFee(res.data.registrationFee);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.error("Error fetching session details:", err);
            });
    }, [id, axiosPublic]);

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/bookedSession/${id}/${user.email}`)
                .then(res => {
                    setBookedSessions(res.data);
                })
                .catch(error => {
                    console.error("Error fetching booked session data:", error);
                });
        }
    }, [id, user, axiosPublic]);

    useEffect(() => {
        if (user && user.email) {
            axiosPublic.get(`/users/notAll?email=${user.email}`)
                .then(res => {
                    const userData = res.data;
                    if (userData && userData.role) {
                        setUserRole(userData.role);
                    }
                })
                .catch(error => {
                    console.error("Error fetching user role:", error);
                });
        }
    }, [user, axiosPublic]);

    useEffect(() => {
        axiosPublic.get(`/reviews/${id}`)
            .then((res) => {
                setAverageRating(res.data.averageRating); 
            
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
               
            });
    }, [id, axiosPublic]);


    const handleBooking = () => {
        if (userFee === 0) {
            axiosPublic.post('/bookedSession', {
                studentEmail: user?.email,
                sessionId: id,
                tutorEmail: sessionDetails.tutorEmail,
                date: new Date().toISOString()
            })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Successful!',
                    text: 'You have successfully booked the session.',
                    confirmButtonText: 'Ok'
                });
                setBookedSessions([...bookedSessions, res.data]); 
            })
            .catch(error => {
                console.error("Error booking session:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Booking Failed',
                    text: 'Failed to book the session. Please try again later.',
                    confirmButtonText: 'Ok'
                });
            });
        } 
    };


    if (isLoading) return <div className='text-center'>
        <p className="loading loading-spinner loading-lg pt-80"></p>
    </div>;

    const {
        title,
        tutorName,
        description,
        registrationStartDate,
        registrationEndDate,
        classStartDate,
        classEndDate,
        duration,
        registrationFee,
    } = sessionDetails;

    const isRegistrationOver = new Date(registrationEndDate) < new Date();
    const isUserAdminOrTutor = userRole === 'admin' || userRole === 'tutor';
    const isUserFee = userFee === 0 ;

    const isUserBooked = bookedSessions.some(session => session.sessionId === id);

    return (
        <div className="min-h-screen p-8">
            <div className="card  mt-20 bg-base-100 text-white " style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('https://i.ibb.co/YXFHRzv/Online-learning-scaled.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                
                <div className="card-body">
                    <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
                    <div className='w-[80%] mx-auto my-6'>
                        <p className="text-center"><strong>Description: </strong> {description}</p>
                    </div>
                    <div className='md:flex justify-evenly items-center text-[18px]md:text-xl'>
                        <div>
                            <p className="mb-2"><strong>Tutor Name: </strong> {tutorName}</p>
                            <p className="mb-1"><strong>Average Rating: </strong>{averageRating} </p>
                            <p className="mb-1"><strong>Duration: </strong> {duration}</p>
                            <p className="mb-1"><strong>Registration Fee: </strong> {registrationFee === 0 ? 'Free' : `$${registrationFee}`}</p>
                            
                        </div>
                        <div>
                            <p className="mb-1"><strong>Registration Start Date:</strong> {new Date(registrationStartDate).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>Registration End Date:</strong> {new Date(registrationEndDate).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>Class Start Date:</strong> {new Date(classStartDate).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>Class End Date:</strong> {new Date(classEndDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="card-actions justify-center">
                        <NavLink to={`/sessionDetails/${id}/review`}>
                            <button className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-white px-4 font-bold my-2 text-[16px]">Reviews</button>
                        </NavLink>
                        {
                            isRegistrationOver || isUserAdminOrTutor || isUserBooked ? (
                                <button disabled className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-white px-4 font-bold my-2 text-[16px]">Book Now</button>
                            ) : (
                                <>
                                {
                                    isUserFee ? (
                                        <button className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-white px-4 font-bold my-2 text-[16px] ml-2" onClick={handleBooking}>Book Now</button>

                                    ) : (
                                        <Link to={`/sessionDetails/${id}/payment`}>
                                        <button className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-white px-4 font-bold my-2 text-[16px] mx-2">Book Now</button>
                                    </Link>

                                    )

                                }


                                </>
                                
                               
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionDetails;
