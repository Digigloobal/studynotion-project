import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { CiSquarePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import CourseTable from './CourseTable';

const MyCourses = () => {
 

const {jwtToken} = useSelector((state) => state.auth);
const navigate = useNavigate();
const [courses,setCourses] = useState([]);

const fetchCourses = async () => {

    const result = await fetchInstructorCourses(jwtToken);
    if(result){
        setCourses(result);
    }

    console.log(result);
    
}

useEffect(()=>{
 
    fetchCourses(); 

},[]);



  return (
    <div className='text-white w-11/12 justify-center mt-10 flex flex-col items-center  '>
      <div className='flex w-full ml-10  justify-between items-center'>
        <div className='text-3xl font-semibold' >My Courses</div>
        <div onClick={()=>navigate("/dashboard/add-course")} className='hover:scale-105' >
             
            <IconBtn text="New" ><CiSquarePlus/></IconBtn>

        </div>
      </div>
      <div>
        {courses && <CourseTable courses = {courses} setCourses = {setCourses} /> }
      </div>
    </div>
  )
}

export default MyCourses
