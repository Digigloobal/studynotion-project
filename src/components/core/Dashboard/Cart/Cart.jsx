import React from 'react'
import { useSelector } from 'react-redux'
import CartCard from './CartCard';
import CartTotal from './CartTotal';

const Cart = () => {
      
    const {total,totalItems} = useSelector((state)=>state.cart);

  return (



    <div className='text-white flex  w-11/12' >

    <div className='flex flex-col gap-5 ml-4 w-[100%]' >
        <p className='text-2xl mt-5'>Cart Items</p>

        <div   >
             <div className='text-richblack-500 '>{totalItems} Courses In Cart
             <hr className='w-full text-richblack-600'  /></div>

             {total > 0 ? (<div className='flex justify-between w-[100%]'> 

             <CartCard />
            <CartTotal/>
            </div>)
            :(<p  className='flex w-full h-[500px] justify-center items-center text-pink-400 text-xl' >Your Cart is Empty</p>)}
           
        </div>
    </div>
      
    </div>
  )
}

export default Cart
