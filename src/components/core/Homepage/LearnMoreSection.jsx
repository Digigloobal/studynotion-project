import React from 'react'
import HighlightText from './HighlightText'
import Compare_with_Other from '../../../assets/Images/Compare_with_others.svg'
import Know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from './CTAButton'

const LearnMoreSection = () => {
  return (
    <div className='flex flex-col w-full items-center mt-32 justify-center mb-16'>
      <div className='text-4xl'>Your swiss knife for <HighlightText text={"learning any language"}/></div>
      <div className='w-[55%] mt-2 text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
      <div className=' flex lg:flex-row flex-col'>

       <img src={Know_your_progress} className='lg:translate-x-12 translate-x-0 mt-12 '></img>

      <img src={Compare_with_Other} className='lg:-translate-x-20 lg:translate-y-0 translate-x-0 -translate-y-20'></img>
     
      <img src={Plan_your_lessons} className='lg:-translate-x-56  lg:translate-y-0 translate-x-0 -translate-y-44 -mb-36 lg:-mb-0' ></img>



      </div>
      <CTAButton text={"Learn More"} linkTo={"/signup"} shadow={false} active={true} />
    </div>
  )
}

export default LearnMoreSection
