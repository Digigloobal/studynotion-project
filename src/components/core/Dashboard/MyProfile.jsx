import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../common/IconBtn';
import { FiExternalLink } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


const MyProfile = () => {
  
   const{user,loading:profileLoading} = useSelector((state)=> state.profile);
   const{loading:authLoading} = useSelector((state)=>state.auth);

    const navigate  = useNavigate();


   if(profileLoading || authLoading){
    return(
      <div>
        Loading....
      </div>
    )
   }

   console.log("user About", user?.additionalDetail?.about);
   console.log("user gender", user?.additionalDetail?.gender);

   const dob = user?.additionalDetail?.dateOfBirth;

    if(!user) return null;

  return (
    <div className='bg-richblack-800 w-full h-screen flex justify-center items-center  '>

    <div className='w-8/12 flex flex-col item-center  gap-4' >

    <div className='text-white text-3xl'>My Profile</div>

    <div className='h-36 bg-richblack-900 flex w-[100%] justify-between px-7 items-center rounded-md '>

    <div className='flex  gap-3 items-center justify-center'>
      <img src={user?.image} width={80} alt={user?.firstName} className='rounded-full' ></img>
      <div >
      <div className='text-richblack-25' >{user?.firstName + " " + user?.lastName}</div>
      <div className='text-richblack-400' >{user?.email}</div>
      </div>
    </div>

    <div>
      <IconBtn text={"Edit"} onclick={()=> navigate("/dashboard/settings")} >

       <FiExternalLink/>

      </IconBtn>
     
    </div>
    
        
        

    </div>

     <div className='h-36 bg-richblack-900 flex w-[100%] justify-between px-7 items-center rounded-md '>

    <div className='flex  gap-3 items-center justify-center'>
      <div >
      <div className='text-richblack-25' >About</div>
      <div className='text-richblack-400' > { user.additionalDetail.about ??  "Write Somethng About Yourself " }</div>
      </div>
    </div>

    

    <div>
      <IconBtn text={"Edit"} onclick={()=> navigate("/dashboard/settings")} >

       <FiExternalLink/>

      </IconBtn>
     
    </div>
    
        
        

    </div>


     <div className='h-72 bg-richblack-900 flex w-[100%] justify-between px-7 items-center rounded-md '>

    <div className='flex  gap-3 items-center justify-start w-full'>
      <div className='w-[100%]' >
      <div className='text-richblack-25 text-lg' >Personal Details</div>


      <div>

       <div className='flex justify-between w-[70%] mt-5 ' >
      <div className='text-richblack-600'>
        First Name
        <div className='text-richblack-25'>{user?.firstName}</div>
      </div>
      <div className='text-richblack-600'>Last Name
       <div className='text-richblack-25'>{user?.lastName}</div>
      </div>


 
      </div>

      <div className='flex justify-between w-[70%] mt-5 ' >
       
       <div className='text-richblack-600'>
        email
        <div className='text-richblack-25'>{user?.email}</div>
      </div>


      <div className='text-richblack-600'>
       Phone No.
        <div className='text-richblack-25'>{user?.additionalDetail?.contactNumber ?? "ADD PHONE NO. "}</div>
      </div>


      </div>

      <div className='flex justify-between w-[72%] mt-5 ' >
       
       <div className='text-richblack-600'>
        Gender
        <div className='text-richblack-25'>{user?.additionalDetail?.gender ?? "ADD GENDER"}</div>
      </div>


      <div className='text-richblack-600'>
       Date Of Birth
        <div className='text-richblack-25'>{dob ? new Date(user?.additionalDetail.dateOfBirth).toISOString().split("T")[0] :  " DATE OF BIRTH"}</div>
      </div>


      </div>
      
      
       </div>


     
      </div>
    </div>

    

    <div>
      <IconBtn text={"Edit"} onclick={()=> navigate("/dashboard/settings")} >

       <FiExternalLink/>

      </IconBtn>
     
    </div>
    
        
        

    </div>



    </div>
   
      
    </div>
  )
}

export default MyProfile
