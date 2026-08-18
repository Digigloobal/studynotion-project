import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../../services/operations/settingAPI';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
      
    const {jwtToken} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function deleteHandler(){

        dispatch(deleteAccount(jwtToken,navigate));

    }


     
  return (
    <div className='h-44 flex-col bg-pink-900  flex w-[70%] gap-5 px-4  rounded-md  mb-16' >

    <div className='flex justify-center items-start h-full gap-8 mt-5'>

        <div className='text-3xl aspect-square bg-pink-800 rounded-full p-4' onClick={deleteHandler}  >

        <RiDeleteBin5Line className='text-pink-400'  />

        </div>

        <div className='flex flex-col gap-1'>
            <p className='text-white text-xl'>Delete Account</p>

            <p className='text-pink-25' >Would you like to delete account?</p>
            <p className='text-pink-25 w-[80%]'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            <div className='text-pink-400 italic cursor-pointer' onClick={deleteHandler} >I want to delete my account.</div>
        </div>
    </div>


      
    </div>

  )
}

export default DeleteAccount
