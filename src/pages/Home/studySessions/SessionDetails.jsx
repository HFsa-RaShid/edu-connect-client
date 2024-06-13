import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../HOOKS/useAxiosPublic';
import { AuthContext } from '../../../provider/AuthProvider';

const SessionDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [sessionDetails, setSessionDetails] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        axiosPublic.get(`/sessions/${id}`)
            .then((res) => {
                setSessionDetails(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }, [id, axiosPublic]);

    useEffect(() => {
        if (user && user.email) {
          axiosPublic.get(`/users?email=${user?.email}`)
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

    return (
        <div className="min-h-screen p-8">
            <div className="card h-[450px] mt-20 bg-base-100 shadow-xl image-full z-10">
                <figure>
                    <img src="https://i.ibb.co/YXFHRzv/Online-learning-scaled.jpg" className='w-full h-full' />
                </figure>
                <div className="card-body">
                    <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
                    <div className='w-[80%] mx-auto my-6'>
                    <p className="text-center"><strong>Description:</strong> {description}</p>
                    </div>
                    <div className='flex justify-evenly items-center text-xl'>
                        <div>
                            <p className="mb-2"><strong>Tutor Name:</strong> {tutorName}</p>
                            <p className="mb-1"><strong>Average Rating:</strong> </p>
                            <p className="mb-1"><strong>Duration:</strong> {duration}</p>
                            <p className="mb-1"><strong>Registration Fee:</strong> {registrationFee === 0 ? 'Free' : `$${registrationFee}`}</p>
                            <p className="mb-1"><strong>Reviews:</strong> </p>
                        </div>
                        <div>
                            <p className="mb-1"><strong>Registration Start Date:</strong> {new Date(registrationStartDate).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>Registration End Date:</strong> {new Date(registrationEndDate).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>Class Start Date:</strong> {new Date(classStartDate).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>Class End Date:</strong> {new Date(classEndDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="card-actions justify-center">
                        
                        
                            {
                                isRegistrationOver || isUserAdminOrTutor ?
                                <button disabled className='btn'>Book Now</button>
                                :
                                
                                <Link to={`/sessionDetails/${id}/payment`}>
                                <button className='btn'>Book Now</button>
                                </Link>


                            }
                            
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionDetails;


// import { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import useAxiosPublic from '../../../HOOKS/useAxiosPublic';
// import { AuthContext } from '../../../provider/AuthProvider';

// const SessionDetails = () => {
//     const { id } = useParams();
//     const axiosPublic = useAxiosPublic();
//     const { user } = useContext(AuthContext);
//     const [sessionDetails, setSessionDetails] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const [userRole, setUserRole] = useState('');
//     const [bookedSession, setBookedSession] = useState(''); // Initialize bookedSession as null

//     useEffect(() => {
//         axiosPublic.get(`/sessions/${id}`)
//             .then((res) => {
//                 setSessionDetails(res.data);
//                 setIsLoading(false);
//             })
//             .catch((err) => {
//                 setIsLoading(false);
//             });
//     }, [id, axiosPublic]);

//     useEffect(() => {
        
//             axiosPublic.get(`/bookedSession/${user?.email}`)
//                 .then(res => {
//                     console.log(res.data)
//                     setBookedSession(res.data);
//                 })
//                 .catch(error => {
//                     console.error("Error fetching booked session data:", error);
//                 });
        
//     }, [sessionDetails, user, axiosPublic]);

//     useEffect(() => {
//         if (user && user.email) {
//             axiosPublic.get(`/users?email=${user?.email}`)
//                 .then(res => {
//                     const userData = res.data;
//                     if (userData && userData.role) {
//                         setUserRole(userData.role);
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Error fetching user role:", error);
//                 });
//         }
//     }, [user, axiosPublic]);

//     if (isLoading) return <div className='text-center'>
//         <p className="loading loading-spinner loading-lg pt-80"></p>
//     </div>;

//     const {
//         title,
//         tutorName,
//         description,
//         registrationStartDate,
//         registrationEndDate,
//         classStartDate,
//         classEndDate,
//         duration,
//         registrationFee,
//     } = sessionDetails;

//     const isRegistrationOver = new Date(registrationEndDate) < new Date();
//     const isUserAdminOrTutor = userRole === 'admin' || userRole === 'tutor';
//     const isUserBooked = bookedSession && bookedSession.paymentStatus === 'succeeded'; // Check if user has successfully booked

//     return (
//         <div className="min-h-screen p-8">
//             <div className="card h-[450px] mt-20 bg-base-100 shadow-xl image-full z-10">
//                 <figure>
//                     <img src="https://i.ibb.co/YXFHRzv/Online-learning-scaled.jpg" className='w-full h-full' alt="Session Image" />
//                 </figure>
//                 <div className="card-body">
//                     <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
//                     <div className='w-[80%] mx-auto my-6'>
//                         <p className="text-center"><strong>Description:</strong> {description}</p>
//                     </div>
//                     <div className='flex justify-evenly items-center text-xl'>
//                         <div>
//                             <p className="mb-2"><strong>Tutor Name:</strong> {tutorName}</p>
//                             <p className="mb-1"><strong>Average Rating:</strong> </p>
//                             <p className="mb-1"><strong>Duration:</strong> {duration}</p>
//                             <p className="mb-1"><strong>Registration Fee:</strong> {registrationFee === 0 ? 'Free' : `$${registrationFee}`}</p>
//                             <p className="mb-1"><strong>Reviews:</strong> </p>
//                         </div>
//                         <div>
//                             <p className="mb-1"><strong>Registration Start Date:</strong> {new Date(registrationStartDate).toLocaleDateString()}</p>
//                             <p className="mb-1"><strong>Registration End Date:</strong> {new Date(registrationEndDate).toLocaleDateString()}</p>
//                             <p className="mb-1"><strong>Class Start Date:</strong> {new Date(classStartDate).toLocaleDateString()}</p>
//                             <p className="mb-1"><strong>Class End Date:</strong> {new Date(classEndDate).toLocaleDateString()}</p>
//                         </div>
//                     </div>
//                     <div className="card-actions justify-center">
//                         {
//                             isRegistrationOver || isUserAdminOrTutor || isUserBooked ? (
//                                 <button disabled className='btn'>Book Now</button>
//                             ) : (
//                                 <Link to={`/sessionDetails/${id}/payment`}>
//                                     <button className='btn'>Book Now</button>
//                                 </Link>
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SessionDetails;


// import { useContext, useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import useAxiosPublic from '../../../HOOKS/useAxiosPublic';
// import { AuthContext } from '../../../provider/AuthProvider';

// const SessionDetails = () => {
//     const { id } = useParams();
//     const axiosPublic = useAxiosPublic();
//     const { user } = useContext(AuthContext);
//     const [sessionDetails, setSessionDetails] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const [userRole, setUserRole] = useState('');
//     const [bookedSessions, setBookedSessions] = useState([]);

//     useEffect(() => {
//         axiosPublic.get(`/sessions/${id}`)
//             .then((res) => {
//                 setSessionDetails(res.data);
//                 setIsLoading(false);
//             })
//             .catch((err) => {
//                 setIsLoading(false);
//                 console.error('Error fetching session details:', err);
//             });
//     }, [id, axiosPublic]);

//     useEffect(() => {
     
//             axiosPublic.get(`/bookedSession/${user?.email}`)
//                 .then(res => {
//                     console.log(res.data)
//                     setBookedSessions(res.data);
//                 })
//                 .catch(error => {
//                     console.error("Error fetching booked session data:", error);
//                 });
      
//     }, [id, user, axiosPublic]);

//     useEffect(() => {
//         if (user && user.email) {
//             axiosPublic.get(`/users?email=${user.email}`)
//                 .then(res => {
//                     const userData = res.data;
//                     if (userData && userData.role) {
//                         setUserRole(userData.role);
//                     }
//                 })
//                 .catch(error => {
//                     console.error("Error fetching user role:", error);
//                 });
//         }
//     }, [user, axiosPublic]);

//     if (isLoading) return <div className='text-center'>
//         <p className="loading loading-spinner loading-lg pt-80"></p>
//     </div>;

//     const {
//         title,
//         tutorName,
//         description,
//         registrationStartDate,
//         registrationEndDate,
//         classStartDate,
//         classEndDate,
//         duration,
//         registrationFee,
//     } = sessionDetails || {};

//     const isRegistrationOver = new Date(registrationEndDate) < new Date();
//     const isUserAdminOrTutor = userRole === 'admin' || userRole === 'tutor';
//     const isUserBooked = bookedSessions.some(session => session.sessionId === id);

//     return (
//         <div className="min-h-screen p-8">
//             <div className="card h-[450px] mt-20 bg-base-100 shadow-xl image-full z-10">
//                 <figure>
//                     <img src="https://i.ibb.co/YXFHRzv/Online-learning-scaled.jpg" className='w-full h-full' alt="Session Image" />
//                 </figure>
//                 <div className="card-body">
//                     <h1 className="text-3xl font-bold mb-2 text-center">{title}</h1>
//                     <div className='w-[80%] mx-auto my-6'>
//                         <p className="text-center"><strong>Description:</strong> {description}</p>
//                     </div>
//                     <div className='flex justify-evenly items-center text-xl'>
//                         <div>
//                             <p className="mb-2"><strong>Tutor Name:</strong> {tutorName}</p>
//                             <p className="mb-1"><strong>Average Rating:</strong> </p>
//                             <p className="mb-1"><strong>Duration:</strong> {duration}</p>
//                             <p className="mb-1"><strong>Registration Fee:</strong> {registrationFee === 0 ? 'Free' : `$${registrationFee}`}</p>
//                             <p className="mb-1"><strong>Reviews:</strong> </p>
//                         </div>
//                         <div>
//                             <p className="mb-1"><strong>Registration Start Date:</strong> {new Date(registrationStartDate).toLocaleDateString()}</p>
//                             <p className="mb-1"><strong>Registration End Date:</strong> {new Date(registrationEndDate).toLocaleDateString()}</p>
//                             <p className="mb-1"><strong>Class Start Date:</strong> {new Date(classStartDate).toLocaleDateString()}</p>
//                             <p className="mb-1"><strong>Class End Date:</strong> {new Date(classEndDate).toLocaleDateString()}</p>
//                         </div>
//                     </div>
//                     <div className="card-actions justify-center">
//                         {
//                             isRegistrationOver || isUserAdminOrTutor || isUserBooked ? (
//                                 <button disabled className='btn'>Book Now</button>
//                             ) : (
//                                 <Link to={`/sessionDetails/${id}/payment`}>
//                                     <button className='btn'>Book Now</button>
//                                 </Link>
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SessionDetails;
