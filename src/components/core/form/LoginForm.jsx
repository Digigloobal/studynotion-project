import React from 'react'

import { GoNorthStar } from "react-icons/go";
import HighlightText from '../Homepage/HighlightText';
import CTAButton from '../Homepage/CTAButton';
import { useState } from "react";
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
import { Link } from 'react-router-dom';


const LoginForm = ({ heading ,  subHeading }) => {
 

   const dispatch = useDispatch();
   const navigate = useNavigate()
     
    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prev)=> ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const {email,password} = formData

  function submitHandler(event) {
    event.preventDefault();
    dispatch(login(email,password,navigate));
    
  }

const [showPassword , setShowPassword] = useState(false);


  return (     
     

      <div>

        <form
      onSubmit={submitHandler}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-richblack-100 flex gap-1">
          Email Address<GoNorthStar className='text-pink-200 text-[10px] mt-1'/>
        </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email Address"
          value={formData.email}
          onChange={changeHandler}
          className="bg-richblack-800 text-white rounded-lg p-3 outline-none border border-richblack-700"
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <label htmlFor="password" className="text-richblack-100 flex gap-1 ">
          Password <GoNorthStar className='text-pink-200 text-[10px] mt-1'/>
        </label>

        <input
          type={ showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={changeHandler}
          className="bg-richblack-800 text-white rounded-lg p-3 outline-none border border-richblack-700 "          
        />

       <div className='absolute right-[3%] top-[60%] hover:cursor-pointer ' >
           {showPassword ? <AiOutlineEyeInvisible className='text-xl ' onClick={()=>setShowPassword(false)} /> : <AiOutlineEye className='text-xl' onClick={()=>setShowPassword(true)}/>}
       </div>
       
      </div>

      <div className='w-full relative mb-4'>
        <Link to={"/forgot-password"} className='absolute text-[13px] text-blue-100 right-1 -top-3' >
          <p>Forgot Password</p>
        </Link>
      </div>

      <button
        type="submit"
        className="bg-yellow-50 text-black font-semibold py-3 rounded-lg mt-2"
      >
        Sign In
      </button>
        </form>
      </div>
  )
}







export default LoginForm;

