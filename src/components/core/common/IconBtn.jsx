import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button 
    disabled={disabled}
    onClick={onclick}
    type={type}
    className={` px-5 py-3 bg-yellow-100 rounded-md text-richblack-900 font-semibold flex gap-2 items-center ${customClasses}`}
    
    >
        {
            children ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn
