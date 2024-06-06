import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useApprove = () => {
    const axiosPublic = useAxiosPublic();
   const {refetch, data: Sessions = []} = useQuery({
    queryKey: ['Sessions'],
    queryFn: async () =>{
        const res = await axiosPublic.get('/sessions') 
        return res.data;
    }
   })
   return [Sessions,refetch]
};

export default useApprove;