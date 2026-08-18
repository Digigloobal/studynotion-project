import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { RxTimer } from "react-icons/rx";
import { sendOtp, signUp } from '../../../services/operations/authAPI';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
   const {  loading,  signupData} = useSelector((state)=>state.auth);
   const [otp,setOtp] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(()=>{

    if(!signupData){
        navigate("/signup");
    }

   },[])

   function submitHandler(e){
    e.preventDefault();
 
     if(!signupData){
        toast.error("signupData is null plz retry signup")
     }

      const { firstName , lastName ,email , password, confirmPassword ,contactNumber, accountType } = signupData;
      
    dispatch(signUp(firstName , lastName ,email , password, confirmPassword , contactNumber, accountType, otp ,navigate))

   }



   





  return (
    <div>

    {loading ? (<div>Loading....</div>) : (<div className='flex flex-col gap-3  justify-center items-start mt-44 '>
    

         <h1 className='text-white text-2xl flex justify-start'>
            Verify Email
         </h1>

         <p className='text-richblack-400 w-[85%]'>A verification code has been sent to you. Enter the code below</p>

         <form className='w-full' onSubmit={submitHandler}>
              <OTPInput
             value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>---</span>}
            renderInput={(props) => <input {...props} className='bg-richblack-800 w-[55px] text-center h-12 text-lg text-white  rounded-md ' 
                placeholder='-'

            />}
            skipDefaultStyles={true}
           
         />


           <button className='bg-yellow-50 mt-5 flex justify-center rounded-md h-10 items-center text-richblack-900 w-[95%]' type='submit'>Verify Email</button>

         </form>

       
        


         <div className='flex justify-between w-[95%]'>
          
           <Link to={"/login"} className='text-richblack-25 flex items-center gap-2'> 
                  <FaArrowLeftLong/> Back to Login</Link> 

                  <div className='text-blue-400 flex items-center gap-2 cursor-pointer' onClick={()=>{dispatch(sendOtp(signupData.email , navigate))}}><RxTimer/> Resend it </div>



         </div>

         





    </div> )}


      
    </div>
  )
}

export default VerifyEmail
