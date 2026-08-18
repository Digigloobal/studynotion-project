import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const CTAButton = ({text , active , showIcon = false , linkTo ,shadow='shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]'}) => {
  return (
    <Link to={linkTo}>
<div className={`flex gap-2 items-center p-3 px-6 rounded-lg ${active ? " bg-yellow-50  text-richblack-800 ":" bg-richblack-800 text-richblack-25"} hover:scale-110 transition-all duration-200 ${shadow} `} >
      <button >
        {text} 
      </button>
      {showIcon && <FaArrowRightLong/>}

    </div>
    </Link>
    
  )
}

export default CTAButton
