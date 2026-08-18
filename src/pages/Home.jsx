import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/Homepage/CodeBlock';
import UnlockCards from '../components/core/Homepage/UnlockCards';
//import BgHome from '../assets/Images/bghome.svg'
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearnMoreSection from '../components/core/Homepage/LearnMoreSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import Footer from '../components/core/common/Footer';
import ReviewSlider from '../components/core/common/ReviewSlider';


const Home = () => {
  return (
     <div>
    <div className=' relative flex flex-col lg:justify-center lg:place-items-center max-w-sm lg:w-11/12 lg:items-center items-start lg:max-w-maxContent  text-white mx-auto'>
      
     
      <Link to={"/signup"}>
      <div className='group flex lg:flex-row flex-col rounded-full  bg-richblack-800  text-richblack-200 mt-16 p-1 font-bold mx-auto transition-all duration-200 hover:scale-95 w-fit font-inter'>
         <div className=' flex items-center text-center  gap-2 lg:px-10 py-[5px] rounded-full transition-all duration-200 group-hover:bg-richblack-900'>
            Become an Instructor
            <FaArrowRightLong/>
         </div>
         </div>
         </Link>

         <div className='lg:text-[35px] mt-8 text-[25px] flex-wrap font-semibold item-start md:text-[30px]'>
            Empower Your Future with 
            <HighlightText text={" Coding Skills"}/>
         </div>

         <div className='flex items-center justify-center w-full lg:w-8/12 text-richblack-200 mt-4'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
         </div>

         <div className='flex gap-4 mt-7'>
            <CTAButton active = {true} linkTo={"/signup"} text={"Learn More"} />
            <CTAButton active={false} text={"Book a Demo"} linkTo={"/login"}/>
         </div>

         <div className='flex items-center justify-center mt-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  '>
            <video className='w-full h-auto'
            muted 
            loop
            autoPlay
            >

            <source src={Banner} type="video/mp4"></source>


            </video>

         </div>


            <div className='w-11/12 '>

            <CodeBlock

            index={true}
             
            
             heading={<div>Unlock your <HighlightText text={"coding potential"}/> with our online courses.</div>} 

            subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                ctabutton1Text={"Try it Yourself"} 

                ctabutton2Text={"Learn More"}

                codeblock=
                {`<< !DOCTYPE html>
                <html>                    
                <head><title>Example</title>
                <link
                rel="stylesheet"href="styles.css">
                </head>                    
                <body>                    
                 <h1><a href="/" />Header                   
                 </h1>                    
                 <nav><a href="one/>One</a>
                 <a href="two/">Two</a>
                 <a href="three/">Three</a>                    
                 </nav></body>`}

                //  backgroundGradient={"bg-[radial-gradient(circle_at_50%_50%,rgba(255,159,109,1)_47%,rgba(251,180,138,1)_51%,rgba(245,145,102,1)_59%,rgba(242,179,104,1)_91%)]"}
                
            />

        
          
                
            </div>


            <div>
                <CodeBlock  

                
                heading={<div className='w-[40%]'>Start <HighlightText text={"coding in seconds"}/></div>} 

            subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}

                ctabutton1Text={"Continue Lesson"} 

                ctabutton2Text={"Learn More"}

                codeblock=
                {`<< !DOCTYPE html>
                <html>                    
                <head><title>Example</title>
                <link
                rel="stylesheet"href="styles.css">
                </head>                    
                <body>                    
                 <h1><a href="/" />Header                   
                 </h1>                    
                 <nav><a href="one/>One</a>
                 <a href="two/">Two                    
                 </a><a href="three/">Three</a>                    
                 </nav></body>`}

                shadow={"shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"}
                
            />
          
            </div>

            <div className='flex flex-col w-11/12 items-center relative '>

            <UnlockCards/>
                

            </div>

      </div>

      <div className='  bg-pure-greys-5  mt-16 lg:w-screen w-full '>

      <div className='homepage_bg lg:h-[300px]  w-full flex lg:items-center items-start justify-center lg:mt-12 mt-44  '>

      <div className='flex items-center lg:w-11/12 justify-center gap-5 mt-14'>


      <CTAButton text={"Explore Full Catalog "} active={true} linkTo={"/signup"} showIcon={true} shadow='shadow-none' />
      <CTAButton text={"Learn More"} active={false} linkTo={"/signup"} shadow='shadow-none'/>

      </div>
      </div> 

      <div className=' flex w-11/12 flex-col justify-between max-w-maxContent items-center mx-auto '>
 
         <div className=' flex lg:flex-row  flex-col gap-7 mt-[95px] mb-10'>
      <div className='text-4xl lg:w-[45%] w-full'>
        Get the skills you need for a <HighlightText text={"job that is in demand."}/>
      </div>
      <div className='flex flex-col items-start gap-10 lg:w-[40%] w-full '>
        <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
        <CTAButton text={"Learn More"} active={true} linkTo={"/signup"} shadow='false'/>
      </div>

      </div>

      <TimelineSection/>
      <LearnMoreSection/>

      </div>

      



     

     

      </div>

      <div className=' lg:w-11/12 w-full'>

      <InstructorSection/>

      </div>

      <div className='lg:w-11/12 mt-16 gap-5 flex flex-col justify-center  ' >
      <div className='text-richblack-5 text-center text-3xl' >Reviews From Other Learners</div>
         <ReviewSlider/>
      </div>

      <div className='w-screen bg-richblack-800'>
        <Footer/>
      </div>


         
                
    



    </div>
   
  )
}

export default Home
