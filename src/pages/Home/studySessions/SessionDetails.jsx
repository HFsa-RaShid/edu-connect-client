import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../HOOKS/useAxiosPublic';

const SessionDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [sessionDetails, setSessionDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosPublic.get(`/sessions/${id}`)
            .then((res) => {
                setSessionDetails(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [id, axiosPublic]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading session details: {error.message}</p>;

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

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="mb-2"><strong>Tutor Name:</strong> {tutorName}</p>
            <p className="mb-2"><strong>Average Rating:</strong> {/* Add average rating */}</p>
            <p className="mb-2"><strong>Description:</strong> {description}</p>
            <p className="mb-2"><strong>Registration Start Date:</strong> {new Date(registrationStartDate).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Registration End Date:</strong> {new Date(registrationEndDate).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Class Start Date:</strong> {new Date(classStartDate).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Class End Date:</strong> {new Date(classEndDate).toLocaleDateString()}</p>
            <p className="mb-2"><strong>Duration:</strong> {duration}</p>
            <p className="mb-2"><strong>Registration Fee:</strong> {registrationFee === 0 ? 'Free' : `$${registrationFee}`}</p>
            <p className="mb-4"><strong>Reviews:</strong> {/* Add reviews */}</p>
            <button
                className={`btn ${isRegistrationOver ? 'btn-disabled' : 'btn-primary'}`}
                disabled={isRegistrationOver}
            >
                {isRegistrationOver ? 'Registration Closed' : 'Book Now'}
            </button>
            
        </div>
    );
};

export default SessionDetails;
