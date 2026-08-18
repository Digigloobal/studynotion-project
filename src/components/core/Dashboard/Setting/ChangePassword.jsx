import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../../services/operations/settingAPI';
import { useDispatch, useSelector } from 'react-redux';



const ChangePassword = () => {

    const {jwtToken} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

       const {
                register,
                handleSubmit,
                //reset,
                formState:{errors}
        
            } = useForm();

      const submitHandler = (data)=>{

        console.log(data);

         try {

            dispatch(changePassword(data,jwtToken));
     
            
         } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
         }
        
      }       


  return (

    <div className='w-[70%]' >

   
   <form className='w-full' onSubmit={handleSubmit(submitHandler)} >

    <div className='h-44 flex-col bg-richblack-900 flex w-[100%] gap-5 px-4  rounded-md ' >

   
     <div className='text-richblack-50 mt-5' >Password</div>

    <div className='w-full flex gap-3' >
        <div className='w-[100%] flex flex-col'>
            <label htmlFor='oldPassword' className='text-richblack-50' >Current Password</label>
            <input
                type='text'
                id='oldPassword'
                name='oldPassword'
                {...register("oldPassword",{required:true})}
                placeholder='Enter Current Password'
                className='form-style'
            />

            {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your current Password
                </span>
              )}
        </div>

         <div className='w-[100%] flex flex-col'>
            <label htmlFor='newPassword' className='text-richblack-50' >New Password</label>
            <input
                type='text'
                id='newPassword'
                name='newPassword'
                {...register("newPassword",{required:true})}
                placeholder='Enter New Password'
                className='form-style'
            />

            {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your new Password
                </span>
              )}
        </div>



    </div> 

   
  
    </div>


    <div className='flex gap-3 mt-5 flex-row-reverse' >
        <button className='bg-richblack-700 text-richblack-50 px-10 py-2 font-semibold rounded-md'
          onClick={()=>{
            navigate("/dashboard/my-profile")
            
          }}
        
        >Cancel</button>

        <IconBtn text={"Save"} type="submit" customClasses={"px-12"} />
    </div>
      </form>  

     

 </div>

  
  )
}

export default ChangePassword
