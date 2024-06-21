

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
        <div className="card bg-base-100 h-[280px] shadow-xl image-full z-10" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://i.ibb.co/G9XH87b/Hand-holding-a-tablet-with-a-light-hologram-of-a-brain-above-it.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {
                    description.length > 120 ? 
                    <p>{description.slice(0,120)}.......
                    
                    </p>
                    :
                    <p>{description}</p>
                
                }
                
                <div className="card-actions">
                    <button className="btn">
                        {isRegistrationOver ? 'Closed' : 'Ongoing'}
                    </button>
                    <NavLink to={`/sessionDetails/${_id}`}><button className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-white px-4 font-bold">Read More</button></NavLink>
                </div>
            </div>
        </div>
    );
};

StudySessionsCard.propTypes = {
    displaySession: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        registrationEndDate: PropTypes.string.isRequired,
    }).isRequired
};
// StudySessionsCard.propTypes = {
//     displaySession: PropTypes.node
// };

export default StudySessionsCard;

