import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    
  const [enrolledCourse,setEnrolledCourse] = useState(null);
  const {jwtToken} = useSelector((state) => state.auth);
  //console.log("jwtToken=>",jwtToken);
const navigate = useNavigate();
  const getEnrolledCourse = async () => {

    try {
      
      const response = await getUserEnrolledCourses(jwtToken);
      console.log("response =>",response);
      setEnrolledCourse(response);

    } catch (error) {
       console.log("Unable to Fetch Enrolled Courses");
    }
    
  }

  useEffect(()=>{
    getEnrolledCourse();
  },[])
  
   //console.log("enrolledCourse =>", enrolledCourse);
  return (
    <div className='bg-richblack-800 w-full h-screen flex flex-col  ' >

    <div className='text-white text-3xl ml-10 my-10'>Enrolled Courses</div>

    <div className='flex justify-center item-center'>
      {
        !enrolledCourse ? (<div>Loading...</div>):!enrolledCourse.length ? (<div className='text-richblack-50 text-2xl'>You have not enrolled in any course yet</div>)
        : (<div className='w-11/12  border-2 border-richblack-600 rounded-lg' >
          
          <div className='flex justify-between mx-auto text-richblack-50 bg-richblack-600 p-4' >
            <div>CourseName</div>
            {/* <div>Durations</div> */}
            <div>Progress</div>
          </div>

          <div className='mt-4 mb-4 flex flex-col gap-5' >
            {enrolledCourse.map((course,index)=>(
              <div key={index} className='flex justify-between mx-5 text-richblack-50'
               onClick={() => navigate(`/view-course/${course?._id}/section/${course.courseContent[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection[0]?._id}`)}
               >
              <div className='flex gap-2 ' >
                <img src={course.thumbnail}
                className='w-[80px] rounded-lg'
                alt='course thumbnail'
                 />
                <div>
                  <div>{course.courseName}</div>
                  <div className='text-richblack-600' >{ course.courseDescription.length > 10 ? (course.courseDescription.split(" ").slice(0,10).join(" ")+ "..." ): (course.courseDescription)}</div>
                </div>
                </div>
                {/* <div>{course.totalDuration}</div> */}
                <div className='flex flex-col gap-2' >
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                  className='w-[180px]'
                     completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                  />
                </div>
              </div>
        ))}
          </div>
        </div>)
      }
    </div>

    
      
    </div>
  )
}

export default EnrolledCourses
