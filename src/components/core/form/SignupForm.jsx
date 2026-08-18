import React, { useState } from 'react'
import { GoNorthStar } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
//import CTAButton from '../Homepage/CTAButton'
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../services/operations/authAPI';
import { setSignupData } from '../../../slices/authSlice';
import toast from 'react-hot-toast';

const SignupForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [currentTab , setCurrentTab] = useState("Student");
   
   const [formData , setFormData] = useState({
              firstName:"",
              lastName:"",
              email:"",
              contactNumber:"",
              password:"",
              confirmPassword:"",       
   })

   

function setTab(value){
  console.log("accountype",value)
  setCurrentTab(value);
}

const [showPassword , setShowPassword] = useState(false);
const [showConfirmPassword , setShowConfirmPassword] = useState(false);


  const {firstName,lastName,email,password,confirmPassword,contactNumber} = formData;

   function changeHandler(event){
    setFormData((prevData) => ({
       
       ...prevData,
        [event.target.name] : event.target.value,
    }))
   }

 
    
    function submitHandler(event){
      event.preventDefault();

      if(password !== confirmPassword){
        toast.error("Password does not match");
        console.log("Password => ", password)
        console.log("confirmPassword =>", confirmPassword  )
        return
      }

     const signupData = {
      ...formData,
      accountType:currentTab,
    }

    dispatch(setSignupData(signupData));
    console.log("Signup Data", signupData);
    dispatch(sendOtp(formData.email,navigate));
    console.log("Signup Data", signupData);
    
     setFormData({
            firstName:"",
              lastName:"",
              email:"",
              contactNumber:"",
              password:"",
              confirmPassword:"",
             
     })
    }

  return (
    <div>
<div className='flex gap-3 bg-richblack-800 rounded-full w-[220px] items-center justify-evenly h-12 mt-5 mb-4 '> 
       <div onClick={ () => setTab("Student") }  className={`${currentTab === "Student" ? " bg-richblack-900 text-richblack-25 " : " bg-richblack-800 text-richblack-200"}  h-9 w-[100px] flex items-center justify-center rounded-full hover:cursor-pointer`}> <div >Student</div></div>
       <div onClick={() =>  setTab("Instructor")} className={`${currentTab === "Instructor" ? " bg-richblack-900 text-richblack-25  " : " bg-richblack-800 text-richblack-200 "} rounded-full h-9 w-[100px] flex items-center justify-center hover:cursor-pointer`}><div >Instructor</div></div>

      </div>

    <div className='w-full flex flex-col '>
      <form className='text-white flex flex-col w-full gap-3' onSubmit={submitHandler} >

     <div className='flex gap-4 w-full'>

     <div className='flex flex-col gap-2 w-[30%]'>
       <label className='flex gap-1' htmlFor='firstName'>First Name <GoNorthStar className='text-pink-200 text-[10px] mt-1' />  
         
      </label>
      <input 
            type='text'
            id='firstName'
            name='firstName'
            placeholder='Enter First Name'
            value={firstName}
            onChange={changeHandler}
            
            className='bg-richblack-800 rounded-lg outline-none p-3 text-richblack-25 border border-richblack-700'

           />
     </div>
     <div className='flex flex-col gap-2 w-[30%]'>
      <label htmlFor='lastName' className='flex gap-1' >Last Name   
        
      </label>
       <input 
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Enter Last Name'
            value={lastName}
            onChange={changeHandler}
             className='bg-richblack-800 rounded-lg outline-none p-3 text-richblack-25 border border-richblack-700'
           />
     </div>
     

       
     </div>

     <div className='flex flex-col gap-2 w-[62%]'>
      <label htmlFor='email' className='flex gap-1' >Email Address <GoNorthStar  className='text-pink-200 text-[10px] mt-1' />

     </label>
     <input
      type='email'
      id='email'
      name='email'
      placeholder='Enter Email Address'
      value={email}
      onChange={changeHandler}
      className='bg-richblack-800 rounded-lg outline-none p-3 text-richblack-25 border border-richblack-700'

     />
     </div>

     <div className='flex flex-col gap-2 w-[62%]' >
      <label htmlFor='contactNumber' className='flex gap-1' >Phone Number <GoNorthStar  className='text-pink-200 text-[10px] mt-1' />
     
      
      </label>
       <input
      type='Number'
      id='contactNumber'
      name='contactNumber'
      placeholder='Enter Contact Number'
      value={contactNumber}
      onChange={changeHandler}
      className='bg-richblack-800 rounded-lg outline-none p-3 text-richblack-25 border border-richblack-700'

      />
     </div>


     <div className='flex gap-4 w-full'>

     <div className='flex flex-col gap-2 w-[30%] relative'>
       <label htmlFor='password' className='flex gap-1'>Create Password <GoNorthStar  className='text-pink-200 text-[10px] mt-1' />
     
      
      </label>
       <input
      type={showPassword ? 'text' : 'password'}
      id='password'
      name='password'
      placeholder='Enter Password'
      value={password}
      onChange={changeHandler}
       className='bg-richblack-800 rounded-lg outline-none p-3 text-richblack-25 border border-richblack-700 '

      />
      <div className='absolute right-3 bottom-4 text-lg cursor-pointer '>
         {showPassword ? <AiOutlineEyeInvisible onClick={()=>{setShowPassword(false)}}/> : <AiOutlineEye onClick={() =>{setShowPassword(true)}}/>}
      </div>
     
     </div>
     <div className='flex flex-col gap-2 w-[30%] relative'>
      <label htmlFor='confirmPassword' className='flex gap-1'>Confirm Password <GoNorthStar  className='text-pink-200 text-[10px] mt-1' />
      
      
      </label>
      <input
      type={showConfirmPassword ? 'text' : 'password'}
      id='confirmPassword'
      name='confirmPassword'
      placeholder='Enter Password'
      value={confirmPassword}
      onChange={changeHandler}
       className='bg-richblack-800 rounded-lg outline-none p-3 text-richblack-25 border border-richblack-700'

      />

      <div className='absolute right-3 bottom-4 text-lg cursor-pointer'>
         {showConfirmPassword ? <AiOutlineEyeInvisible onClick={()=>{setShowConfirmPassword(false)}}/> : <AiOutlineEye onClick={() =>{setShowConfirmPassword(true)}}/>}
      </div>
     </div>
     


     </div>

     <div >
      <button
        type="submit"
        className="bg-yellow-50 text-black font-semibold py-3 rounded-lg mt-2 w-[60%]"
      >
        Create Account
      </button>
     </div>

    




        
      </form>
    </div>
    </div>
  )
}

export default SignupForm
