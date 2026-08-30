import React from 'react'
import ContactUsForm from '../components/core/Contact/ContactUsForm'
import ContactSideBar from '../components/core/Contact/ContactSideBar'
import Footer from '../components/core/common/Footer'
import ReviewSlider from '../components/core/common/ReviewSlider'

const ContactPage = () => {
  return (
    <div>
    <div className='flex lg:flex-row gap-4 flex-col lg:justify-evenly lg:items-start items-center w-11/12 mt-10 '>
     
    <div>

    <ContactSideBar/>

    </div>

    <div className=' border border-richblack-300 rounded-md justify-center items-center py-9 lg:w-[50%] w-[95%]  flex flex-col gap-4'>
    <div className='flex flex-col text-white gap-2 lg:w-[80%] w-[90%]'>
        <p className='lg:text-3xl text-2xl'>Got a Idea? We’ve got the skills. Let’s team up</p>
        <p className='text-richblack-400'>Tell us more about yourself and what you’re got in mind.</p>
    </div>
    <div className='lg:w-[80%] w-[90%] mx-auto'>
      <ContactUsForm/>
    </div>
       
    </div>
    </div>
     
     {/* <div className='lg:w-11/12 mt-16 gap-5 flex flex-col justify-center  ' >
      <div className='text-richblack-5 text-center text-3xl' >Reviews From Other Learners</div>
         <ReviewSlider/>
      </div> */}



    <div className='w-screen bg-richblack-800'>
        <Footer/>
      </div>
    </div>
  )
}

export default ContactPage
