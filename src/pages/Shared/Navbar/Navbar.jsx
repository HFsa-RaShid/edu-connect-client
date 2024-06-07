
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { FiMenu } from "react-icons/fi";
import useAxiosPublic from "../../../HOOKS/useAxiosPublic";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error("Error during sign out:", error);
      });
  };

  // Theme 
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const handleToggle = e => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);



  useEffect(() => {
    if (user && user.email) {
      axiosPublic.get(`/users?email=${user.email}`)
        .then(res => {
          const userData = res.data;
          if (userData && userData.role) {
            setUserRole(userData.role);
          } 
        })
        .catch(error => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [user,axiosPublic]);


  useEffect(() => {
    // Close the dashboard when the route changes
    setIsDashboardVisible(false);
  }, [location]);

  const handleMenuClick = () => {
    setIsDashboardVisible(!isDashboardVisible);
  };

  const handleCloseDashboard = () => {
    setIsDashboardVisible(false);
  };

  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
        <div className="flex-none">
        {user && (
          <button className="btn btn-square btn-ghost" onClick={handleMenuClick}>
            <FiMenu className="w-5 h-5 stroke-current" />
          </button>
        )}
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-3xl font-bold italic">EduConnect</a>
        </div>
        <div className="flex-none">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleToggle} checked={theme === "light" ? false : true} className="theme-controller" />
          </label>

          {user ? (
            <button onClick={handleSignOut} className="py-2 px-4 rounded-xl font-bold border border-white text-[12px] lg:text-[18px]">Sign Out</button>
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
            <h2 className="text-xl font-bold mb-10">Dashboard</h2>
            <NavLink to='/' className="block py-2">Home</NavLink>
            
             {userRole === "tutor" && (
              <>
                <NavLink to='/create-session' className="block py-2">Create Study Session</NavLink>
                <NavLink to='/viewMySession' className="block py-2">View Study Sessions</NavLink>
                <NavLink to='/create-session' className="block py-2">Upload materials</NavLink>
                <NavLink to='/view-sessions' className="block py-2"> View all materials</NavLink>
                
              </>
            )}
            {userRole === "admin" && (
              <>
                <NavLink to='/viewUsers' className="block py-2">View Users</NavLink>
                <NavLink to='/viewStudySession' className="block py-2">View all Study Sessions</NavLink>
                <NavLink to='/manage-users' className="block py-2">View all materials</NavLink>
              </>
            )}
            {userRole === "student" && (
              <>
                <NavLink to='/my-sessions' className="block py-2">My Sessions</NavLink>
                <NavLink to='/browse-sessions' className="block py-2">Browse Sessions</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

