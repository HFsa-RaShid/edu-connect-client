// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useAxiosMaterials = () => {
//     const axiosPublic = useAxiosPublic();
//     const { refetch, data: material = [], isLoading, isError } = useQuery({
//         queryKey: ['materials'],
//         queryFn: async () => {
//             const res = await axiosPublic.get('/materials');
//             return res.data;
//         }
//     });
//     return { material, refetch, isLoading };
// };

// export default useAxiosMaterials;

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAxiosMaterials = (currentPage) => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: material = { materials: [], totalPages: 0 }, isLoading, isError } = useQuery({
        queryKey: ['materials', currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/materials?page=${currentPage}`);
            return res.data;
        }
    });
    return { material, refetch, isLoading, isError };
};

export default useAxiosMaterials;
