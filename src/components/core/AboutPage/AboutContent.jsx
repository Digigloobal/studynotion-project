import React from 'react'

 const data = [

        {
         text:"5K",
         description:"Active Students"

        },
         {
         text:"10+",
         description:"Mentors"

        },
         {
         text:"200+",
         description:"Courses"

        },
         {
         text:"50+",
         description:"Awards"

        }

    ];

const AboutContent = () => {
  

  return (
    <div className=' w-11/12  '>
    <div className='flex justify-evenly mt-7 h-[150px] items-center text-center '> 

    {data.map((element,index)=>(
        <div key={index}>
        <p className='text-2xl'>{element.text}</p>
        <p className='text-sm text-richblack-400'>{element.description}</p>
        </div>
    ))}

    </div>
       
    </div>
  )
}

export default AboutContent
