import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/core/common/Navbar";
import ResetPassword from "./components/core/Auth/ResetPassword";
import UpdatePassword from "./components/core/Auth/UpdatePassword";
import VerifyEmail from "./components/core/Auth/VerifyEmail";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import OpenRoute from "./components/core/common/OpenRoute";
import PrivateRoute from "./components/core/common/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import Error from "./pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import EditCourses from "./components/core/Dashboard/MyCourses/EditCourses";
import Catalog from "./pages/Catalog";
import CourseDetailsPage from "./components/core/Catalog/CourseDetailsPage";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/instructorDashboard/Instructor";

function App() {
     
  const {user} = useSelector((state)=>state.profile);
  const {courseSectionData} = useSelector((state) => state.viewCourse);
  console.log("APP COURSE SECTION DATA" , courseSectionData);


  return (
      <div className=" lg:w-screen bg-richblack-900 min-h-screen flex  flex-col  items-center font-inter">
      <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
        <Route path="/forgot-password" element={<OpenRoute><ResetPassword/></OpenRoute>}/>
        <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>}/>
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
         <Route path="/about" element={<AboutPage/>}/>
         <Route path="/contact" element={<ContactPage/>}/>
         <Route path="/catalog/:catalogName" element={<Catalog/>} />
         <Route path="/courses/:courseId" element={<CourseDetailsPage/>}  />


         <Route path="*" element={<Error/>} />

         <Route  element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
                   }
          > 
           <Route path="/dashboard/my-Profile"  element={<MyProfile/>} />
           <Route path="/dashboard/settings" element={<Settings/>} />
           

           { user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
               <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
              <Route path="/dashboard/cart" element={<Cart/>} />
           </>)}

           {  user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&(
            <>
              <Route path="/dashboard/add-course" element={<AddCourse/>} />
              <Route path="/dashboard/my-courses" element={<MyCourses/>} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourses/>} />
                <Route path="/dashboard/instructor" element={<Instructor/>} />
          
            </>
           )}
          
           
            </Route>

            <Route 
              element={
                <PrivateRoute>
                  <ViewCourse/>
                </PrivateRoute>
              }
             >

             {user?.accountType === ACCOUNT_TYPE.STUDENT && courseSectionData &&   (
              <>
                <Route
                  path = "/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                 />
              </>
             )}


            </Route>
         

        
         
       </Routes>
      </div>
  );
}

export default App;
