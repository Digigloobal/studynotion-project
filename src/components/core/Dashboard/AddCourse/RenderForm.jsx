import React from 'react'
import { FcCheckmark } from 'react-icons/fc';
import { IoCheckmarkSharp } from "react-icons/io5";
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderForm = () => {
        
 
     const {step} = useSelector((state) => state.course );

    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish",
        },
    ]

  return (
    <div className="flex flex-col mb-6 ">
    <div className='flex flex-row gap-2  '>

    {steps.map((item)=> (
        <>
            <div>
                <div >
                     {step > item.id ? <div className={` bg-yellow-100 border border-yellow-50 text-richblack-900   rounded-full flex py-4 px-5 text-xl `}  ><IoCheckmarkSharp className='font-bold' />  </div>:  <div className={`  ${step === item.id ? (" bg-yellow-900 border border-yellow-50 text-yellow-100 ") : (" text-richblack-100 bg-richblack-800 ")}  rounded-full flex py-3 px-6 text-xl `} >{item.id}
                     </div>} 
                    
                </div>
                        
            </div>

            

            {item.id < steps.length && (<div className={`${item.id < step ? " text-yellow-100 text-xl  " :" text-richblack-700 text-xl  "}  `}>_ _ _ _ _ _ _ _ _ _ _ </div>)}
        </>
    ))}
 </div>
 <div className='text-richblack-25  -ml-10 mt-3 flex gap-x-40'>
    {steps.map((item)=>(
        <>
              <div>{item.title}</div>  
        </>
    ))}
 </div>
       
       <div>
     
        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <PublishCourse/> }
     

        

       </div>
    </div>
  )
}

export default RenderForm
