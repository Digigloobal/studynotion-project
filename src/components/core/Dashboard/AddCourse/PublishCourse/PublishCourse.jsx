import React from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
//import IconBtn from '../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourse = () => {
 
   const {
    register,
   // setValue,
    getValues,
    handleSubmit,
    formState:{errors}
   } = useForm();

   const dispatch = useDispatch();
   const {course} = useSelector((state) => state.course);
   const {jwtToken} = useSelector((state) => state.auth);
   const navigate = useNavigate();

   const goBack = ()=>{
    dispatch(setStep(2));
   }
 
 const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }



  const handleCoursePublish = async () => {
       
     if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true)  || 
    (course?.status === COURSE_STATUS.DRAFT && getValues("public")=== false)) {
           
        goToCourses();
        return;
     }
  

  const formData = new FormData();
  formData.append("courseId",course._id);
   const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus);


    const result = await editCourseDetails(formData,jwtToken);
    if (result) {
      goToCourses()
    }

  }
  

    
   const onSubmit = ()=>{
       
     handleCoursePublish();
   }

  return (
    <div >

    <p className='text-xl mt-8 font-semibold text-richblack-50'>Publish Settings</p>
       
       <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label  className='text-richblack-100 bg-richblack-800 h-[100px] mt-4 p-6 rounded-lg flex items-center gap-3' >
            <input
            type='checkbox'
            id='public'
            {...register("public")}
            className=' border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5 '

            />
            {errors.public && <span>
              plz check the box to Publish
            </span>}

            <span className='text-lg' >Make this Course Public</span>
          </label>

          <div className='flex gap-2 justify-end mt-5'>
            <button className='flex items-center bg-richblack-800 p-3 px-4 text-white rounded-lg ' 
             onClick={goBack}
            >
              <MdOutlineKeyboardArrowLeft /> Back
            </button>

            <button
             className='flex items-center bg-yellow-100 p-3 px-4 text-richblack-900 rounded-lg'
            >
            Save <MdOutlineKeyboardArrowRight/> 
            </button>

          </div>
        </form>


       </div>

    </div>
  )
}

export default PublishCourse
