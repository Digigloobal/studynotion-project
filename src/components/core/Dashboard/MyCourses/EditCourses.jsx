import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import RenderForm from '../AddCourse/RenderForm';

const EditCourses = () => {

 
     const dispatch = useDispatch();
     const {jwtToken} = useSelector((state) => state.auth );
     const {courseId} = useParams();
     const {course} = useSelector((state) => state.course);
     const [loading,setLoading] = useState(false);

     const getFullDetailsCourse = async () => {
                   
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId,jwtToken);
        if(result?.courseDetails){
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails));
        }
         setLoading(false)
     }

     useEffect(() => {
        getFullDetailsCourse();
     },[]);

      if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
       <h1 className='text-white mt-10 ml-20 text-2xl mb-5' >Edit Course</h1>
       <div className='flex w-11/12 justify-center items-center'>
        {course ? (<RenderForm/>) : ( <div>No course Found</div>)}
       </div>
    </div>
  )
}

export default EditCourses
