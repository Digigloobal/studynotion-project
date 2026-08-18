import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import ConfirmationModel from '../components/core/common/ConfirmationModel';
import { useState } from 'react'

const Dashboard = () => {
     const { loading:profileLoading} = useSelector((state)=> state.profile);
     const {loading:authLoading} = useSelector((state)=>state.auth);
     const [confirmationModal, setConfirmationModal] = useState(null);


     if(authLoading || profileLoading){
        return (
            <div>
                Loading....
            </div>
        )
     }


  return (
    <>
    <div className={`flex justify-between w-full ${confirmationModal && "blur-sm"} `}>

    <div className='w-2/12 border-r border-richblack-400' >

    <Sidebar setConfirmationModal={setConfirmationModal} />
    
    </div>

    <div className='h-[calc(100vh-3.5rem)] w-11/12 overflow-auto'>
        <Outlet/>
    </div>


      
    </div>

    <div>

     {confirmationModal && (
 <ConfirmationModel modalData={confirmationModal} />
)}
        
    </div>
   

</>
  )
}

export default Dashboard
