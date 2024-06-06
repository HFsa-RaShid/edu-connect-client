

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
    const axiosPublic = useAxiosPublic();

    const approveSession = (sessionId) => {
        const session = sessions.find(session => session._id === sessionId);
        setSelectedSession(session);
        document.getElementById('my_modal_3').showModal();
    };

    const rejectSession = (sessionId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.put(`/rejectSession/${sessionId}`, { status: 'rejected' })
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Rejected!",
                            text: "The session has been rejected.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.error('Error rejecting session:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to reject the session.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const updateSession = (sessionId) => {
        const session = sessions.find(session => session._id === sessionId);
        setSelectedSession(session);
        document.getElementById('my_modal_4').showModal();
    };

    const deleteSession = (sessionId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/deleteSession/${sessionId}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "The session has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.error('Error deleting session:', error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the session.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const handleModalSubmit = (formData) => {
        const { sessionType, amount } = formData;
        const registrationFee = sessionType === 'paid' ? parseFloat(amount) : 0;
        axiosPublic.put(`/approveSession/${selectedSession._id}`, { ...formData, registrationFee })
            .then(() => {
                refetch();
                setSelectedSession(null);
                document.getElementById('my_modal_3').close();
                toast.success("Approved Successfully");
            })
            .catch(error => {
                console.error('Error approving session:', error);
                toast.error("Error approving session");
            });
    };

    const handleUpdateSubmit = (formData) => {
        axiosPublic.put(`/updateSession/${selectedSession._id}`, formData)
            .then(() => {
                refetch();
                setSelectedSession(null);
                document.getElementById('my_modal_4').close();
                toast.success("Updated Successfully");
            })
            .catch(error => {
                console.error('Error updating session:', error);
                toast.error("Error updating session");
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
                                <div key={session._id} className="card w-96 bg-neutral text-neutral-content">
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{session.title}</h2>
                                        <p>{session.description}</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary" onClick={() => updateSession(session._id)}>Update</button>
                                            <button className="btn btn-danger" onClick={() => deleteSession(session._id)}>Delete</button>
                                        </div>
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
                    <form onSubmit={(e) => { e.preventDefault(); handleModalSubmit({ sessionType: e.target.sessionType.value, amount: e.target.amount.value }) }}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_3').close()}>✕</button>
                        <h3 className="font-bold text-lg">Session Approval</h3>
                        <div className="py-4">
                            <label htmlFor="sessionType">Is the session free or paid?</label>
                            <select className="m-4 border px-3 py-2" name="sessionType">
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

            {/* Modal for session update */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateSubmit({ title: e.target.title.value, description: e.target.description.value }) }}>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById('my_modal_4').close()}>✕</button>
                        <h3 className="font-bold text-lg">Update Session</h3>
                        <div className="py-4">
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" name="title" defaultValue={selectedSession?.title} />
                            <br />
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" defaultValue={selectedSession?.description}></textarea>
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
