import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';
const CodeBlock = ({heading, subHeading,ctabutton1Text ,ctabutton2Text, codeblock , index = false ,backgroundGradient,shadow}) => {
  return (
    <div className={`flex flex-col ${ index  ? "lg:flex-row" : "lg:flex-row-reverse"} lg:justify-between  gap-20 items-center my-12 lg:my-32 w-[100%] `} >
    
    <div className='lg:w-[50%] w-full '>
       
       <div className='lg:text-4xl text-2xl '>{heading}</div>
       <div className=' lg:text-lg text- mt-2 text-richblack-100'>{subHeading }</div>
       <div className='mt-20 flex gap-4'>
         <CTAButton text={`${ctabutton1Text } `} active={true} showIcon={true} linkTo={"/login"}/>
         
         <CTAButton text={ctabutton2Text} active={false} linkTo={"/signup"}/>
       </div>
      
       
    </div>

     <div className={` h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[60%]  shadow-[inset_-166px_-131px_336px_94px_#000814,inset_184px_-27px_208px_49px_#f6ad55] ${shadow}`}> 

    <div className='text-center flex flex-col w-[10%] text-richblack-200  font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
            <p>13</p>
            
        </div>

        <div className={`w-[90%] flex flex-col font-bold font-mono text-yellow-400 ${backgroundGradient} `}>
            <TypeAnimation
            sequence={[codeblock,2000,""]}
            repeat={Infinity}
            cursor={true}
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }

           omitDeletionAnimation={true}
            />
        </div>

    </div>
    


      
    </div>
  )
}

export default CodeBlock
