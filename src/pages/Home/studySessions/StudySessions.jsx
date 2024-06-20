
import useApprove from '../../../HOOKS/useApprove';
import StudySessionsCard from './StudySessionsCard';
import { NavLink } from 'react-router-dom';

const StudySessions = () => {
    const [approveSession, refetch] = useApprove();

    const displaySessions = approveSession.slice(0, 6);

    return (
        <div className='my-16'>
            <p className='text-3xl font-bold text-center mb-8'>Study Sessions</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    displaySessions.map(displaySession => <StudySessionsCard key={displaySession._id} displaySession={displaySession}></StudySessionsCard> )
                }
            </div>
            {approveSession.length > 6 && (
                <div className='flex justify-center my-6'>
                <NavLink to='/AllStudySessions'><button className="btn btn-outline border-0 border-b-4 border-t-2 border-black  px-10 text-xl font-bold">See All Sessions</button></NavLink>
                </div>
            )}
        </div>
    );
};

export default StudySessions;