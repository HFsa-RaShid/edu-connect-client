import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../HOOKS/useAxiosSecure"; 
import Swal from "sweetalert2";

const CreateNotes = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure(); 

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        
        const noteData = {
            userEmail: user?.email,
            title,
            description
        };

        axiosSecure.post('/notes', noteData)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Noted Successfully!',
                    text: 'You have successfully booked the session.',
                    confirmButtonText: 'Ok'
                });
                setIsLoading(false);
                setTitle('');
                setDescription('');
            })
            .catch((error) => {
                console.error('Error creating note:', error);
                setIsLoading(false);
                
            })
            
                
           
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Create a Note</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                defaultValue={user.email}
                                disabled
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="title" className="sr-only">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                autoComplete="title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Title"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="sr-only">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Description"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-outline w-full border-0 border-b-4 border-t-2 border-black  px-10 text-xl font-bold"
                        >
                            {isLoading ? 'Creating...' : 'Create Note'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateNotes;
