

// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../provider/AuthProvider";

// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:3000'
// });

// const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     const { logOut } = useContext(AuthContext);

//     useEffect(() => {
//         const interceptor = axiosSecure.interceptors.response.use(
//             response => response,
//             async error => {
//                 const status = error.response.status;
//                 console.log('status error in the interceptors', status);
//                 if ( status === 401 || status === 403) {
//                     await logOut();
//                     navigate('/login');
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axiosSecure.interceptors.response.eject(interceptor);
//         };
//     }, [logOut, navigate]);

//     useEffect(() => {
//         axiosSecure.interceptors.request.use(config => {
//             const token = localStorage.getItem('access-token');
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//             return config;
//         }, error => {
//             return Promise.reject(error);
//         });
//     }, []);

//     return axiosSecure;
// };

// export default useAxiosSecure;



import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext);


    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptors',token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    });


    // interceptors 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        
        return response;

    }, async(error) =>{
        
        const status = error.response.status;
        console.log('status error in the interceptors', status);
        if( status === 401 || status === 403){
            await logOut();
            navigate('/login')

        }
        return Promise.reject(error);
    })
   return axiosSecure;
};

export default useAxiosSecure;
