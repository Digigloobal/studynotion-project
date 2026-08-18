import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { RxCross1 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import IconBtn from '../common/IconBtn';

const ReviewModal = ({setReviewModal}) => {
  
    const {user} = useSelector((state) => state.profile);
    const {jwtToken} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state)=>state.viewCourse);

    const {
        register,
        setValue,
        handleSubmit,
        formState:{errors},
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating",0);
    },[]);

    const ratingChanged = (newRating)=>{
        setValue("courseRating",newRating);

    }

    const onSubmit = async(data) =>{
        await createRating({
            courseId : courseEntireData._id,
            rating:data.courseRating,
            review:data.courseExperience

        },jwtToken);

        setReviewModal(false);

    }

  return (
    <div className=' text-white fixed inset-0 z-50 flex items-center  justify-center bg-black/40 backdrop-blur-sm '>

    <div className='w-[600px] bg-richblack-800  rounded-xl ' >
      
       <div className='flex justify-between p-3 bg-richblack-600 items-center ' >
        <p>Add Review</p>
        <div
          onClick={()=>setReviewModal(false)}
        ><RxCross1/></div>
       </div>

       <div className='flex  items-center gap-2  justify-center mt-5' >

       
        <img
            src={user?.image}
            className='w-10 rounded-md '
        />
        <div >
            <p className='text-sm'>{user?.firstName} {user?.lastName}</p>
            <p className='text-[12px] text-richblack-100'>Post Publicly</p>
        </div>

      
       </div>

         

        <form 
          className='my-5'
          onSubmit={handleSubmit(onSubmit)}
         >

        <div className='flex justify-center items-center my-4' >
            <ReactStars
                          count={5}
                          onChange={ratingChanged}
                          size={24}
                          activeColor="#ffd700"
            />
        </div>

        <div className='px-10 flex flex-col gap-1' >
            <label htmlFor='courseExperience' className='text-sm'  > Add Your Experience <sup className='text-pink-200' >*</sup>  </label>
            <textarea
                id='courseExperience'
                placeholder='Add Your Experience Here'
                {...register("courseExperience",{required:true})}
                className='form-style min-h-[130px] '

            />
             {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                        }
        </div>

        <div className='mt-5 flex gap-3 justify-end mx-4' >
            <button
              onClick={()=> setReviewModal(false)}
              className='bg-richblack-500 px-5 p-2 rounded-md text-richblack-900'
             >
                Cancel
            </button>

            <IconBtn
                text={"Save"}
            />
        </div>

        </form>

    </div>


      
    </div>
  )
}

export default ReviewModal
