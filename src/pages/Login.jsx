import React from 'react'
import loginImg from '../assets/Images/login.webp'
import frame from '../assets/Images/frame.png'
import FormTemplate from '../components/core/common/FormTemplate'
import HighlightText from '../components/core/Homepage/HighlightText'

const Login = () => {
  return (
    <div>
        <FormTemplate formType={"loginForm"} imgType={loginImg} heading={<div>Welcome Back </div>} subHeading={<div> Build skills for today, tomorrow, and beyond.<HighlightText text={"Education to future-proof your career."} /> </div>} />
    </div>
  )
}

export default Login
