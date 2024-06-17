import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useApprove = () => {
    const axiosPublic = useAxiosPublic();
   const {refetch, data: approveSession = []} = useQuery({
    queryKey: ['approveSession'],
    queryFn: async () =>{
        const res = await axiosPublic.get('/approveSession') 
        return res.data;
    }
   })
   return [approveSession,refetch]
};

export default useApprove;


