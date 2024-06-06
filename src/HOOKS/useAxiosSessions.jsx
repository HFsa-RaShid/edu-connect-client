
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAxiosSessions = () => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: sessions = [], isLoading, isError } = useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const res = await axiosPublic.get('/sessions');
            return res.data;
        }
    });
    return { sessions, refetch, isLoading, isError };
};

export default useAxiosSessions;
