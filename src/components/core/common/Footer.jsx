import React from 'react'
import StudyNotionLightLogo from '../../../assets/Logo/Logo-Full-Light.png'
import { PiFacebookLogoDuotone , PiGoogleLogoDuotone ,PiTwitterLogoDuotone,PiYoutubeLogoDuotone,PiHeartLight} from "react-icons/pi";
import { FooterLink2 } from '../../../data/footer-links';
import { Link } from 'react-router-dom';
import { FaRegCopyright } from "react-icons/fa";


const Footer = () => {
  return (
    <div className='flex flex-col w-11/12 mx-auto mt-14 '>
    <div className='flex lg:flex-row flex-col gap-5 justify-evenly'> 
    
       <div className='flex gap-5 mt-16 lg:border-r border-richblack-400 justify-evenly items-start w-[50%]'>
       
       <div className='flex flex-col gap-2'>
        <img src={StudyNotionLightLogo}></img>
        <div className='text-richblack-100 text-[16px]'>Company</div>
        <Link to={"/about"} className='text-richblack-400 text-sm hover:text-richblack-600'>About</Link>
        <Link className='text-richblack-400 text-sm hover:text-richblack-600'>Careers</Link>
        <Link className='text-richblack-400 text-sm hover:text-richblack-600'>Affilates</Link>
        <div className='flex gap-3 mt-3'>

        <Link to={"#"}>   <PiFacebookLogoDuotone className='text-richblack-100 text-2xl hover:text-richblack-600' /></Link>
        <Link to={"#"}> <PiGoogleLogoDuotone  className='text-richblack-100 text-2xl hover:text-richblack-600'/></Link>
        <Link to={"#"}> <PiTwitterLogoDuotone  className='text-richblack-100 text-2xl hover:text-richblack-600'/></Link>
        <Link to={"#"}>  <PiYoutubeLogoDuotone  className='text-richblack-100 text-2xl hover:text-richblack-600'/></Link>
      
        
        
        

        </div>
       </div>

       <div className='flex flex-col gap-2'>
        <div className='text-richblack-100'>Resources</div>
        <Link className='text-richblack-400 hover:text-richblack-600'>Ariticles</Link>
        <Link className='text-richblack-400 hover:text-richblack-600 '>Blog</Link>
        <Link className='text-richblack-400 hover:text-richblack-600'>Chart sheet</Link>
        <Link className='text-richblack-400 hover:text-richblack-600'>Code Challenges</Link>
        <Link className='text-richblack-400 hover:text-richblack-600'>Docs</Link>
        <Link className='text-richblack-400 hover:text-richblack-600'>Projects</Link>
        <Link className='text-richblack-400 hover:text-richblack-600'>Videos</Link>
        <Link className='text-richblack-400 hover:text-richblack-600'>Workspace</Link>

        <div className='text-richblack-100 mt-10'>Support</div>
        <Link className='text-richblack-400 hover:text-richblack-600'>Help Center</Link>
       </div>

       <div className='flex flex-col gap-2 mr-16'>

       <div className='text-richblack-100'>Plans</div>
       <Link className='text-richblack-400 hover:text-richblack-600'>Paid memberships</Link>
       <Link className='text-richblack-400 hover:text-richblack-600'>For students</Link>
       <Link className='text-richblack-400 hover:text-richblack-600'>Business solutions</Link>

       <div className='text-richblack-100 mt-7'>Community</div>
       <Link className='text-richblack-400 hover:text-richblack-600'>Forums</Link>
       <Link className='text-richblack-400 hover:text-richblack-600'>Chapters</Link>
       <Link className='text-richblack-400 hover:text-richblack-600'>Events</Link>

       </div>
    
    

    </div>
    <div className='flex lg:mt-16 flex-wrap  justify-around lg:w-[50%] w-full'>

    {FooterLink2.map((element,index) => (
        <div className='flex gap-5 flex-col' key={index}>
        <div  className={ `text-richblack-100 ${index === 2 ? " mt-5 lg:mt-0" : ""}`}>{element.title}</div>

        <div className='flex flex-col gap-2'>
            {
                element.links.map((content , index) =>(

                    <div key={index} >
                       <Link to={content.link} className='text-richblack-400 hover:text-richblack-600'>{content.title}</Link>
                    </div>
                      
                     
                )

                    
                )
            }
        </div>
        </div>
       
    ))}

  

    </div>
    </div>

    <div className='border-t border-richblack-200 mt-10 flex lg:flex-row flex-col justify-between items-center h-16'>

    <div className='flex  lg:flex-row gap-5 text-richblack-100 '>
        <Link to={"/privacy_policy"} className='hover:text-richblack-400'>Privacy Policy</Link>
        <Link to={"cookie_policy"} className='hover:text-richblack-400'>Cookie Policy</Link>
        <Link to={"/terms"} className='hover:text-richblack-400'>Terms</Link>
    </div>
    <div className='flex items-center gap-1 text-richblack-100 '>
        Made with<PiHeartLight className='text-pink-300'/>Manjeet<FaRegCopyright/> Studynotion
    </div>

    </div>

 
      
    </div>
  )
}

export default Footer

