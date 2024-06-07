
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";


const useAxiosSessionsByTutor = () => {
    const { user, loading } = AuthContext;
    const axiosPublic = useAxiosPublic();

    if (loading || !user || !user.email) {
        return { sessions: [], refetch: () => {}, isLoading: true, isError: false };
    }

    const { email } = user;

    const { refetch, data: sessions = [], isLoading, isError } = useQuery({
        queryKey: ['sessionsByTutor', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/sessionsByTutor/${email}`);
            return res.data;
        }
    });

    return { sessions, refetch, isLoading, isError };
};

export default useAxiosSessionsByTutor;
