import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {GiNinjaStar} from "react-icons/gi"
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeToCart } from '../../../../slices/cartSlice';
import RatingStars from '../../common/RatingStars';

const CartCard = () => {
  
    const {cart,totalItems}  = useSelector((state) => state.cart);
    const dispatch = useDispatch();

   //  console.log("totalItems=>",totalItems);
   
     

  return (
    <div className='w-[70%]'>

    {cart.map((course,index)=>(
         
         <div key={index} className='flex flex-col w-[100%] mt-5  gap-3 ' >

         <div className='flex  justify-around  w-[100%]  ' >

         <div className='flex gap-5 items-center'>
            <img src={course?.thumbnail} className='w-[200px]' />
             <div>
            <p className='text-xl' >{course?.name}</p>
            <p>{course?.category?.name}</p>
            <div className='flex gap-2 items-center' >
               {/* isko average Rating function s change krna h */}
                <span className='text-yellow-100' >4.5</span>
                <RatingStars />

                <span className='text-sm text-richblack-400'>({course?.ratingAndReviews?.length} Ratings)</span>
            </div>
         </div>
         </div>

        
         <div className='flex flex-col gap-4' >
            <button onClick={()=>dispatch(removeToCart(course._id))}
            className='flex items-center gap-3 bg-richblack-800 p-2 text-pink-400 rounded-lg'
            >
                 <RiDeleteBin6Line/>
                 <span>Remove</span>

            </button>
            <div className='text-xl text-yellow-100'>Rs {course?.price}</div>
         </div>
  </div>

 <div>
   {(index+1) === totalItems  ?  (<div></div>) : (<div className='h-[2px] bg-richblack-800' ></div>)}
 </div>
         

         </div>

         

      

    ))} 



  
      
    </div>
  )
}

export default CartCard
