import React from 'react'
import FormTemplate from '../components/core/common/FormTemplate'
import signupImg from '../assets/Images/signup.webp'
import HighlightText from '../components/core/Homepage/HighlightText'

const Signup = () => {
  return (
    <div>

    <FormTemplate formType={"signupForm"} imgType={signupImg} heading={<div>Join the millions learning to code with StudyNotion for free</div>} subHeading={<div> Build skills for today, tomorrow, and beyond.<HighlightText text={"Education to future-proof your career."} /> </div>} />
      
    </div>
  )
}

export default Signup
