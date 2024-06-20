

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAxiosMaterials = (currentPage) => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: material = { materials: [], totalPages: 0 }, isLoading, isError } = useQuery({
        queryKey: ['materials', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/materials?page=${currentPage}`);
            return res.data;
        }
    });
    return { material, refetch, isLoading, isError };
};

export default useAxiosMaterials;
