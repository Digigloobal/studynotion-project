import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png'


const timeSection = [

    {
        logo:Logo1,
        heading:"Leadership",
        description:"Fully committed to the success company"
    },
    {
        logo:Logo2,
        heading:"Responsibilty",
        description:"Students will always be our top priority"
    },
    {
        logo:Logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        logo:Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    }
]
   



const TimelineSection = () => {
  return (
    <div className='flex lg:flex-row flex-col gap-10 w-full justify-between' >
       
       <div className='mt-10' >
        
        {
            timeSection.map((element ,index)=>(

                <div key={index} className='flex flex-col '>
                 <div  className='flex gap-6  '>
                <div className='w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center my-3 '>
                    <img src={element.logo}></img>
                </div>
                <div className='flex flex-col  my-3'>
                    <div >{element.heading}</div>
                    <div className='text-sm text-richblack-700'>{element.description}</div>
                </div>
                </div>
                 <div className={`${index === 3 ? "border-none " : "border-l  border-dotted border-richblack-600" }   w-[20px] h-10 ml-6 -mt-2`}> </div>
                </div>
               

            ))
        }
       
          

       </div>

       <div className='relative'>
          <img src={TimelineImage} alt='timeline image'></img>
          <div className='lg:w-[511px] w-[250px] bg-caribbeangreen-600 flex gap-4 items-center justify-center lg:h-32 h-24 pl-20 absolute left-[50%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex border-r-2 border-caribbeangreen-400 lg:gap-3 gap-2 items-center justify-center '>
                <p className='text-white lg:text-4xl text-xl font-bold '>10</p>
                <p className='uppercase text-caribbeangreen-300 lg:pr-10 pr-2 lg:pl-3 pl-0 lg:w-44 w-16 text-[8px] lg:text-sm'>Years Experience</p>
            </div>
            <div className='flex  lg:gap-3 gap-2 items-center justify-center  ml-4'>
                <p  className='text-white lg:text-4xl  text-xl font-bold '>250</p>
                <p className='uppercase text-caribbeangreen-300 lg:pr-10 pr-16 pl-3 lg:w-44 w-22 text-[8px] lg:text-sm'>Types Of Courses</p>
            </div>
          </div>
       </div>
    </div>
  )
}

export default TimelineSection
