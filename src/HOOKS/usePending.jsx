import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";


const usePending = () => {
    const axiosSecure = useAxiosSecure();
   const {refetch, data: pending = []} = useQuery({
    queryKey: ['pending'],
    queryFn: async () =>{
        const res = await axiosSecure.get('/pending') 
        return res.data;
    }

   })
   return [pending,refetch]
};

export default usePending;