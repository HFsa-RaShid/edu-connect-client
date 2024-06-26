import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useImage = (id) => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: material = [], isLoading } = useQuery({
        queryKey: ['materials', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/materials/${id}`);
            return res.data;
        }
    });
    return { material, refetch, isLoading };
};

export default useImage;