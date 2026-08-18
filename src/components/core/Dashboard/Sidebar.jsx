import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import { useDispatch, useSelector } from 'react-redux'
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import ConfirmationModel from '../common/ConfirmationModel';


const Sidebar = ({setConfirmationModal}) => {
 
      const {user, loading:profileLoading} = useSelector((state)=> state.profile);
     const {loading:authLoading} = useSelector((state)=>state.auth);

  
     const dispatch = useDispatch();
     const navigate = useNavigate();


     if(authLoading || profileLoading){
        return (
            <div>
                Loading....
            </div>
        )
     }

     

  return (

    <div className={`relative  `} >

      
    <div className={`flex flex-col gap-3  `}>


    <div className='mt-8 flex flex-col gap-1 '>
        {
            sidebarLinks.map((link)=>{

                   if(link.type && user?.accountType !== link.type) return null;
           return  <div key={link.id} className=''>
                     <SidebarLink link={link} iconName={link.icon}/>
                </div>
               
        })
        }
    </div>

    <div className='w-11/12 h-[1px] bg-richblack-600 mx-auto '>

    </div>

    <div>

    <SidebarLink link={{name:"Settings" , path:"dashboard/settings"}} iconName={"VscSettingsGear"} />


    </div>

    <button 
         onClick={()=> setConfirmationModal({
            text1:"Are You Sure ?",
            text2:"You will be logged out of your Account",
            btn1Text:"Logout",
            btn2Text:"Cancel",
            btn1Handler:()=> dispatch(logout(navigate)),
            btn2Handler:()=> setConfirmationModal(null)
         })} 
    className='text-richblack-500 w-[100%]  flex  justify-center'>
       <div className='flex item-center gap-2 mr-28'>
        <VscSignOut className='text-xl'/>
        <span>Logout</span>
       </div>
    </button>
    
    </div>


   

    </div>
  )
}

export default Sidebar
