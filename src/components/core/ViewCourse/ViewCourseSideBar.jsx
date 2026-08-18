import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import IconBtn from '../common/IconBtn';
import { IoChevronUp } from "react-icons/io5";

const ViewCourseSideBar = ({setReviewModal}) => {

    const [ activeStatus , setActiveStatus ] = useState("");
    const [videoBarActive , setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId,subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    useEffect(()=>{
        const setActiveFlags = () => {
                
            if(!courseSectionData.length){
                return;
            }
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((data) => data._id === subSectionId);

            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);

            setVideoBarActive(activeSubSectionId);
     
        }

        setActiveFlags();
    },[courseSectionData , location.pathname ,courseEntireData]);

      

  return (
    <div className='text-white flex flex-col gap-3 bg-richblack-800 justify-start w-[20%] ' >

    <div className='w-full mt-5'>
        <div className='flex justify-between w-full items-center p-5'>

             <div
             onClick={() => navigate(`/dashboard/enrolled-courses`)}
             className='w-[40px] h-[40px] rounded-full bg-richblack-50 flex justify-center items-center p-1'
             >
                <IoChevronBack className='text-black'/>
             </div>

             <div>
                <IconBtn 
                    text={"Add Review"}
                    onclick={()=> setReviewModal(true)}
                    
                />
             </div>
            


        </div>
    

    </div>

    <div className='flex flex-col gap-1 px-5' >
        <p className='font-bold'>{courseEntireData?.courseName}</p>
        <p className='text-richblack-400'>{completedLectures.length} / {totalNoOfLectures}</p>
    </div>

 <hr className='mx-4 text-richblack-500' />

    <div >
        {
            courseSectionData?.map((section,index) => (
                <div key={index} 
                  onClick={() => setActiveStatus(section._id)}
                
                >

                <div className='bg-richblack-700 p-3 border border-richblack-600 flex justify-between ' >
                    <div >
                        {section.sectionName}
                    </div>

                    <div className={`text-richblack-300 ${activeStatus === section._id ?  " rotate-0" : "rotate-180"} transition-all duration-200 `}>
                    <IoChevronUp/>

                    </div>
                </div>

                <div>
                    {
                        activeStatus === section._id && (
                       <div>
                    {
                        section?.subSection?.map((subSection, index) => (
                            <div
                            key={index}
                            className={`flex gap-4 px-4 py-2  ${videoBarActive === subSection._id ? " bg-yellow-200 text-richblack-900  " : " bg-richblack-800 text-richblack-50 "} `}

                            onClick={()=>{
                            navigate(`view-Course/${courseEntireData?._id}/section/${section._id}/sub-section/${subSection._id}`)
                            setVideoBarActive(subSection?._id);
                            }
                            }
                            >
                            <input

                            type='checkbox'
                            checked={completedLectures.includes(subSection._id)}
                            onChange={()=>{}}


                            />

                            <span>{subSection.title}</span>

                       
                                      
                                    </div>
                       ) )}
                            </div>
                        )
                    }
                </div>


                </div>
            ))
        }
    </div>


     
    </div>
  )
}

export default ViewCourseSideBar
