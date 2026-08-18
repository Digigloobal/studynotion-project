import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import bannerimage1 from '../assets/Images/aboutus1.webp'
import bannerimage2 from '../assets/Images/aboutus2.webp'
import bannerimage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import foundingImage from "../assets/Images/FoundingStory.png"
import AboutContent from '../components/core/AboutPage/AboutContent'
import LearningContent from '../components/core/AboutPage/LearningContent'
import ContactUsForm from '../components/core/Contact/ContactUsForm'
import Footer from '../components/core/common/Footer'
import ReviewSlider from '../components/core/common/ReviewSlider'




const AboutPage = () => {
  return (
    <div>

       <div className='flex flex-col justify-center items-center text-white gap-3 mx-auto  bg-richblack-800 '>

        <section className='flex flex-col justify-center items-center mt-16 gap-5 w-11/12 relative mb-[270px]'>
            <p className='text-richblack-200'>About us</p>
            <div className='text-4xl w-[60%] text-center font-bold '>Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} /></div>
            <p className='w-[54%] text-center text-richblack-400'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            <div className='flex gap-5 justify-between absolute translate-y-[100%]'>
            <img src={bannerimage1} alt='bannerImage1' ></img>
             <img src={bannerimage2} alt='bannerImage2'  ></img>
              <img src={bannerimage3} alt='bannerImage3' ></img>

            </div>
        </section>

       </div>

       <section className='flex justify-center items-center mt-40 w-11/12 mx-auto'>
            <Quote/>
        </section>

        <section className='flex flex-col w-11/12  mt-14 mx-auto gap-10'>
            <div className='flex  justify-evenly w-full'>

            <div className='flex flex-col gap-4 text-white w-[29%] items-start '>

            <h2 className='text-3xl font-semibold text-pink-300' >Our Founding Story</h2>
            <p className='text-[14px] text-richblack-400 '>
                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </p>
            <p className='text-[14px]  text-richblack-400'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential. </p>

            </div>
             <div className='w-[40%]'>
             <img src={foundingImage} alt='foundingImage'></img>
                
            </div>
                
            </div>
            <div className='flex justify-evenly gap-16 mt-20 '>
            <div className='flex flex-col gap-3 text-white w-[30%] items-start  -ml-[100px]'>
                <h2 className='text-3xl text-brown-100 font-bold'>Our Vision</h2>
                <p className='text-richblack-400 text-[14px]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>

            </div>

            <div className='flex flex-col gap-4 text-white w-[30%] items-start -ml-[150px]'>
                <h2 className='text-3xl font-bold '><HighlightText text={"Our Mission"} /></h2>
                <p className='text-richblack-400 text-[14px]'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>

            </div>
        </section>

      <section className='flex w-full  mt-14 mx-auto text-white bg-richblack-800'>    
        <AboutContent/>
        </section>

        <section>
            <LearningContent/>
        </section>

        <section className='flex flex-col gap-5 w-4/12 mx-auto items-center justify-center mt-44 mb-12'>
        <div className='text-white text-center flex flex-col gap-3'> 
            <h2 className='text-3xl'>Get In Touch</h2>
            <p className='text-richblack-400'> We’d love to here for you, Please fill out this form.</p>
        </div>
            <ContactUsForm/>
        </section>

        <div className='lg:w-11/12 mt-16 gap-5 flex flex-col justify-center  ' >
      <div className='text-richblack-5 text-center ml-16 text-3xl' >Reviews From Other Learners</div>
         <ReviewSlider/>
      </div>
      


       <div className='w-screen bg-richblack-800'>
        <Footer/>
      </div>
      
    </div>
  )
}

export default AboutPage
