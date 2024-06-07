

import { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Swal from 'sweetalert2';
import useAxiosPublic from "../../../HOOKS/useAxiosPublic";
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSessionsByTutor from '../../../HOOKS/useAxiosSessionsByTutor';

const ViewMySession = () => {
    const { user, loading } = useContext(AuthContext);
    const { refetch } = useAxiosSessionsByTutor();
    const [approvedSessions, setApprovedSessions] = useState([]);
    const [rejectedSessions, setRejectedSessions] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        if (!loading && user) {
            axiosPublic.get(`/sessionsByTutor/${user.email}?status=approved`)
                .then(response => {
                   
                    setApprovedSessions(response.data);
                    refetch();
                    
                })
                .catch(error => {
                    console.error('Error fetching approved sessions:', error);
                });

            axiosPublic.get(`/sessionsByTutor/${user.email}?status=rejected`)
                .then(response => {
                    setRejectedSessions(response.data);
                    refetch();
                })
                .catch(error => {
                    console.error('Error fetching rejected sessions:', error);
                });
        }
    }, [axiosPublic, user, loading,refetch]);

    const sendApprovalRequest = (sessionId) => {
        axiosPublic.put(`/updateSession/${sessionId}`, { status: 'pending' })
            .then(() => {
                setRejectedSessions(prevSessions => prevSessions.filter(session => session._id !== sessionId));
                Swal.fire({
                    title: "Request Sent",
                    text: "Your approval request has been sent.",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error('Error sending approval request:', error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to send approval request.",
                    icon: "error"
                });
            });
    };
    

   

    return (
        <div className="min-h-screen p-4">
            <h1 className="text-center font-bold text-3xl mb-4">My Sessions</h1>
            <Tabs>
                <TabList>
                    <Tab>Approved Sessions</Tab>
                    <Tab>Rejected Sessions</Tab>
                </TabList>

                <TabPanel>
                    <h2 className="text-xl font-semibold mb-2">Approved Sessions</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedSessions.map(session => (
                                    <tr key={session._id}>
                                        <td className="border px-4 py-2">{session.title}</td>
                                        <td className="border px-4 py-2">{session.date}</td>
                                        <td className="border px-4 py-2">{session.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>

                <TabPanel>
                    <h2 className="text-xl font-semibold mb-2">Rejected Sessions</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rejectedSessions.map(session => (
                                    <tr key={session._id}>
                                        <td className="border px-4 py-2">{session.title}</td>
                                        <td className="border px-4 py-2">{session.date}</td>
                                        <td className="border px-4 py-2">{session.status}</td>
                                        <td className="border px-4 py-2">
                                            <button 
                                                onClick={() => sendApprovalRequest(session._id)} 
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Request Approval
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ViewMySession;

