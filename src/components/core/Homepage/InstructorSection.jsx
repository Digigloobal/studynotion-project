import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'

const InstructorSection = () => {
  return (
    <div className='flex  justify-center w-full mt-16 gap-7 items-center '>
       
       <div className=' flex lg:flex-row flex-col gap-16 items-center mx-auto'>
        <img src={Instructor} className='w-[500px] lg:ml-44 ml-20 shadow-[-12px_-10px_11px_12px_#f7fafc]'></img>
        <div className='flex flex-col lg:items-start items-center gap-5 ' >
        <div className='text-white lg:text-4xl text-2xl lg:w-[200px] w-full '>Become an <HighlightText text={"instructor"}/></div>
        <div className='text-richblack-200 lg:w-[450px] w-full'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
        <CTAButton text={"Start Teaching Today "} active={true} showIcon={true} linkTo={"/signup"}/>
       </div>
       </div>

       


    </div>
  )
}

export default InstructorSection
