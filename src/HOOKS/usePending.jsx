import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePending = () => {
    const axiosPublic = useAxiosPublic();
   const {refetch, data: session = []} = useQuery({
    queryKey: ['session'],
    queryFn: async () =>{
        const res = await axiosPublic.get('/pending') 
        return res.data;
    }

   })
   return [session,refetch]
};

export default usePending;