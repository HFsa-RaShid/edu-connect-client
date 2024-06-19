// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";

// const useNotes = (email) => {
//     const axiosPublic = useAxiosPublic();
//     const { refetch, data: noteData = null, isLoading, isError } = useQuery({
//         queryKey: ['noteData', email],
//         queryFn: async () => {
//             const res = await axiosPublic.get(`/notes?userEmail=${email}`);
//             return res.data;
//         }
//     });
//     return { noteData, refetch, isLoading, isError };
// };

// export default useNotes;



import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useNotes = (email, page, limit) => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: noteData = null, isLoading, isError } = useQuery({
        queryKey: ['noteData', email, page, limit],
        queryFn: async () => {
            const res = await axiosPublic.get(`/notes?userEmail=${email}&page=${page}&limit=${limit}`);
            return res.data;
        }
    });
    return { noteData, refetch, isLoading, isError };
};

export default useNotes;
