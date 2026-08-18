import React, { useState } from 'react'
import { GoNorthStar } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPasswordToken } from '../../../services/operations/authAPI';
import { FaArrowLeftLong } from "react-icons/fa6";

const ResetPassword = () => {
  const dispatch = useDispatch();


const [emailSend,setEmailSend] = useState(false);
const [formData,setFormData] = useState({
  email:""
});

const {email} = formData

function changeHandler(event){
   setFormData((prev) => ({
    ...prev,
    [event.target.name] : event.target.value,
  }))
}

function submitHandler(event){
event.preventDefault();

dispatch(resetPasswordToken(email ,setEmailSend));



}

  return (
    <div className='flex flex-col gap-3  justify-center items-start mt-44 w-3/12'>

    <div className='text-white text-2xl flex justify-start'>
          {
            emailSend ? (<div>Check email</div>) : (<div>Reset your password </div> )
          }

    </div>

    <div className='text-richblack-400  '>  
      {
        emailSend ? (<p>We have sent the reset email to {email}</p> ) : (<p>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p> )
      }
        
     </div>

     <form onSubmit={submitHandler} className=' w-full'>
      {
        emailSend === false && (
          <div> 
          
            <label htmlFor='email' className='text-richblack-25 flex mt-5 text-sm'>
              Email Address
              <span><GoNorthStar className='text-pink-300 text-[10px]'/> </span>
            </label>

            <input
              type='email'
              placeholder='Enter Your Email'
              id='email'
              value={email}
              name='email'
              onChange={changeHandler}
              className='w-[100%] text-white bg-richblack-700 h-10 rounded-md border-richblack-800 border-b mt-3'
            />

            </div>
        
        )

     
      }
      { <div className='bg-yellow-50 mt-5 flex justify-center rounded-md h-10 items-center text-richblack-900 '>
      {emailSend ? (<div className='w-full'> <button type='submit' className='w-full'> Resend Email</button> </div>) : ( <div className='w-full'> <button className='w-full' type='submit' > Reset Password</button></div>)}
     </div> }


    </form>

     

     <div><Link to={"/login"} className='text-richblack-25 flex items-center gap-2'> 
          <FaArrowLeftLong/> Back to Login</Link> </div>

    
      
    </div>
  )
}

export default ResetPassword
