import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({name,label,register,errors,setValue,getValue}) => {
    const { editCourse, course } = useSelector((state) => state.course)
       
     const [requirement,setRequirement] = useState("");
  
      const [requirementList, setRequirementList] = useState([]);


      useEffect(()=>{

        if (editCourse) {
      setRequirementList(course?.instructions)
    }

        register(name,{
          required:true,
          validate: (value) => value.length > 0
        
        })

      },[])

      useEffect(()=>{
         setValue(name,requirementList);
      },[requirementList])

 
       const handleAddRequirement = ()=>{

        if(requirement){
           setRequirementList([...requirementList, requirement]);
            setRequirement("")
        }
       }

       const handleRemoveRequirement = (index) => {
        
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);

       }

  return (
    <div className='mt-4 flex flex-col gap-1'>

    <label htmlFor={name} className='text-richblack-50 flex items-center ' > {label}<sup className='text-pink-300 text-lg pt-3' >*</sup> </label>
    <div className='flex flex-col justify-start gap-2 items-start'>
    <input
    type='text'
      id={name}
     value={requirement}
     onChange={(e)=> setRequirement(e.target.value) }
     className='w-full form-style'
    />

    <button
    type='button'
    onClick={handleAddRequirement}
    className='font-semibold text-yellow-50'
    >Add</button>
    </div>

    {
      requirementList.length > 0 && (
        <ul>
          {requirementList.map((requirement,index)=>(
            <li key={index} className='flex items-center gap-2 text-richblack-5' >
              <span>{requirement}</span>
              <button
              type='button'
              onClick={()=> handleRemoveRequirement(index)} 
               className='text-xs text-pure-greys-300'
              >Remove</button>
            </li>
          ))}
        </ul>
      )
    }
    {errors[name] && (
      <span>{label} is required</span>
    )}
      
    </div>
  )
}

export default RequirementField
