// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";
// import useAxiosSecure from "./useAxiosSecure";


// const useAdmin = () => {
//     const {user} = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();
//     const { data: isAdmin } = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         queryFn: async() =>{
//             const res = await axiosSecure.get(`/users/admin/${user?.email}`);
//             console.log('Admin status response:', res.data);
//             return res.data?.admin;
//         }
//     })
//     return [isAdmin]
// };

// export default useAdmin;

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const queryKey = [user?.email, 'isAdmin'];
    const queryFn = async () => {
        const res = await axiosSecure.get(`/users/admin/${user?.email}`);
        console.log('Admin status response:', res.data);
        return res.data?.admin;
    };

    const { data: isAdmin, isLoading, error } = useQuery({
        queryKey,
        queryFn,
        enabled: !authLoading && !!user?.email, 
        placeholderData: false, 
    });

    return [isAdmin, isLoading, error];
};

export default useAdmin;
