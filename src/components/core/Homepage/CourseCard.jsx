import React from 'react'
import { BsFillPeopleFill } from "react-icons/bs";


const CourseCard = ({cardData,currentCard, setCurrentCard ,index}) => {

   // console.log("key => ",key);
   // console.log("cardData => ",cardData);
   // console.log("currentCard => ",currentCard);
   // console.log("setCurrentCard =>" ,setCurrentCard);
  return ( 
         
          <div  className= {`${index === 0 ? "bg-white shadow-[11px_13px_0px_10px_#f6e05e]" : "bg-richblack-800 "} flex flex-col justify-around gap-5 items-start p-5`} >
   
                    <div className={`${index === 0 ? "text-black":"text-white"} text-xl `}>{cardData.heading}</div>
   
                   <div className='text-richblack-400 text-[16px]'>{cardData.description}</div>
   
                   <div className='border-t border-richblack-200 border-dotted flex w-[100%] justify-between mt-16'>
   
                       <div className={`flex items-center gap-2 ${index === 0 ? "text-blue-500" : "text-richblack-300"} mt-3`}>
                           <BsFillPeopleFill/>{cardData.level}
                       </div>
   
                       <div className={`flex items-center gap-2 ${index === 0 ? "text-blue-500" : "text-richblack-300"} mt-3`}>
   
                           {cardData.lessionNumber} Lessons
   
                       </div>
   
                   </div> 
                   </div>


                  
                  
                )}
          
           
             
   
                   
           

export default CourseCard
