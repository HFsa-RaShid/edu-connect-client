import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../HOOKS/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import { useContext, useLayoutEffect, useState } from "react";


const BookedSessionDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [sessionDetails, setSessionDetails] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        axiosSecure.get(`/sessions/${id}`)
            .then((res) => {
                setSessionDetails(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.error("Error fetching session details:", err);
            });
    }, [id, axiosSecure]);

    const {
        title,
        tutorName,
        description,
       
        classStartDate,
        classEndDate,
        duration,
        registrationFee,
    } = sessionDetails;

    return (
        <div className="min-h-screen">
            
            <p className="pt-20">{title}</p>
            <div className="card bg-base-100 shadow-md shadow-black mt-10">
                <div className="card-body text-center">
                    <h2 className="">{title}</h2>
                    <p>{description}</p>
                    <p>{tutorName}</p>
                    <p>{classStartDate}</p>
                    <p>{classEndDate}</p>
                    <p>{duration}</p>
                    <p>{registrationFee}</p>
                    <div className="card-actions justify-end">
                        <button className="btn">Send Review</button>
                
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default BookedSessionDetails;