import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import CountryCode from "../../../../data/countrycode.json"
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingAPI';

const EditProfile = () => {
 
    const {user} = useSelector((state)=>state.profile);
      const {jwtToken} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

  const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    const {
            register,
            handleSubmit,
            //reset,
            formState:{errors}
    
        } = useForm({defaultValues:{dropDown:"+91"}})


  async  function submitHandler(data){
    // console.log(data);
    try {

        dispatch(updateProfile(jwtToken,data));
        
    } catch (error) {
         console.log("ERROR MESSAGE - ", error.message)
        
    }
  }

  const dob = user?.additionalDetail?.dateOfBirth
     

  return (
    <div className='w-[70%]' >
    <form className='w-full' onSubmit={handleSubmit(submitHandler)}>
    <div className='h-96 bg-richblack-900 flex w-[100%] justify-between px-7 items-center rounded-md '>

   

    <div className='flex  gap-3 items-center w-[100%]'>

    <div className='w-full flex flex-col gap-5'>
        <div className='flex gap-3 justify-between w-[100%]'>
            <div className='flex flex-col w-full'>
                <label htmlFor='firstName' className='text-richblack-50' >First Name</label>
                <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder='Enter First Name'
                    defaultValue={user?.firstName}
                    className='form-style w-[100%]'
                    {...register("firstName",{required:true})}
                />
                {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>

            <div className='flex flex-col w-full'>
                <label htmlFor='lastName' className='text-richblack-50' >Last Name</label>
                <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    placeholder='Enter Last Name'
                    defaultValue={user?.lastName}
                    className='form-style'
                  
                />
               
            </div>
        </div>

        <div className='flex gap-3 justify-between w-[100%]'>
            <div className='flex flex-col w-full'>
                <label htmlFor='dateOfBirth' className='text-richblack-50' >Date Of Birth</label>
                <input
                    type='date'
                    id='dateOfBirth'
                    name='dateOfBirth'
                    placeholder='Enter Date of Birth '
                    defaultValue={dob ? new Date(user?.additionalDetail?.dateOfBirth).toISOString().split("T")[0]:""}
                    className='form-style w-[100%]'
                   {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                />
                {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div className='flex flex-col w-full'>
                <label htmlFor='gender' className='text-richblack-50' >Gender</label>
                <select
                    type='text'
                    id='gender'
                    name='gender'                  
                    defaultValue={user?.additionalDetail?.gender}
                    className='form-style h-12'
                    {...register("gender" ,{required:true})}

                  
                >
                    {genders.map((elem,index)=>(
                        <option key={index} value={elem}>{elem}</option>
                    ))}
                </select>
                 {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please Select your gender.
                </span>
              )}
               
            </div>
        </div>

        <div className='flex gap-3 justify-between w-[100%]'>
           <div className='flex flex-col gap-1 w-full'>
            <label htmlFor='contactNumber' className='text-sm text-richblack-25'>Phone Number</label>
            <div className='flex gap-3'>
                <select
                name='dropDown'
                id='dropDown'
                className='form-style w-16'
                 
                {...register("dropDown",{required:true})}
                >
                {CountryCode.map((data,index)=>(
                    <option key={index} value={data.code} >
                              {data.code} -{data.country}
                    </option>
                ))}

                </select>

                <input
                    type='number'
                    name='contactNumber'
                    id='contactNumber'
                    placeholder='1234567890'
                    defaultValue={user?.additionalDetail?.contactNumber}
                    className='form-style w-[100%]'
                    {...register("contactNumber",{
                        required:{value:true,message:"Plz Enter Phone no."},
                        maxLength:{value:10,message:"Invalid Phone No."},
                        minLength:{value:8,message:"Invalid Phone No."}

                        })}
                />

                {errors.contactNumber && (
                    <span>  {errors.contactNumber.message}</span>
                )}
            </div>
        </div>

            <div className='flex flex-col w-full'>
                <label htmlFor='about' className='text-richblack-50' >About</label>
                <input
                type='text'
                id='about'
                name='about'
                placeholder='Enter Your Bio'
                defaultValue={user?.additionalDetail?.about}
                className='form-style'
               {...register("about",{required:true})}

                
                ></input>
                 {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
               
            </div>
        </div>

         

    </div>


     
      
       
    
      </div>
     
    </div>

    <div className='flex gap-3 mt-6 flex-row-reverse' >
        <button 
         onClick={()=>{navigate("/dashboard/my-profile")}}
         className='text-richblack-100 bg-richblack-700 rounded-md p-3 px-10  cursor-pointer '
        
        >Cancel</button>
        <IconBtn text={"Save"} type="submit" customClasses={'px-12 '} />
    </div>

    
    
        
     </form>    

    </div>
    
  )
}

export default EditProfile
