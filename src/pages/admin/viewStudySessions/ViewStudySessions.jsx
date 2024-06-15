
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAxiosPublic from "../../../HOOKS/useAxiosPublic";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import useAxiosSessions from "../../../HOOKS/useAxiosSessions";

const ViewStudySessions = () => {
    const { sessions, refetch, isLoading } = useAxiosSessions();
    const [selectedSession, setSelectedSession] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [feedback, setFeedback] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");
    const [updateRegistrationFee, setUpdateRegistrationFee] = useState("");
    const axiosPublic = useAxiosPublic();

    // Function to open/close modals
    const openModal = (modalId) => {
        document.getElementById(modalId).showModal();
    };

    const closeModal = (modalId) => {
        document.getElementById(modalId).close();
        
        setRejectionReason("");
        setFeedback("");
        setUpdateTitle("");
        setUpdateDescription("");
        setUpdateRegistrationFee("");
    };

    const approveSession = (sessionId) => {
        const session = sessions.find(session => session._id === sessionId);
        setSelectedSession(session);
        openModal('my_modal_3');
    };

    const rejectSession = (sessionId) => {
        const session = sessions.find(session => session._id === sessionId);
        setSelectedSession(session);
        openModal('reject_modal');
    };

    const handleRejectSubmit = (e) => {
        e.preventDefault();
        const { _id: sessionId } = selectedSession;
        axiosPublic.put(`/rejectSession/${sessionId}`, { status: 'rejected', rejectionReason, feedback })
            .then(() => {
                refetch();
                Swal.fire({
                    title: "Rejected!",
                    text: "The session has been rejected.",
                    icon: "success"
                });
                closeModal('reject_modal'); 
            })
            .catch(error => {
                console.error('Error rejecting session:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to reject the session.",
                    icon: "error"
                });
            });
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        const { sessionType, amount } = e.target;
        const registrationFee = sessionType.value === 'paid' ? parseFloat(amount.value) : 0;
        axiosPublic.put(`/approveSession/${selectedSession._id}`, { sessionType: sessionType.value, amount: amount.value, registrationFee })
            .then(() => {
                refetch();
                toast.success("Approved Successfully");
                closeModal('my_modal_3');
            })
            .catch(error => {
                console.error('Error approving session:', error);
                toast.error("Error approving session");
            });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const { _id: sessionId } = selectedSession;
        axiosPublic.put(`/updateSession/${sessionId}`, {
            title: updateTitle,
            description: updateDescription,
            registrationFee: parseFloat(updateRegistrationFee)
        })
            .then(() => {
                refetch();
                toast.success("Session updated successfully");
                closeModal('update_modal'); 
            })
            .catch(error => {
                console.error('Error updating session:', error);
                toast.error("Error updating session");
            });
    };

    const handleUpdate = (sessionId) => {
        const session = sessions.find(session => session._id === sessionId);
        setSelectedSession(session);
        setUpdateTitle(session.title);
        setUpdateDescription(session.description);
        setUpdateRegistrationFee(session.registrationFee.toString()); 
        console.log(session.title)
        openModal('update_modal');
    };

    const deleteSession = (sessionId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/deleteSession/${sessionId}`)
                    .then(() => {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'The session has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error deleting session:', error);
                        Swal.fire(
                            'Error!',
                            'Failed to delete the session.',
                            'error'
                        );
                    });
            }
        });
    };

    const pendingSessions = sessions.filter(session => session.status === 'pending');
    const approvedSessions = sessions.filter(session => session.status === 'approved');

    return (
        <div className="min-h-screen">
            <h1 className="pt-20 text-center font-bold text-3xl">All Sessions</h1>
            <Tabs>
                <TabList>
                    <Tab>Pending Sessions</Tab>
                    <Tab>Approved Sessions</Tab>
                </TabList>

                <TabPanel>
                    {isLoading ? (
                        <div className="text-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        <div>
                            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-4">
                                {pendingSessions.map(session => (
                                    <div key={session._id} className="card bg-neutral text-neutral-content">
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">{session.title}</h2>
                                            <p>{session.description}</p>
                                            <div className="card-actions justify-end">
                                                <button className="btn btn-primary" onClick={() => approveSession(session._id)}>Accept</button>
                                                <button className="btn btn-ghost" onClick={() => rejectSession(session._id)}>Deny</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </TabPanel>

                <TabPanel>
                    {isLoading ? (
                        <div className="text-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 px-4">
                            {approvedSessions.map(session => (
                                <div key={session._id} className="card w-96 bg-base-100 shadow-xl">
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{session.title}</h2>
                                        <p><span className="font-bold">Description:</span> {session.description}</p>
                                        <p><span className="font-bold">Tutor Name:</span> {session.tutorName}</p>
                                        <p><span className="font-bold">Tutor Email:</span> {session.tutorEmail}</p>
                                        <p><span className="font-bold">Registration Start Date:</span> {session.registrationStartDate}</p>
                                        <p><span className="font-bold">Registration End Date:</span> {session.registrationEndDate}</p>
                                        <p><span className="font-bold">Class Start Date:</span> {session.classStartDate}</p>
                                        <p><span className="font-bold">Class End Date:</span> {session.classEndDate}</p>
                                        <p><span className="font-bold">Duration:</span> {session.duration}</p>
                                        <p><span className="font-bold">Registration Fee:</span> {session.registrationFee}</p>


                                        <button className="btn btn-primary mt-4" onClick={() => handleUpdate(session._id)}>Update</button>
                                        <button className="btn btn-danger mt-4" onClick={() => deleteSession(session._id)}>Delete</button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </TabPanel>
            </Tabs>

            {/* Modal for session approval */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleModalSubmit}>
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeModal('my_modal_3')}>✕</button>
                        <h3 className="font-bold text-lg">Session Approval</h3>
                        <div className="py-4">
                            <label htmlFor="sessionType">Is the session free or paid?</label>
                            <select className="m-4 border px-3 py-2" name="sessionType" defaultValue="free">
                                <option value="free">Free</option>
                                <option value="paid">Paid</option>
                            </select>
                            <br />
                            <label htmlFor="amount">Amount (if paid):</label>
                            <input type="number" id="amount" name="amount" />
                            <br />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Modal for session rejection */}
            <dialog id="reject_modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleRejectSubmit}>
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeModal('reject_modal')}>✕</button>
                        <h3 className="font-bold text-lg">Session Rejection</h3>
                        <div className="py-4">
                            <label htmlFor="rejectionReason">Rejection Reason:</label>
                            <input
                                type="text"
                                id="rejectionReason"
                                name="rejectionReason"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                className="m-4 border px-3 py-2 w-full"
                                required
                            />
                            <br />
                            <label htmlFor="feedback">Feedback:</label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="m-4 border px-3 py-2 w-full"
                                required
                            />
                            <br />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </dialog>

                {/* Modal for session update */}
                <dialog id="update_modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleUpdateSubmit}>
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeModal('update_modal')}>✕</button>
                        <h3 className="font-bold text-lg">Update Session</h3>
                        <div className="py-4">
                            <label htmlFor="updateTitle">Title:</label>
                            <input
                                type="text"
                                id="updateTitle"
                                name="updateTitle"
                                value={updateTitle}
                                onChange={(e) => setUpdateTitle(e.target.value)}
                                className="m-4 border px-3 py-2 w-full"
                                required
                            />
                            <br />
                            <label htmlFor="updateDescription">Description:</label>
                            <textarea
                                id="updateDescription"
                                name="updateDescription"
                                value={updateDescription}
                                onChange={(e) => setUpdateDescription(e.target.value)}
                                className="m-4 border px-3 py-2 w-full"
                                required
                            />
                            <br />
                            <label htmlFor="updateRegistrationFee">Registration Fee:</label>
                            <input
                                type="number"
                                id="updateRegistrationFee"
                                name="updateRegistrationFee"
                                value={updateRegistrationFee}
                                onChange={(e) => setUpdateRegistrationFee(e.target.value)}
                                className="m-4 border px-3 py-2 w-full"
                                required
                            />
                            <br />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </dialog>
            
            <ToastContainer />
        </div>
    );
};

export default ViewStudySessions;

