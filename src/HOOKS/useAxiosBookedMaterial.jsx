import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAxiosBookedMaterial = (email) => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: material = [], isLoading, isError } = useQuery({
        queryKey: ['materials', email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/materials?userEmail=${email}`);
            return res.data;
        }
    });
    return { material, refetch, isLoading };
};

export default useAxiosBookedMaterial;