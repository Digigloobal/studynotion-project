import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModel = ({modalData}) => {
  return (

    <div className=' text-white fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm '>
    <div className='w-80 bg-richblack-800 rounded-md'>
        <div className='flex flex-col items-start p-5 gap-3'>
            <p className='text-2xl text-richblack-25'>
                {modalData.text1}
            </p>
            <p className='text-richblack-400'>
                {modalData.text2}
            </p>
            <div className='flex gap-4'>
            
                <IconBtn 
                    onclick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                    />
                <button onClick={modalData?.btn2Handler} className='bg-richblack-600 py-3 px-4 text-richblack-900 font-semibold rounded-md'>
                    {modalData?.btn2Text}
                </button>    
            </div>
        </div>
      
    </div>
      
    </div>
  )
}

export default ConfirmationModel
