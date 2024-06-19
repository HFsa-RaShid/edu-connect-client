import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../../HOOKS/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GoogleLogin = () => {
    const {googleSignIn}=useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate(); 
    
    const handleGoogleLogIn = () => {
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email,
                role: 'student',
                image: result.user?.photoURL
            }
            
            axiosPublic.post('/users',userInfo)
            .then(res =>{
                toast.success('Sign In successfully');    
            setTimeout(() => {
                const from = location.state?.from || '/';
                navigate(from, { replace: true });
            }, 1000);
                
            })
        })
    };
    
    return (
        <div>
            <div className="btn btn-outline border-0 border-b-4 border-t-2 border-black text-black px-8 text-xl font-bold w-full flex items-center">
                    <FcGoogle />
                    <button type="button" onClick={handleGoogleLogIn} className="font-bold text-[18px]">Google</button>
                </div>
                <ToastContainer />
        </div>
    );
};

export default GoogleLogin;

