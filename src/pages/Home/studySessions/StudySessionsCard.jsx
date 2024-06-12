

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const StudySessionsCard = ({ displaySession }) => {
    const {
        _id,
        title,
        description,
        registrationEndDate
    } = displaySession;

    const isRegistrationOver = new Date(registrationEndDate) < new Date();

    return (
        <div className="card bg-base-100 h-[280px] shadow-xl image-full">
            <figure>
                <img src="https://i.ibb.co/G9XH87b/Hand-holding-a-tablet-with-a-light-hologram-of-a-brain-above-it.jpg" alt="Session" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {
                    description.length > 150 ? 
                    <p>{description.slice(0,150)}.......
                    
                    </p>
                    :
                    <p>{description}</p>
                   

                }
                {/* <p>{description}</p> */}
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

StudySessionsCard.propTypes = {
    displaySession: PropTypes.node
};