import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUserData = (email) => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: userData = null, isLoading, isError } = useQuery({
        queryKey: ['userData', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${email}`);
            return res.data;
        }
    });
    return { userData, refetch, isLoading, isError };
};

export default useUserData;
