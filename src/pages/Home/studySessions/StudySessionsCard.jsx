

import React from 'react';
import { NavLink } from 'react-router-dom';

const StudySessionsCard = ({ displaySession }) => {
    const {
        _id,
        title,
        tutorName,
        description,
        tutorEmail,
        registrationStartDate,
        registrationEndDate
    } = displaySession;

    // Determine if the registration is ongoing or closed
    const isRegistrationOver = new Date(registrationEndDate) < new Date();

    return (
        <div className="card bg-base-100 h-[280px] shadow-xl image-full">
            <figure>
                <img src="https://i.ibb.co/YXFHRzv/Online-learning-scaled.jpg" alt="Session" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions">
                    <button className="btn">
                        {isRegistrationOver ? 'Closed' : 'Ongoing'}
                    </button>
                    <NavLink to={`/sessionDetails/${_id}`}><button className="btn">Read More</button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default StudySessionsCard;
