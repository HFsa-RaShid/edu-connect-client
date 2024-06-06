import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import CreateStudySession from "../pages/tutor/CreateSession/CreateStudySession";
import ViewUsers from "../pages/admin/viewUsers/ViewUsers";
import ViewStudySessions from "../pages/admin/viewStudySessions/ViewStudySessions";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
    //   errorElement: <ErrorPage></ErrorPage>,
      
      children: [
        {
          path: "/",
          element: <Home></Home>,
          
        },
        {
            path: "/login",
            element: <LogIn></LogIn>,
            
        },
        {
            path: "/signup",
            element: <SignUp></SignUp>,
            
        },
        {
          path: "/create-session",
          element: <CreateStudySession></CreateStudySession>,
          
      },
      {
        path: "/viewUsers",
        element: <ViewUsers></ViewUsers>,
        
      },
      {
        path: "/viewStudySession",
        element: <ViewStudySessions></ViewStudySessions>,
        
      },
      
        
      ],
    },
  ]);