import React, { useEffect, useState } from 'react'
import ViewCourseSideBar from '../components/core/ViewCourse/ViewCourseSideBar'
import { Outlet, useParams } from 'react-router-dom';
import ReviewModal from '../components/core/ViewCourse/ReviewModal';
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import Footer from '../components/core/common/Footer';

const ViewCourse = () => {

    const [reviewModal , setReviewModal ] = useState(false);
    const [loading , setLoading] = useState(false);
     
     const {courseId} = useParams();
     const {jwtToken} = useSelector((state) => state.auth);
     const dispatch = useDispatch();

     //console.log("courseId => ",courseId);

     useEffect(() => {

      


        const setCourseSpecificDetails = async () => {
          setLoading(true);
                 const courseData = await getFullDetailsOfCourse(courseId , jwtToken);

                   //console.log("CourseData => ",courseData?.courseDetails?.courseContent); 

                 if(courseData){
                  dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
                 dispatch(setEntireCourseData(courseData?.courseDetails));
                 dispatch(setCompletedLectures(courseData?.completedVideos));

                 let lectures = 0;

                 courseData?.courseDetails?.courseContent?.forEach((sec)=>{
                    lectures += sec.subSection.length;
                 });

                 dispatch(setTotalNoOfLectures(lectures));
                 }

                 setLoading(false);
                 //console.log("lectures =>",lectures);               
        }
        setCourseSpecificDetails();
     },[]);


  return (
    <>

    
    <div className='bg-richblack-900 w-full flex gap-4' >

        <ViewCourseSideBar setReviewModal = {setReviewModal} />
    

    <div className='w-[80%]'>
    {loading ? (<div>className="text-white flex justify-center items-center h-screen"</div>) : (<Outlet/>) }
        
    </div>

    </div>

    <Footer/>

    {reviewModal && <ReviewModal setReviewModal = {setReviewModal} />}
    </>
  )
}

export default ViewCourse
