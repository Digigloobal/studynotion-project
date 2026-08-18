import React from 'react'
import ProfilePictureUpdate from './Setting/ProfilePictureUpdate'
import EditProfile from './Setting/EditProfile'
import ChangePassword from './Setting/ChangePassword'
import DeleteAccount from './Setting/DeleteAccount'

const Settings = () => {
  return (
    <div className='bg-richblack-800 w-full  flex justify-center flex-col gap-5 items-center  '>


    <div className='flex justify-start  w-[70%] mt-5'>
        
        <h1 className='text-2xl text-richblack-50'>Edit Profile</h1>

          
    </div>

     <ProfilePictureUpdate/>

    <EditProfile/>

    <ChangePassword/>

    <DeleteAccount/>


 
      
    </div>
  )
}

export default Settings
