import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import Spinner from '../common/Spinner';
import { GoNorthStar } from 'react-icons/go';
import { resetPassword } from '../../../services/operations/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { AiOutlineEye , AiOutlineEyeInvisible } from 'react-icons/ai';

const UpdatePassword = () => {
      const {loading} = useSelector((state) => state.auth);

      const dispatch = useDispatch();

      const location = useLocation();

      const navigate = useNavigate();

      const [showPassword,setShowPassword] = useState(false);
      const [showConfirmPassword,setShowConfirmPassword] = useState(false);

      const [formData,setFormData] = useState({
        password:"",
        confirmPassword:""
      })

      function changeHandler(e){
        setFormData((prevData) =>({
            ...prevData,
            [e.target.name]:e.target.value
        }))
      }

      const {password,confirmPassword} = formData;

      const token = location.pathname.split("/").at(-1);

      function submitHandler(e){
        e.preventDefault();
      
         if(password !== confirmPassword){
            toast.error("Password don't match plz try again")
            setFormData({
                password:"",
                confirmPassword:""
            })

            return
         }

        dispatch(resetPassword(password,confirmPassword,token,navigate));
      }
     
  return (
    <div>

    {
        loading ? (<div>Loading.....</div>) : (
            <div className='flex flex-col gap-3  justify-center items-start mt-44'>
                <h1 className='text-white text-2xl flex justify-start'>Choose New Password</h1>
                <p className='text-richblack-400 w-[90%]'>Almost done. Enter your new password and you are all set.</p>
                <form onSubmit={submitHandler} className=' w-full'>
                <div className='relative'> 

                <label htmlFor='password' className='text-richblack-25 flex mt-3 text-[14px]'>Password <span><GoNorthStar className='text-pink-300 text-[10px]'/></span></label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        name='password'
                        value={password}
                        placeholder='Enter Password'
                        onChange={changeHandler}
                        className='w-[100%] text-white bg-richblack-700 h-10 rounded-md border-richblack-800 border-b mt-3'
                    />

                   <div className='absolute right-[3%] top-[60%] hover:cursor-pointer ' >
                              {showPassword ? <AiOutlineEyeInvisible className='text-xl ' onClick={()=>setShowPassword(false)} /> : <AiOutlineEye className='text-xl' onClick={()=>setShowPassword(true)}/>}
                          </div>
                
                </div>

                <div className='relative'>
                   <label htmlFor='confirmPassword' className='text-richblack-25 flex mt-3 text-[14px]'> Confirm Password <span><GoNorthStar className='text-pink-300 text-[10px]'/></span></label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id='confirmPassword'
                        name='confirmPassword'
                        value={confirmPassword}
                        placeholder='Enter Password'
                        onChange={changeHandler}
                        className='w-[100%] text-white bg-richblack-700 h-10 rounded-md border-richblack-800 border-b mt-3'
                    />

                    <div className='absolute right-[3%] top-[60%] hover:cursor-pointer ' >
                              {showConfirmPassword ? <AiOutlineEyeInvisible className='text-xl ' onClick={()=>setShowConfirmPassword(false)} /> : <AiOutlineEye className='text-xl' onClick={()=>setShowConfirmPassword(true)}/>}
                          </div>

                </div>
                    
                     
                     

                    <button type='submit' className='bg-yellow-50 mt-5 flex justify-center rounded-md h-10 items-center text-richblack-900 w-full'> Reset Password</button>


                </form>

                <div>
                
                <Link to={"/login"} className='text-richblack-25 flex items-center gap-2'> 
                  <FaArrowLeftLong/> Back to Login</Link> </div>
            </div>
        )
    }
      
    </div>
  )
}

export default UpdatePassword
