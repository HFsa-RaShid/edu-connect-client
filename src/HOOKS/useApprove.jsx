import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useApprove = () => {
    const axiosSecure = useAxiosSecure();
   const {refetch, data: approveSession = []} = useQuery({
    queryKey: ['approveSession'],
    queryFn: async () =>{
        const res = await axiosSecure.get('/approveSession') 
        return res.data;
    }
   })
   return [approveSession,refetch]
};

export default useApprove;


