import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit,MdDeleteOutline } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlinePlus } from 'react-icons/ai';
import ConfirmationModel from '../../../common/ConfirmationModel';
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course);
    const {jwtToken}= useSelector((state) => state.auth);

    console.log("course => ",course);

     const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const dispatch = useDispatch();

     const [confirmationModal, setConfirmationModal] = useState(null);

     const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id},
            jwtToken
        );
        console.log("PRINTING AFTER DELETE SECTIOn", result);
        if(result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null);

    }

    //const courseId = course._id;
   // console.log("courseId",courseId);

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({
            courseId:course._id, subSectionId, sectionId,},jwtToken);
        if(result) {
            //TODO: extra kya kar skte h yaha pr 
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

  return (
    <div className='text-white'>

    <div className='mt-4 bg-richblack-700 rounded-md mb-5' >
        {course?.courseContent?.map((section)=>(
            <details key={section._id} open >
                <summary className='flex justify-between px-7 text-xl mt-5'>

                <div className='flex gap-2 items-center '>
                <RxDropdownMenu className='text-richblack-300'/>
                <p className='text-richblack-50'>{section.sectionName}</p>

                </div>

                <div className='flex gap-1 text-2xl text-richblack-300'>

                <button 
                onClick={ () => handleChangeEditSectionName( section._id , section.sectionName)}>

                <MdEdit/>
                </button>


                <button
                 onClick={() =>{
                    setConfirmationModal({
                                text1: "Delete this Section",
                                text2: "All the lectures in this section wil be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () => handleDeleteSection(section._id),
                                btn2Handler: () => setConfirmationModal(null),
                    })
                 }}
                >

                 <MdDeleteOutline/>

                </button>

                <span className='text-richblack-600'>|</span>

               <IoMdArrowDropdown/>

              </div>

                </summary>
               
               <div>
                {section?.subSection?.map((data)=>(

                    <div
                     key={data?._id}
                      onClick={()=>setViewSubSection(data)}
                      className='flex justify-between mx-10 mt-2 text-[16px] text-richblack-50'
                    >
                    <div className='flex items-center gap-2 ml-5 '>
                        <RxDropdownMenu/>
                        <div>{data.title}</div>
                    </div>

                    <div className='flex items-center gap-2 text-xl text-richblack-200'
                     onClick={(e)=> e.stopPropagation()}
                     >
   
                     <button
                      onClick={() => setEditSubSection({...data , sectionId:section._id})}
                     >
                        <MdEdit/>
                     </button>

                     <button
                       onClick={() => setConfirmationModal({
                                        text1: "Delete this Sub Section",
                                        text2: "selected Lecture will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                        btn2Handler: () => setConfirmationModal(null), })}
                     >
                        <MdDeleteOutline/>
                     </button>

                    </div>




                    </div>

                ))}

               <div >
                <button className='flex items-center gap-1 text-yellow-100 text-sm ml-8 mt-1 mb-1' 
                 onClick={()=> setAddSubSection(section._id)}
                >
                    <AiOutlinePlus/>
                    <p>Add Lecture</p>
                </button>
               </div>

               </div>

            </details>
        ))}


        
    </div>
    

    {
        addSubSection ?
        (<SubSectionModal
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
         />)
         : viewSubSection ? 
         (<SubSectionModal 
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}

         />)
         : editSubSection ?
         (<SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
         />) : (<div></div>)
    }


      {confirmationModal &&  <ConfirmationModel modalData={confirmationModal} /> }
    </div>
  )
}

export default NestedView
