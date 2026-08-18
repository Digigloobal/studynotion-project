import React, { useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { formatDate } from '../../../../services/formatDate'
import { COURSE_STATUS } from '../../../../utils/constants'
import { HiOutlineClock } from "react-icons/hi2";
import { FaRegCircleCheck } from "react-icons/fa6";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineAutoDelete } from "react-icons/md";
import ConfirmationModel from '../../common/ConfirmationModel';
import { useSelector } from 'react-redux';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

const CourseTable = ( { courses , setCourses }) => {
  
    const TRUNCATE_LENGTH = 25

    const [confirmationModal , setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false)
    const {jwtToken} = useSelector((state) => state.auth);
    const navigate = useNavigate();


    const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, jwtToken)
    const result = await fetchInstructorCourses(jwtToken)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }



  return (
    <div>

    <Table className='flex flex-col gap-5 mt-10'>
        <Thead>
            <Tr className='flex  items-center w-[100%] gap-x-20 text-richblack-100' >
                <Th className='uppercase flex-1 text-left ml-6 '>Courses</Th>
                <Th className='uppercase '>Duration</Th>
                <Th className='uppercase' >Price</Th>
                <Th className='uppercase' >Actions</Th>
            </Tr>
        </Thead>

        <Tbody className='flex flex-col items-center w-[100%] gap-x-10 text-richblack-100 '>
            {courses?.length === 0 ?
                (
                    <Tr className='flex items-center justify-center text-pink-400' >
                        <Td>No Courses Found</Td>
                    </Tr>
                ) : (
                    courses?.map((course)=>(
                        <Tr key={course._id} className='flex  items-center w-[100%] gap-x-32 text-richblack-100  '  >
                         
                         <Td className='flex gap-5 mb-10 items-center  w-[50%]  justify-start ml-6 flex-1' >
                            <img src={course?.thumbnail}
                              alt={course?.courseName}
                               className="h-[148px] w-[220px] rounded-xl object-cover"
                               />

                               <div className='flex flex-col gap-2' >
                                <p className='uppercase font-semibold'  >{course?.courseName}</p>
                                <p className='w-[100%] text-sm text-richblack-300' >{course?.courseDescription.split(" ").length > TRUNCATE_LENGTH ?
                                course.courseDescription.split(" ").slice(0,TRUNCATE_LENGTH).join(" ") + "...."  : course.courseDescription} </p>
                                <p className='text-sm' >Created: {formatDate(course?.createdAt)}</p>
                                {COURSE_STATUS.DRAFT === course.status ? (
                                    <p className='flex gap-2 text-sm items-center text-pink-100 bg-richblack-700 rounded-xl w-fit p-1 px-3' >
                                     
                                     <HiOutlineClock/>
                                     Drafted
 
                                    </p>
                                ) : (<p className='flex gap-2 text-sm items-center text-yellow-100 bg-richblack-700 rounded-xl w-fit p-1 px-3'> <FaRegCircleCheck/> Published</p>)}
                               </div>

                         </Td>

                         <Td className='text-sm font-medium text-richblack-100  ' >
                            2hr30min
                         </Td>

                         <Td className='text-sm font-medium text-richblack-100  '>
                            {course.price}
                         </Td>

                         <Td className='flex gap-2' >
                            <button 
                                onClick={() => {
                                     navigate(`/dashboard/edit-course/${course._id}`)
            
                                }}
                                 className='text-2xl text-richblack-100 hover:scale-110'
                                >
                               
                               <MdOutlineEdit/>
                            </button>

                            <button 
                              onClick={()=>{
                                        setConfirmationModal({
                                            text1: "Do you want to delete this course?",
                                            text2:
                                                "All the data related to this course will be deleted",
                                            btn1Text: !loading ? "Delete" : "Loading...  ",
                                            btn2Text: "Cancel",
                                            btn1Handler: !loading
                                                ? () => handleCourseDelete(course._id)
                                                : () => { },
                                            btn2Handler: !loading
                                                ? () => setConfirmationModal(null)
                                                : () => { },
                                })
                              }}

                               className='text-2xl text-richblack-100 hover:scale-110'
                              
                              >
                            <MdOutlineAutoDelete/>
 
                            </button>
                         </Td>
                        
                        </Tr>
                    ))
                ) }
        </Tbody>
    </Table>

    {confirmationModal && <ConfirmationModel modalData={confirmationModal} />}

    
    </div>
  )
}

export default CourseTable
