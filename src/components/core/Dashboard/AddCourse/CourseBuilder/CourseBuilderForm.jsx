import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn';
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineKeyboardArrowLeft , MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import NestedView from './NestedView';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {

       const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
        
       }  = useForm();
    

  

       const [editSection , setEditSection] = useState(null);

       const dispatch = useDispatch();

       const {course} = useSelector((state) => state.course);
       const {jwtToken} = useSelector((state)=>state.auth);


       

       const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
               }

    const goToNext = () => {
        if (course?.courseContent?.length === 0) {
            toast.error("Please add atleast one Section");
            return;
        }
        if (course.courseContent.some((section) => section.subSection?.length === 0)) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        //if everything is good
        dispatch(setStep(3));
    }


    const cancelEdit = () => {
        setEditSection(null);
        setValue("sectionName", "");
    }      


   const handleChangeEditSectionName = (sectionId , sectionName)=>{
                if(editSection === sectionId){
                    cancelEdit();
                    return;
                }
                
                setEditSection(sectionId);
                setValue("sectionName" , sectionName);
               }


 let result;


 useEffect(()=>{
  
    if(result){
        dispatch(setCourse(result));
    }
     
 },[course])

       const onSubmit = async (data) => {
 

       

        if(editSection){
            result  = await updateSection({
                sectionId:editSection,
                sectionName:data.sectionName,
                courseId:course._id,
            },jwtToken);
  
        }else{
            result = await createSection({
                sectionName : data.sectionName,
                courseId:course._id
            },jwtToken);
        }

        if(result){
            dispatch(setCourse(result));
            setEditSection(null);
            setValue("sectionName","");
        }


       }



  return (
    <div className='text-white bg-richblack-800 py-4 px-6 mt-7 rounded-lg '>

    <p className='text-xl'>Course Builder</p>

    <form onSubmit={handleSubmit(onSubmit)}>
        <input
        id='sectionName'
        placeholder='Add a section to build your course'
        className='form-style w-full mt-5 '
        {...register("sectionName" , {required:true})}

        />
        {errors.sectionName && <span>PLz Provide Section to Build course</span>}

        <div className='flex gap-4 items-center '>
             <IconBtn
            type="submit"
            text={editSection ? "Save Section " :" Create Section "  }
            outline={true}
            customClasses={` mt-5 border-1 border-yellow-100`}

        ><CiCirclePlus className='text-xl font-bold' /> </IconBtn>

       {editSection && ( <button
            
            className='text-sm text-richblack-300 underline ml-10'

            onClick={cancelEdit}

       >Cancel Edit</button> )}

       
          
        </div>

       
    </form>

    {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}


    <div className='flex gap-3 justify-end'>
        <button className='flex items-center bg-richblack-900 p-3 rounded-lg text-richblack-50 gap-1 px-4'
         onClick={goBack}
         ><MdOutlineKeyboardArrowLeft/> Back</button>
        <button className='bg-yellow-100 p-3 px-4 rounded-lg text-richblack-900 flex gap-1 items-center'
        onClick={goToNext}
         >Next <MdOutlineKeyboardArrowRight/> </button>
    </div>
      
    </div>
  )
}

export default CourseBuilderForm
