import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'
//import { categories } from '../../../../../services/apis'
import RequirementField from './RequirementField'
import ChipInput from './ChipInput'
import { setCourse, setStep } from '../../../../../slices/courseSlice'
import IconBtn from '../../../common/IconBtn'
import toast from 'react-hot-toast'
import Upload from '../Upload'
import { COURSE_STATUS } from '../../../../../utils/constants'

const CourseInformationForm = () => {
    
     const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

   const [courseCategories, setCourseCategories] = useState([]);

   const [loading,setLoading] = useState(false);

   const {editCourse,course} = useSelector((state) => state.course);

   const {jwtToken} = useSelector((state) => state.auth);



   const getCategory = async (req,res) => {

       
    setLoading(true);

    const categories = await fetchCourseCategories();

    if(categories.length > 0){
      setCourseCategories(categories);
    }

    setLoading(false);
    
   }

   useEffect(()=>{
       
    if(editCourse){

      setValue("courseTitle",course.courseName);
      setValue("courseDescription",course.courseDescription);
      setValue("coursePrice",course.price);
      setValue("courseCategory",course.category);
      setValue("courseTags",course.tag);
      setValue("courseBenefit",course.whatYouWillLearn);
      setValue("courseRequirements",course.instructions);
      setValue("courseImage",course.thumbnail);

    }

    getCategory();
   },[]);


   const isFormUpdated = () =>{
      
      const currentValues = getValues();

      if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefit !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() )
            return true;
        else
            return false;
   }


   const onSubmit = async (data) => {

    console.log("data=>",data);

    if(editCourse){
      if(isFormUpdated()){
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId",course._id);
         if(currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle);
            }

          if(currentValues.courseDescription !== course.courseDescription) {
                formData.append("courseDescription", data.courseDescription);
            }   


            if(currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice);
            }


            if(currentValues.courseTags !== course.tag){
              formData.append("tag",JSON.stringify(data.courseTags));
            }

            if(currentValues.courseBenefit !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefit);
            }

            if(currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory);
            }

            if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                formData.append("instructions", JSON.stringify(data.courseRequirements));
            }

             if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

            setLoading(true);

            const result = await editCourseDetails(formData,jwtToken);
            setLoading(false);
            if(result){
              dispatch(setStep(2));
             dispatch(setCourse(result));
            }
      }

      else{
        toast.error("No changes made so far");
      }


       console.log("PRINTING FORMDATA", formData);
            console.log("PRINTING result", result);

      return
    }


      //create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefit);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("tag",JSON.stringify(data.courseTags));
         formData.append("thumbnailImage", data.courseImage);
        formData.append("status", COURSE_STATUS.DRAFT);

        setLoading(true);
        console.log("BEFORE add course API call");
        console.log("PRINTING FORMDATA", formData);

        const result = await addCourseDetails( formData , jwtToken );
        if(result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("PRINTING FORMDATA", formData);
        console.log("PRINTING result", result);

    }


   const dispatch = useDispatch();

  return (
    <form className=" max-w-[800px] text-white bg-richblack-800 py-4 px-6 mt-7 rounded-lg overflow-hidden" onSubmit={handleSubmit(onSubmit)} >

     <div className='flex flex-col gap-1' >
      <label htmlFor='courseTitle' className='text-richblack-50 flex items-center ' >Course Title <sup className='text-pink-300 text-lg pt-3' >*</sup></label>
      <input
        id='courseTitle'
        name='courseTitle'
        placeholder='Enter Course Title'
        {...register("courseTitle" ,{required:true})}
        className='w-full form-style'
      />
      {errors.courseTitle && ( <span className="ml-2 text-xs tracking-wide text-pink-200" >
        plz Provide  Course Title
      </span>)}
     </div>

     <div className='flex flex-col gap-1 mt-4' >
      <label htmlFor='courseDescription' className='text-richblack-50 flex items-center ' >Course Short Description <sup className='text-pink-300 text-lg pt-3' >*</sup></label>
      <textarea
        id='courseDescription'
        name='courseDescription'
        placeholder='Enter Description'
        rows="3"

        {...register("courseDescription" ,{required:true})}
        className='w-full form-style'
      />
      {errors.courseDescription && ( <span className="ml-2 text-xs tracking-wide text-pink-200" >
        plz Provide  Course Short Description 
      </span>)}
     </div>

     <div className='flex flex-col gap-1 mt-4 relative' >
      <label htmlFor='coursePrice' className='text-richblack-50 flex items-center ' >Price <sup className='text-pink-300 text-lg pt-3' >*</sup></label>
      <input
        id='coursePrice'
        name='coursePrice'
        placeholder= 'Enter Price'
        {...register("coursePrice" ,{required:true,
        valueAsNumber:true})}
        className='w-full form-style px-8'
      />
      <HiOutlineCurrencyRupee className='absolute top-[65%] text-richblack-400 left-[1%]' />
      
      {errors.coursePrice && ( <span className="ml-2 text-xs tracking-wide text-pink-200" >
        Plz Provide  Course Price 
      </span>)}
     </div>


     <div className='flex flex-col gap-1 mt-4 '>

     <label htmlFor='courseCategory' className='text-richblack-50 flex items-center ' >Category <sup className='text-pink-300 text-lg pt-3' >*</sup></label>
     <select
     id='courseCategory'
     defaultValue=""
     {...register("courseCategory",{required:true})}
     className='w-full form-style '


     >
      <option value="" disabled  >Choose a Category</option>
      {courseCategories.map((category)=>(
        <option value={category?._id} key={category?.id}  >{category?.name}</option>
      ))}
     </select>

     </div>

     {/* {tags code here} */}
     <div>
      <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues = {getValues}
        />
     </div>

     {/* {image code here} */}
     <div className='mt-10  mx-auto'>

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
     </div>


     <div className='flex flex-col gap-1 mt-4' >
      <label htmlFor='courseBenefit' className='text-richblack-50 flex items-center ' >Benefits of the course <sup className='text-pink-300 text-lg pt-3' >*</sup></label>
      <textarea
        id='courseBenefit'
        name='courseBenefit'
        placeholder='Enter Benefits of the course'
        rows="3"

        {...register("courseBenefit" ,{required:true})}
        className='w-full form-style'
      />
      {errors.courseBenefit && ( <span className="ml-2 text-xs tracking-wide text-pink-200" >
        plz Provide Course Benefit  
      </span>)}
     </div>
      
       <div>
        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
       </div>

       <div className='flex gap-2 flex-row-reverse'>
        { editCourse && (
          <button
          onClick={()=> dispatch(setStep(2))}
          className='flex items-center gap-x-2 bg-richblack-300'
          > Continue Without Saving</button>
        )}

        <IconBtn 
           text={!editCourse ? "Next" : "Save Changes"}
           type="submit"
          
        />


       </div>
       

    </form>
  )
}

export default CourseInformationForm

