import React from 'react';
import useApprove from '../../../HOOKS/useApprove';
import StudySessionsCard from './StudySessionsCard';
import { NavLink } from 'react-router-dom';

const StudySessions = () => {
    const [approveSession, refetch] = useApprove();

    const displaySessions = approveSession.slice(0, 6);

    return (
        <div className='my-20'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    displaySessions.map(displaySession => <StudySessionsCard key={displaySession._id} displaySession={displaySession}></StudySessionsCard> )
                }
            </div>
            {approveSession.length > 6 && (
                <div className='flex justify-center my-6'>
                <NavLink to='/AllStudySessions'><button className="see-all-sessions btn">See All Sessions</button></NavLink>
                </div>
            )}
        </div>
    );
};

export default StudySessions;
