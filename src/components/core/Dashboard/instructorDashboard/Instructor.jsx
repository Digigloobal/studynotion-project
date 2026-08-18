import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
const {jwtToken}  =  useSelector((state) => state.auth);
const {user} = useSelector((state) => state.profile);

const [loading , setLoading] = useState(false);
const [instructorData , setInstructorData] = useState(null);
const [courses,setCourses] = useState([]);

useEffect(() => {

    const getCourseDataWithStats = async () => {

        setLoading(true);

        const instructorApiData = await getInstructorData(jwtToken);
        const result = await fetchInstructorCourses(jwtToken);

        //console.log("instructorApi Data => ", instructorApiData);

        if(instructorApiData){
            setInstructorData(instructorApiData);
        }
        //console.log("result =>" ,result);

        if(result){
            setCourses(result);
        }

        setLoading(false);

       
    }


    getCourseDataWithStats();

},[])

console.log("instructorData => " , instructorData);

      const totalAmount = instructorData?.reduce((acc,curr) => acc + curr.totalAmountGenerated,0);
      const totalStudents = instructorData?.reduce((acc,curr) => acc + curr.totalStudentsEnrolled,0);

      //console.log("totalAmount => ", totalAmount , "totalStudents =>",totalStudents);

  return (

    <>

    {loading ? (<div>Loading...</div> ) : (

        <div className='text-white w-11/12 flex flex-col gap-5 items-start mx-auto mt-8 mb-10'>
      
      <div >
        <p className='text-2xl' >Hi {user?.firstName} 👋 </p>
        <p className='text-richblack-400'>Let's start something new</p>
      </div>

      <div className='flex justify-center gap-2 w-full' >

      <div className='w-[80%]' >
      {instructorData && <InstructorChart courses={instructorData} />}
      </div>

      <div className='bg-richblack-800  p-4 w-[15%] rounded-lg '>
        <div className='flex flex-col gap-3 mb-14 ' >
            <p>Statistics</p>
            <div >
            <p className='text-richblack-500'>Total Courses</p>
             <p className='text-2xl'>{courses.length}</p>
            
            </div>
           
            <div>
            
            <p className='text-richblack-500'>Total Students</p>
            <p className='text-2xl' >{totalStudents}</p>
            </div>
            
            <div>
            <p className='text-richblack-500'>Total Income</p>
             <p className='text-2xl' >Rs. {totalAmount}</p>
            </div>
           
        </div>
      </div>

      </div>

      <div className='bg-richblack-800 rounded-lg p-3 w-fit mx-auto flex flex-col gap-3'>
      <div className='flex justify-between'>
        <p className='text-xl font-sm'>Your Courses</p>
        <Link to= "/dashboard/my-courses" >
            <p className='text-yellow-50'>View All</p>
        </Link>
      </div>
      
      <div className='flex gap-2' >
        {courses.slice(0,3).map((course) => (
            <div key={course._id}>
                <img
                    src={course.thumbnail}
                    className='w-[360px] rounded-lg object-cover '
                />

                <div>
                    <p className='text-richblack-25'>{course.courseName}</p>
                    <div className='flex gap-1 text-richblack-400'>
                        <p>{course.studentsEnrolled.length} students</p>
                        <p>|</p>
                        <p>Rs. {course.price}</p>
                    </div>
                </div>
            </div>
        ))}
      </div>

      </div>


      
    </div>

    )}
    
  

  
</>
)}

export default Instructor
