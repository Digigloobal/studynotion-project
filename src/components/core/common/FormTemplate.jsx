import React from 'react'
import frame from '../../../assets/Images/frame.png'
import LoginForm from '../form/LoginForm'
import SignupForm from '../form/SignupForm'
//import HighlightText from '../Homepage/HighlightText'
//import { useState } from 'react'


const FormTemplate = ({ formType ,imgType ,heading ,subHeading}) => {

  return (
   <div className='w-screen  flex flex-col justify-center items-center '>
      <div className='lg:w-11/12 flex lg:flex-row flex-col-reverse justify-start items-center'>
      
      <div className='lg:w-[50%] ml-10 mt-20'>

      <div  className='text-white w-full flex flex-col gap-3'>
       
        <div className='text-3xl w-[70%]'>{heading}</div>
      <div className='text-xl text-richblack-200 w-[70%]' >{subHeading}</div>
      

      <div>
           {formType === "loginForm" ?
         (<div>
         <LoginForm heading={heading} subHeading={subHeading} />
        </div>)       
        :        
        (<div>
 
         <SignupForm/>        
        </div> 
        )}


      </div>


      </div>
         
       

    
      </div>

        <div className='relative lg:w-[40%] mt-20'>
            
            <img src={frame} className='absolute inset-0 left-[5%] top-[5%]' alt='frame'></img>
            <img src={imgType} className='relative' alt='imgtype'></img>
        </div>
      </div>
    </div>
  )
}

export default FormTemplate
