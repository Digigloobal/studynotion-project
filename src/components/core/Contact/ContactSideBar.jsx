import React from 'react'
import { IoIosChatboxes } from "react-icons/io";
import { IoEarthSharp ,IoCall } from "react-icons/io5";

const ContactSideBar = () => {
  return (
    <div className='text-white flex flex-col gap-10 bg-richblack-800 p-8 rounded-md w-[120%] '>

    <div className='flex gap-3'>

    <IoIosChatboxes className='text-2xl text-richblack-25' />
    <div>
        <p>Chat on us</p>
        <p className='text-[12px] text-richblack-400'>Our friendly team is here to </p>
        <p className='text-[12px] text-richblack-400' >help.@mail.com</p>
    </div>



    </div>

    <div className='flex gap-3'>
    <IoEarthSharp className='text-2xl text-richblack-25' />
    <div>
        <p>Visit us</p>
        <p className='text-[12px] text-richblack-400' >Come and say hello at our office HQ.</p>
        <p className='text-[12px] text-richblack-400' >Here is the location/ address</p>
    </div>

    </div>

    <div className='flex gap-3' >
    <IoCall className='text-2xl text-richblack-25' />
    <div>
        <p>Call us</p>
        <p className='text-[12px] text-richblack-400' >Mon - Fri From 8am to 5pm</p>
        <p className='text-[12px] text-richblack-400' >+123 456 7890</p>
    </div>

    </div>
      
    </div>
  )
}

export default ContactSideBar
