

import { Link, useNavigate } from "react-router-dom";
import login from '../../assets/login.jpg';
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../HOOKS/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                // Update profile with displayName
                return updateUserProfile(data.name);
            })
            .then(() => {
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    image: 'https://i.ibb.co/x30r6Bk/images.png'
                };
                return axiosPublic.post('/users', userInfo);
            })
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Registered successfully');
                    setTimeout(() => {
                        navigate(location?.state ? location.state : '/')
                    }, 500);
                }
            })
            .catch(error => {
                console.error(error);
                toast.error('Error during registration');
            });
    };

    return (
        <div className="mx-auto">
            <Helmet>
                <title>Sign_Up | EduConnect</title>
            </Helmet>
            <div className="md:flex gap-10 justify-evenly">
                <div className="relative text-center md:min-h-screen md:w-1/2">
                    <img src={login} alt="Sign Up" className="w-full h-full object-cover" />
                    <div className="absolute text-white top-[2%] md:top-1/3 p-8">
                        <h1 className="text-4xl font-bold">Join EduConnect and start learning</h1>
                        <br />
                        <p className="text-2xl">Sign up to EduConnect to get started!</p>
                        <br />
                        <p className="text-sm">
                            By signing up to EduConnect, you agree to our
                        </p>
                        <p className="text-sm">
                            <a href="#" className="underline">Terms of use</a> and <a href="#" className="underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>
                <div className="md:w-1/2  bg-base-100 flex mx-auto items-center max-w-sm">
                    <form className="card-body w-full" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-4xl text-center font-bold mb-4">Sign Up Here!!</h1>
                        <div className="form-control mb-1">
                            <label className="label">
                                <span className="label-text font-bold">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                {...register("name", { required: true })}
                                placeholder="Name"
                                className="input input-bordered"
                            />
                            {errors.name && <span className="text-red-700 italic">Name is required</span>}
                        </div>
                        <div className="form-control mb-1">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                {...register("email", { required: true })}
                                placeholder="Email"
                                className="input input-bordered"
                            />
                            {errors.email && <span className="text-red-700 italic">Email is required</span>}
                        </div>
                        <div className="form-control mb-1">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                {...register("password", {
                                    required: true,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                                    minLength: 6,
                                    maxLength: 20
                                })}
                                placeholder="Password"
                                className="input input-bordered"
                            />
                            {errors.password?.type === 'required' && <span className="text-red-700 italic">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-700 italic">Password must be 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span className="text-red-700 italic">Password must be less than 20 Characters</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-700 italic">Password must have 1 upper case,1 lower case, 1 number & 1 special Character</span>}
                        </div>
                        <div className="form-control mb-1">
                            <label className="label">
                                <span className="label-text font-bold">Role</span>
                            </label>
                            <select
                                name="role"
                                {...register("role")}
                                className="select select-bordered"
                            >
                                <option value="student">Student</option>
                                <option value="tutor">Tutor</option>
                                {/* <option value="admin">admin</option> */}
                          
                            </select>
                        </div>
                        <div className="form-control mt-1">
                            <button type="submit" value="sign Up" className="btn btn-outline border-0 border-b-4 border-t-2 border-black text-black px-3 text-xl font-bold w-full">Sign Up</button>
                        </div>
                        <p className="text-center mt-2">
                            Already have an account? Please <Link to="/login">
                                <button className="text-blue-400 underline font-bold">Sign In</button>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
