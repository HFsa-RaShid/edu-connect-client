import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import CreateStudySession from "../pages/tutor/CreateSession/CreateStudySession";
import ViewUsers from "../pages/admin/viewUsers/ViewUsers";
import ViewStudySessions from "../pages/admin/viewStudySessions/ViewStudySessions";
import ViewMySession from "../pages/tutor/ViewStudySession/ViewMySession";
import RequestApproval from "../pages/tutor/ViewStudySession/RequestApproval";
import UploadMaterialsForm from "../pages/tutor/UploadMaterials/UploadMaterialsForm";
import UploadMaterials from "../pages/tutor/UploadMaterials/UploadMaterials";
import ViewMaterials from "../pages/tutor/viewMaterials/ViewMaterials";
import ViewAllMaterials from "../pages/admin/viewAllMaterials/ViewAllMaterials";
import PrivateRoute from "./PrivateRoute";
import SessionDetails from "../pages/Home/studySessions/SessionDetails";
import AllStudySessions from "../pages/Home/studySessions/AllStudySessions";
import Payment from "../pages/Home/studySessions/Payment";
import BookedSession from "../pages/student/bookedSession/BookedSession";
import BookedSessionDetails from "../pages/student/bookedSession/BookedSessionDetails";
import Reviews from "../pages/Home/studySessions/Reviews";
import CreateNotes from "../pages/student/createNotes/CreateNotes";


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
      {
        path: "/viewMySession",
        element: <ViewMySession></ViewMySession>,
        
      },
      {
        path: "/requestApproval/:id",
        element: <RequestApproval></RequestApproval>,
      },
      {
        path: "/studyMaterials",
        element: <UploadMaterials></UploadMaterials>,
      },

      {
        path: "/studyMaterials/:id",
        element: <UploadMaterialsForm></UploadMaterialsForm>,
      },
      {
        path: "/viewMaterials",
        element: <ViewMaterials></ViewMaterials>,
      },
      {
        path: "/viewAllMaterials",
        element: <ViewAllMaterials></ViewAllMaterials>,
      },
      {
        path: "/sessionDetails/:id",
        element: <PrivateRoute><SessionDetails></SessionDetails></PrivateRoute>,
      },
      {
        path: "/AllStudySessions",
        element: <AllStudySessions></AllStudySessions>,
      },
      {
        path: "/sessionDetails/:id/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/bookedSession",
        element: <PrivateRoute><BookedSession></BookedSession></PrivateRoute>,
      },
      {
        path: "/bookedSessionDetails/:id",
        element: <BookedSessionDetails></BookedSessionDetails>,
      },
      {
        path: "/sessionDetails/:id/review",
        element: <Reviews></Reviews>,
      },
      {
        path: "/createNotes",
        element: <CreateNotes></CreateNotes>,
      },
      
      
      ],
    },
  ]);