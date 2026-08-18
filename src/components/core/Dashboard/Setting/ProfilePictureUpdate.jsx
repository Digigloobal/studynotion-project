import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import IconBtn from '../../common/IconBtn';
import { updatePictureProfile } from '../../../../services/operations/settingAPI';
import { FiUpload } from 'react-icons/fi';

const ProfilePictureUpdate = () => {

    const { user } = useSelector((state)=>state.profile);
    const { jwtToken } = useSelector((state)=>state.auth);
  
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();

    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const [loading, setLoading] = useState(false) 

    const changeFileHandle = (e)=>{

        const file = e.target.files[0];

        if(file){
            setImageFile(file);
            setPreviewSource(file);
        }
    }

   
         const handleClick = () => {
      fileInputRef.current.click()
  }


  const handleFileUpload = () => {
    try {
         
        console.log("uploading...")
        setLoading(true);

        const formData = new FormData();
        formData.append("displayPicture",imageFile);

        dispatch(updatePictureProfile(jwtToken,formData)).then(()=>{
          setLoading(false);
        })
 
    } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
        
    }
  }

   const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

   useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])
    



  return (


    <div className='w-[70%]' >

      <div className='h-36 bg-richblack-900 flex w-[100%] px-7 items-center rounded-lg '>

    <div className='flex  gap-5 items-center justify-center'>
      <img src={previewSource || user?.image} width={80} alt={user?.firstName} className= ' aspect-square object-fit w-[90px] rounded-full' ></img>
      <div >
      <div className='flex flex-col gap-3 mt-3' ><div className='text-richblack-25 text-lg'>Change Profile Picture</div>
      
      <div className='text-richblack-400 ' >
         
          <div className='flex gap-5'>
          
            <input
                type='file'
                accept="image/png, image/gif, image/jpeg"
                className='hidden'
                ref={fileInputRef}

                onChange={changeFileHandle}
            
  
            />

             <button
              onClick={handleClick}
                disabled={loading} 
                className="cursor-pointer rounded-md bg-richblack-800 py-2 px-5 font-semibold text-richblack-100"
              >
                Select
              </button>


              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
              > {!loading && <FiUpload className="text-lg text-richblack-900" />} </IconBtn>
          </div>

      </div>
      </div>
      
      </div>
    </div>

    
    
        
        

    </div>




      
    </div>
  )
}

export default ProfilePictureUpdate
