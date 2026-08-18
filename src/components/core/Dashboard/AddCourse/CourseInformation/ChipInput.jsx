import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const ChipInput = ({label,name,placeholder,register,errors,setValue,getValues}) => {
   const { editCourse, course } = useSelector((state) => state.course)
      
    const [tag,setTag] = useState("");
    const [tagList,setTagList] = useState([]);
    

     useEffect(()=>{

      if(editCourse){
        setTagList(course?.tag);
      }


    
            register(name,{
              required:true,
              validate: (value) => value.length > 0
            
            })
    
          },[])

     useEffect(()=>{
        setValue(name,tagList)
     },[tagList]);     

    const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const input = tag.trim();

      if (input && !tagList.includes(input)) {
        setTagList((prev) => [...prev, input]);
      }

      setTag("");
    }
  };

   const handleRemoveTag = (index) => {
        
        const updatedTagList = [...tagList];
        updatedTagList.splice(index,1);
        setTagList(updatedTagList);
       }

  return (
    <div className='mt-4 flex flex-col gap-1'>

    <label htmlFor={name} className='text-richblack-50 flex items-center '>{label} <sup className='text-pink-300 text-lg pt-3'>*</sup></label>
      
      <div>

      <ul className='flex gap-2 w-[92%] flex-wrap '>
        {tagList.map((input,index)=>(

            <li key={index} className=' bg-yellow-500 p-2 rounded-full mb-3 flex justify-between w-fit ' ><span className='flex gap-2 items-center text-richblack-25 ' > {input} <RxCross2 onClick={()=>handleRemoveTag(index)} className='cursor-pointer' /> </span></li>

        ))}


      </ul>

    <input
        id={name}
        placeholder={placeholder}
        className='w-full form-style'
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={handleKeyDown}
        
    />

    </div>

    
      
    </div>
  )
}

export default ChipInput
