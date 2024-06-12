import React from 'react';
import useApprove from '../../../HOOKS/useApprove';
import StudySessionsCard from './StudySessionsCard';

const StudySessions = () => {
    const [approveSession, refetch] = useApprove();

    // Display between 3 to 6 sessions
    const displaySessions = approveSession.slice(0, 6);

    return (
        <div className='my-20'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    displaySessions.map(displaySession => <StudySessionsCard key={displaySession._id} displaySession={displaySession}></StudySessionsCard> )
                }
            </div>
            {approveSession.length > 6 && (
                <button className="see-all-sessions">See All Sessions</button>
            )}
        </div>
    );
};

export default StudySessions;
