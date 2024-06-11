import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAxiosMaterials = () => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: material = [], isLoading, isError } = useQuery({
        queryKey: ['materials'],
        queryFn: async () => {
            const res = await axiosPublic.get('/materials');
            return res.data;
        }
    });
    return { material, refetch, isLoading };
};

export default useAxiosMaterials;