import React from 'react'
import HighlightText from '../Homepage/HighlightText'

const Quote = () => {
  return (
    <div className='text-3xl text-richblack-100 text-center font-bold w-[75%] '>

    <span className='text-richblack-700 text-5xl'>"</span> We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"} />, <span className='text-brown-100'>expertise</span>, and community to create an <span className='text-brown-100'>unparalleled educational experience.</span> <span className='text-richblack-700 text-5xl'>"</span>
      
    </div>
  )
}

export default Quote
