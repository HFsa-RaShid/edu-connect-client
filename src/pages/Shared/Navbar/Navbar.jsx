
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { MdEditSquare } from "react-icons/md";
import useUserData from "../../../HOOKS/useUserData"; 
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../HOOKS/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LuUpload } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import useAdmin from "../../../HOOKS/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); 
  const axiosSecure = useAxiosSecure();
  const { userData, refetch } = useUserData(user?.email);
  const [isAdmin] = useAdmin();

  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const { register, handleSubmit, formState: { errors }, reset} = useForm();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error("Error during sign out:", error);
      });
  };


  useEffect(() => {
    if (userData && userData.image) {
      setProfileImage(userData.image);
    }
  }, [userData]);

  useEffect(() => {
    setIsDashboardVisible(false);
  }, [location]);

  const handleMenuClick = () => {
    setIsDashboardVisible(!isDashboardVisible);
  };

  const handleCloseDashboard = () => {
    setIsDashboardVisible(false);
  };

  
// edit icon toggle
  const handleEditButtonClick = () => {
    setShowForm(!showForm); 
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);
  
    try {
      setLoading(true);
      const res = await fetch(image_hosting_api, {
        method: 'POST',
        body: formData,
      });
      const imageData = await res.json();
      
      if (imageData.success) {
        const materialData = {
          image: imageData.data.display_url,
        };
        const materialRes = await axiosSecure.put(`/users/${userData._id}`, materialData);
        if (materialRes.data.updated === true) {
          setProfileImage(imageData.data.display_url);
          toast.success('Image updated successfully');
          reset();
          setLoading(false);
          refetch();
        } else {
          setLoading(false);
          console.error('Failed to update image');
        }
      } else {
        setLoading(false);
        console.error('Failed to upload image');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error uploading image:', error);
    }
};

  
  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-50 max-w-[424px] md:max-w-screen-xl bg-black text-white">
        <div className="flex-none">
          {user && (
           
            <button onClick={handleMenuClick} className="text-2xl md:text-3xl">
              <IoMenu />
            </button>
           
            
          )}
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl md:text-3xl font-bold italic">EduConnect</a>
        </div>
        <div className="flex-none">

          {user ? (
            <>
            <img src={profileImage} className="rounded-full h-[42px] w-[42px] mr-4" key={profileImage} />
            <button onClick={handleSignOut} className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-[14px] md:text-[18px] text-white  px-2  font-bold">Sign Out</button>
            </>
             
          ) : (
            <NavLink to='/login'>
              <button className="btn btn-outline border-0 border-b-4 border-t-2 border-white text-white px-3 text-xl font-bold">Sign In</button>
            </NavLink>
          )}
        </div>
      </div>

      {isDashboardVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20">
          <div className="relative bg-white p-4 w-64 h-full">
            <button onClick={handleCloseDashboard} className="absolute top-2 right-2 text-black">
              &#x2716;
            </button>
            
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>
            <hr></hr>
            <div className="ml-16 h-[80px] w-[80px] rounded-full relative bg-slate-300 mt-6">
              <img key={profileImage} src={`${profileImage}`} className="rounded-full h-[80px] w-[80px] " />
           
                <MdEditSquare className="bottom-0 right-0 absolute text-3xl bg-white border-4 rounded-full" onClick={handleEditButtonClick} />
              
              
              </div>


              <div className="flex items-center mb-4">
              
            </div>

            {showForm && (
              <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: true })}
                  className="input w-full mt-6"
                />
                {errors.image && <span className="text-red-600">Image is required</span>}
                <button type="submit" disabled={loading} className="mt-2 py-2 px-4 rounded-xl font-bold border text-black"><LuUpload /></button>
              </form>
            )}

              {/* <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: true })}
                  className="input  w-full mt-6"
                />
                {errors.image && <span className="text-red-600">Image is required</span>}
                <button type="submit" disabled={loading} className="mt-2 py-2 px-4 rounded-xl font-bold border  text-black"><LuUpload /></button>
              </form> */}
            
            <p className="mt-6 text-center text-xl font-bold">{userData && userData.name}</p>
            <p className="text-center mb-6">({userData.role})</p>
            <hr></hr>
            
            <NavLink  to='/' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>Home</NavLink>
            
            
             {userData && userData.role === "tutor" && (
              <>
                <NavLink to='/create-session' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>Create Study Session</NavLink>
                <NavLink to='/viewMySession' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>View Study Sessions</NavLink>
                <NavLink to='/studyMaterials' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>Upload materials</NavLink>
                <NavLink  to='/viewMaterials' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }> View all materials</NavLink>
              </>
            )}
            { isAdmin && (
              <>
                <NavLink to='/viewUsers' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>View Users</NavLink>
                <NavLink to='/viewStudySession' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>View all Study Sessions</NavLink>
                <NavLink to='/ViewAllMaterials' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>View all materials</NavLink>
              </>
            ) 
            }
            {userData && userData.role === "student" && (
              <>
                <NavLink to='/bookedSession' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>View booked session</NavLink>
                <NavLink to='/createNotes' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>Create note</NavLink>
                <NavLink to='/managePersonalNotes' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>Manage personal notes</NavLink>
                <NavLink to='/bookedSessionMaterials' className={({ isActive }) =>
                            isActive ? 'text-white bg-black block py-2 rounded-2xl pl-2' : 'block py-2'
                        }>View Materials</NavLink>
              
              </>
            )}
          </div>
        </div>
      )}
       <ToastContainer />
    </div>
  );
};

export default Navbar;

