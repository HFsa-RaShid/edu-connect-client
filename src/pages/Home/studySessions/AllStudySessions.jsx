import useApprove from "../../../HOOKS/useApprove";
import StudySessionsCard from "./StudySessionsCard";


const AllStudySessions = () => {
    const [approveSession, refetch] = useApprove();
    return (
        <div className=''>
            <h1 className="pt-20 text-center font-bold text-3xl">All Study Sessions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
            {
                approveSession.map(displaySession => <StudySessionsCard key={displaySession._id} displaySession={displaySession}></StudySessionsCard> )
            }
        </div>
       
    </div>
    );
};

export default AllStudySessions;