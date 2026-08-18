import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from "../../../data/countrycode.json"

const ContactUsForm = () => {
  
    const [loading , setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}

    } = useForm({defaultValues:{dropDown:"+91"}})

    const submitContactForm = async (data) => {
        console.log("Logging Data",data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
        
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstName:"",
                lastName:"",
                email:"",
                message:"",

            })
        }
    },[reset,isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='text-white w-11/12 flex flex-col gap-4'>

        <div className='flex gap-4'>
            <div className='flex flex-col gap-1 w-[50%]'>
             <label htmlFor='firstName' className='text-sm text-richblack-25'>First Name</label>
             <input
             type='text'
             id='firstName'
             name='firstName'
             placeholder='Enter First Name'
             className='bg-richblack-800 p-3 rounded-md border-b border-richblack-800 '
             {...register("firstName",{required:true})}

             />
             {
                        errors.firstname && (
                            <span>
                                Please enter Your name
                            </span>
                        )
                    }
            </div>

            <div className='flex flex-col gap-1 w-[50%]'>

            <label htmlFor='lastName' className='text-sm text-richblack-25'>Last Name</label>
             <input
             type='text'
             id='lastName'
             name='lastName'
             placeholder='Enter Last Name'
             className='bg-richblack-800 p-3 rounded-md border-b-2 border-richblack-800'
             {...register("lastName")}

             />
            

            </div>
        </div>

        <div className='w-[100%] flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm text-richblack-25'>Email Address</label>
            <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter Email Address'
                className='bg-richblack-800 p-3 rounded-md'
                {...register("email",{required:true})}
            />
            { errors.email && (
                <span>Plz Enter Email Address</span>
            )}
        </div>

        <div className='flex flex-col gap-1'>
            <label htmlFor='phoneNo' className='text-sm text-richblack-25'>Phone Number</label>
            <div className='flex gap-3'>
                <select
                name='dropDown'
                id='dropDown'
                className='w-[15%] bg-richblack-800 p-3 rounded-md space-x-4 text-richblack-400'
                {...register("dropDown",{required:true})}
                >
                {CountryCode.map((data,index)=>(
                    <option key={index} value={data.code} >
                              {data.code}    -{data.country}
                    </option>
                ))}

                </select>

                <input
                    type='number'
                    name='phoneNo'
                    id='phoneNo'
                    placeholder='1234567890'
                    className='bg-richblack-800 rounded-md p-3 w-[88%]'
                    {...register("phoneNo",{
                        required:{value:true,message:"Plz Enter Phone no."},
                        maxLength:{value:10,message:"Invalid Phone No."},
                        minLength:{value:8,message:"Invalid Phone No."}

                        })}
                />

                {errors.phoneNo && (
                    <span>  {errors.phoneNo.message}</span>
                )}
            </div>
        </div>

        <div className='flex flex-col gap-1 w-[100%]'>
            <label htmlFor='message'>Message</label>
            <textarea
                name='message'
                id='message'
                placeholder='Enter Your Message'
                cols="30"
                rows="5"
                className='bg-richblack-800 rounded-md p-3'
                {...register("message",{required:true})}
            />
            {errors.message && (
                <span>Plz Enter Your Message</span>
            )}
        </div>

        <button type='submit' className='w-[100%] bg-yellow-50 text-center text-richblack-900 p-2 rounded hover:scale-95' >Send Message</button>
    </form>
  )
}

export default ContactUsForm
