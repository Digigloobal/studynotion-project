import React, { useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import Upload from '../Upload';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {


    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors},

    } = useForm();


    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const {jwtToken } = useSelector((state) => state.auth);


      useEffect(() => {
    if (view || edit) {
      console.log("modalData", modalData)
      setValue("lectureTitle", modalData.title)
      setValue("lectureDescription", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

    const formSubSectionUpdated = () =>{
        const currentValues = getValues();
       // console.log("changes after editing form values:", currentValues)
    

        if(currentValues.lectureVideo !== modalData.videoUrl ||
             currentValues.lectureTitle !== modalData.title || 
             currentValues.lectureDescription !== modalData.description ){

                return true;

        }else{
            return false;
        }
    }

    //console.log("courseId",course._id);


   

    const onSubmit = async (data) =>{
        if(view){
            return;
        }

        if(edit){

            

            if(formSubSectionUpdated()){
                //console.log("i am in edit the section form dataa line ")
                const currentValues = getValues();
                console.log("changes after editing form values:", currentValues)
                
                const formData = new FormData();

                 //formData.append("sectionId", modalData.sectionId);
                formData.append("subSectionId", modalData._id);
                formData.append("courseId",course._id);


                if(currentValues.lectureVideo !== modalData.videoUrl){
                    formData.append("videoFile",currentValues.lectureVideo)
                }

                if(currentValues.lectureTitle !== modalData.title){
                    formData.append("title",currentValues.lectureTitle)
                }else{
                    formData.append("title",modalData.title)
                }

                if(currentValues.lectureDescription !== modalData.description){
                    formData.append("description",currentValues.lectureDescription);
                }else{
                    formData.append("description",modalData.description);
                }
           
                console.log("formData in edit =>",formData);
               
                const result = await updateSubSection(formData , jwtToken);

                console.log("result of edit =>",result);
 

                if(result){
                dispatch(setCourse(result));
                }

                 setModalData(null);
            }else{
                toast.error("No changes made to the form")
            }
            
            return;
        }


        const formData = new FormData();

        formData.append("sectionId",modalData);
        formData.append("courseId", course._id)
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDescription);
        formData.append("videoFile",data.lectureVideo);

        console.log("form Data befor calling==>",formData);

        const result = await createSubSection(formData,jwtToken);
        if(result){
            dispatch(setCourse(result));
        }

         setModalData(null);
    }





  return (

    <div className=' text-white fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm '>

    
    <div className='absolute w-[50%] top-5 overflow-hidden  p-5  rounded-lg bg-richblack-800  ' >
    <div className='flex justify-between bg-richblack-700 p-3 rounded-lg text-lg'>
      <p >{view && "Viewing" } {edit && "Editing "} {add && "Adding"} Lecture</p>

      <button onClick={() =>setModalData(null)}>
       <RxCross2/>
      </button>

      </div>

       <form onSubmit={handleSubmit(onSubmit)}>

       <div className='mt-2 w-[90%]  mx-auto'>
       
       <Upload

         name="lectureVideo"
         label="Lecture Video"
         register={register}
         setValue={setValue}
         errors={errors}
         video={true}
        viewData={view ? modalData.videoUrl : null}
         editData={edit ? modalData.videoUrl : null}

                  />           
       </div>


       <div className='mt-2 flex flex-col gap-2'>
        <label htmlFor='lectureTitle' className='text-richblack-50' >Lecture Title <sup className='text-pink-300 text-lg'>*</sup></label>
        <input
            id='lectureTitle'
            placeholder='Enter Lecture Title'
            {...register("lectureTitle",{required:true})}
            className='form-style w-full'
        />
     {errors.lectureTitle && <span>
        Plz fill the Lecture Title
     </span> }
       </div>

       <div className='mt-3 flex flex-col gap-2'>
        <label htmlFor='lectureDescription' >Lecture Description <sup className='text-pink-300 text-lg pr-10'>*</sup></label>
        <textarea
            id='lectureDescription'
            rows="3"
            placeholder='Enter Lecture Title'
            {...register("lectureDescription",{required:true})}
            className='form-style w-full'
        />
     {errors.lectureDescription && <span>
        Plz fill Lecture Description 
     </span> }
       </div>

       {!view && (
        <div className='flex gap-7 mt-5 justify-end' >
        <button className='bg-richblack-900 p-4 px-6 rounded-lg ' onClick={() => setModalData(null)}>Cancel</button>
        <IconBtn type="submit" text={edit ? "Save Change" : "Save"}  customClasses={`px-10`} />

       </div>
       )}

       </form>
        
    </div>

    
    
      
    </div>
  )
}

export default SubSectionModal
