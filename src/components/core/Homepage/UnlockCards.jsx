import React, { useState } from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from '../../../data/homepage-explore'
import CourseCard from './CourseCard'

const tabNames = [
    'Free',
    'New to coding',
    'Most popular',
    'Skills paths',
    'Career paths'
]

const UnlockCards = () => {
    const [currentTab , setCurrentTab] = useState(tabNames[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    function setCard(value){
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=> course.tag === value);
        console.log(result);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
        
    }
  return (
    <div>
      <div className='flex flex-col lg:items-center  lg:mb-44 mb-[800px]'>
                    <p className='lg:text-4xl text-3xl font-semibold'>
                        Unlock the <HighlightText text={"Power of Code"}/>
                    </p>
                    <p className='mt-2 text-richblack-200' >Learn to Anything You Can Imagine</p>
               

            <div className=' flex-row lg:flex hidden gap-3 items-center mx-auto mt-5 rounded-full bg-richblack-800 px-1 py-1 border-richblack-300'>
                {
                    tabNames.map((element ,index ) => {
                        return (
                             <div key={index} className={`text-[16px] flex items-center gap-2
                             ${currentTab === element 
                             ? "bg-richblack-900 text-richblack-5 font-medium"
                             : "text-richblack-200" } rounded-full transition-all duration-200 cursor-pointer
                               hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                               onClick={ () => setCard(element)} >
                                {element}
                             </div>
                        )
                    })
                }
            </div>   


              <div className='absolute flex lg:flex-row flex-col gap-10 justify-between w-full mt-44  z-10'>
        {
            courses.map(  (element, index) => {
                return (
                    <div key={index}>
                    <CourseCard 
                    key={index}
                    index={index}
                    cardData = {element}
                    currentCard = {currentCard}
                    setCurrentCard = {setCurrentCard}
                    />
                    </div>
                )
            } )
        }
      </div> 

             </div> 



                {/* <Cards/> */}
            </div>
  )
}

export default UnlockCards
