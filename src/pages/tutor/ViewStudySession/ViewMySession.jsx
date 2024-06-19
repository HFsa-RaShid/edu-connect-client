

import { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Swal from 'sweetalert2';
import useAxiosPublic from "../../../HOOKS/useAxiosPublic";
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSessionsByTutor from '../../../HOOKS/useAxiosSessionsByTutor';
import { NavLink } from 'react-router-dom';

const ViewMySession = () => {
    const { user, loading } = useContext(AuthContext);
    const { refetch } = useAxiosSessionsByTutor();
    const [approvedSessions, setApprovedSessions] = useState([]);
    const [rejectedSessions, setRejectedSessions] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (!loading && user) {
            axiosPublic.get(`/sessionsByTutor/${user?.email}?status=approved`)
                .then(response => {
                   
                    setApprovedSessions(response.data);
                    refetch();
                    setLoading(false);

                    
                })
                .catch(error => {
                    console.error('Error fetching approved sessions:', error);
                    setLoading(false);
                });

            axiosPublic.get(`/sessionsByTutor/${user?.email}?status=rejected`)
                .then(response => {
                    setRejectedSessions(response.data);
                    refetch();
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching rejected sessions:', error);
                    setLoading(false);
                });
        }
    }, [axiosPublic, user, loading,refetch]);

    return (
        <div className="min-h-screen p-4">
            <h1 className="text-center font-bold text-3xl mb-4 pt-16">My Sessions</h1>
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
                                    <th className="px-4 py-2">Class Start Date</th>
                                    <th className="px-4 py-2">Class End Date</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            {Loading ? (
                                <div className="text-center">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </div>
                            ) :
                            <tbody>
                                {approvedSessions.map(session => (
                                    <tr key={session._id} className='text-center'>
                                        <td className="border px-4 py-2">{session.title}</td>
                                        <td className="border px-4 py-2">
                                        {session.classStartDate}
                                        </td>
                                        <td className="border px-4 py-2">
                                        {session.classEndDate}
                                        </td>
                                        <td className="border px-4 py-2 text-green-600 font-semibold">{session.status}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                                }
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
                                    
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">FeedBack</th>
                                    <th className="px-4 py-2">Rejection Reason</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            {Loading ? (
                                <div className="text-center">
                                    <span className="loading loading-spinner loading-lg"></span>
                                </div>
                            ) :
                            <tbody>
                                {rejectedSessions.map(session => (
                                    <tr key={session._id} className='text-center'>
                                        <td className="border px-4 py-2">{session.title}</td>
                                        
                                        <td className="border px-4 py-2">{session.status}</td>
                                        <td className="border px-4 py-2">{session.feedback}</td>
                                        <td className="border px-4 py-2">{session.rejectionReason}</td>
                                        <td className="border px-4 py-2">
                                            <NavLink to={`/requestApproval/${session._id}`}>
                                            <button className="btn btn-outline border-0 border-b-4 border-t-2 border-black ">
                                                Request Approval
                                            </button>
                                            </NavLink>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            }
                        </table>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ViewMySession;

