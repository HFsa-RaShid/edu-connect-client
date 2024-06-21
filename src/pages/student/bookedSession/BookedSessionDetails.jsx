import { useParams } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { useContext, useLayoutEffect, useState } from "react";
import Rating from "./Rating"; 
import Swal from "sweetalert2";
import useUserData from "../../../HOOKS/useUserData";
import useAxiosPublic from "../../../HOOKS/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const BookedSessionDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    const { userData } = useUserData(user?.email);
    const [sessionDetails, setSessionDetails] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState(''); 

    useLayoutEffect(() => {
        axiosPublic.get(`/sessions/${id}`)
            .then((res) => {
                setSessionDetails(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.error("Error fetching session details:", err);
            });
    }, [id, axiosPublic]);

   
    const {
        title,
        tutorName,
        description,
        tutorEmail,
        classStartDate,
        classEndDate,
        duration,
        registrationFee,
    } = sessionDetails;

    const handleSubmit = (event) => {
        event.preventDefault();
        const reviewData = {
            sessionId: id,
            rating,
            reviewText,
            userName: userData.name,
            userImage: userData.image,
            dateTime: new Date().toISOString(),
        };

        axiosPublic.post('/reviews', reviewData)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Sent Review Successfully!',
                    text: 'You have successfully booked the session.',
                    confirmButtonText: 'Ok'
                });
                document.getElementById('my_modal_3').close();
               
                setRating(0);
                setReviewText('');
            })
            .catch((error) => {
                console.error("Error submitting review:", error);
            });
    };

    return (
        <div className="min-h-screen mb-8">
            <Helmet>
                <title>Session_Details | EduConnect</title>
            </Helmet>
            <p className="pt-20 text-2xl font-bold text-center">Details</p>
            <div className="card bg-base-100 shadow-md shadow-black mt-10 text-white" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://i.ibb.co/YXFHRzv/Online-learning-scaled.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h2 className="text-center text-2xl font-semibold pt-6">{title}</h2>
                <div className="card-body text-center">
                    <p className="my-1">{description}</p>
                    <p><span className="font-bold my-1">Tutor Name: </span> {tutorName}</p>
                    <p><span className="font-bold my-1">Tutor Email: </span>{tutorEmail}</p>
                    <p><span className="font-bold my-1">Class Start Date: </span>{classStartDate}</p>
                    <p><span className="font-bold my-1">Class End Date: </span>{classEndDate}</p>
                    <p><span className="font-bold my-1">Duration: </span>{duration}</p>
                    <p><span className="font-bold my-1">Fee: </span>{registrationFee}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-white px-4 font-bold my-2 text-[18px]" onClick={() => document.getElementById('my_modal_3').showModal()}>
                            Send Review
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal structure */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit}>
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
                        <h3 className="font-bold text-lg">Send Review</h3>
                        <div className="p-4">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={rating}
                                onChange={setRating}
                                isRequired
                            />

                            <textarea
                                className="border-2 border-gray-300 p-2 mt-4 w-full"
                                rows="4"
                                placeholder="Enter your review..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                            ></textarea>

                        </div>
                        <div className="flex justify-end p-4">
                            <button type="submit" className="btn btn-outline border-0 border-b-4 border-t-2 border-black px-4 font-bold ">Submit Review</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default BookedSessionDetails;
