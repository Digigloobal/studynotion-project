import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const CartTotal = () => {
     
     const{total,cart} = useSelector((state)=>state.cart);
     const {jwtToken} = useSelector((state) => state.auth);
     const {user} = useSelector((state) => state.profile);
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const handleBuyCourse = ()=>{

          const courses = cart.map((course) => course._id);
        console.log("Bought these course:", courses);

        buyCourse(jwtToken,courses,user, navigate , dispatch);
        //TODO: API integrate -> payment gateway tak leke jaegi

     }
  return (
    <div className='bg-richblack-800 w-[200px] p-5 flex flex-col gap-3 h-fit mt-5 rounded-lg'>
       <p className='text-richblack-400'>Total:</p>
        <p className='text-yellow-100 text-xl'>Rs {total}</p>

        <IconBtn 
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />
    </div>


  )
}

export default CartTotal
