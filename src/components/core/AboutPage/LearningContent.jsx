import React from 'react'
import HighlightText from '../Homepage/HighlightText';
import CTAButton from '../Homepage/CTAButton';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const LearningContent = () => {
  return (
    <div className='flex  justify-center items-center '>

    <div className='grid lg:grid-cols-4 grid-rows-3 w-11/12 gap-5  mt-28'>

    { LearningGridArray.map((data,index)=>(
        <div className={`${data.order === -1 ? " col-span-2    bg-transparent" : " col-span-1 "}
        ${data.order === 3 && " lg:col-start-2 col-start-1"} ${data.order % 2 === 1 ? " bg-richblack-700" : " bg-richblack-800"} text-white`}
        >
        {
            data.order === -1 ? <div className='flex gap-4 flex-col lg:w-[80%] w-[100%]'>
                <p className='text-4xl lg:w-[80%] w-full'>{data.heading} <HighlightText text={data.highlightText}/></p>
                <p className='text-richblack-400 w-[90%]'>{data.description}</p>
                <div className='w-fit'><CTAButton active={true} linkTo={data.BtnLink} text={data.BtnText} /></div>
                
            </div>

            : <div className='flex flex-col p-7 gap-8 lg:h-[300px] h-[400px] w-[100%]'>
                <p className='text-xl lg:w-[70%] w-full'>{data.heading}</p>
                <p className='text-richblack-300 w-[100%]'>{data.description}</p>
            </div>
        }

        </div>
    ))}

    </div>
      
    </div>
  )
}

export default LearningContent
