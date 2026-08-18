import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { setCompletedLectures, updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import '../../../../node_modules/video-react/dist/video-react.css'
import { BsPlayBtn } from "react-icons/bs";
import IconBtn from '../common/IconBtn';

const VideoDetails = () => {
     
    const {courseId , sectionId, subSectionId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const playerRef = useRef();
    const {jwtToken} = useSelector((state) => state.auth);
    const {courseEntireData , courseSectionData,completedLectures} = useSelector((state) => state.viewCourse);

    const [videoData,setVideoData] = useState(null);
    const [videoEnded,setVideoEnded] = useState(false);
    const [loading , setLoading] = useState(false);

   // console.log("courseSectionData =>", courseSectionData);
     //console.log("courseEntireData => ",courseEntireData);
    useEffect(() => {

        //console.log("use Effect start")

    
        const setVideoSpecificDetails = () => {
            
            if(!courseSectionData.length){
                return;
            }

            if(!courseId || !sectionId || !subSectionId){
                navigate("/dashboard/enrolled-courses");
            }else{

              
              const filterData = courseSectionData.filter(
                (section) => section._id === sectionId
              )  

              console.log("filterData => ",filterData);
            //   if(!filterData){
            //     return;
            //   }

              const filteredVideoData = filterData[0].subSection.filter(
                (data) => data._id === subSectionId
              )
               
            //   if(!filteredVideoData){
            //     return;
            //   }

              //console.log("filteredVideoData => ",filteredVideoData);

              setVideoData(filteredVideoData[0]);
              setVideoEnded(false);

            


            }

        }
   

        setVideoSpecificDetails();

        


    },[courseSectionData , courseEntireData , location.pathname,sectionId,subSectionId,courseId]);

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
            
        } else {
             return false;
        }
    }

    const isLastVideo = () => {

         const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

         const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1){
            return true;
        }else{
            return false;
        }

    }

    const goToNextVideo = () =>{

         const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

         const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )
          
        // console.log("current sub section index =>",currentSubSectionIndex);
        // console.log("no. fo sub section =>",noOfSubSections - 1);
         
        if(currentSubSectionIndex !== noOfSubSections - 1 ){

            const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1 ]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }else{
            //console.log("i am in else condition")
            
            const nextSection = courseSectionData[currentSectionIndex + 1 ];
            if(!nextSection){
                return;
            }

            const nextSectionId = nextSection._id;
            //console.log("nextsectionindex",nextSectionId);
            const nextSubSectionId = nextSection.subSection[0]._id;
            //console.log("nextsubSectionId",nextSubSectionId);
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }

    }

    const goToPrevVideo = () =>{

         const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);


        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSubSectionIndex !== 0 ){

            const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1 ]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }else{
            const prevSection = courseSectionData[currentSectionIndex - 1 ];

            if(!prevSection){
                return;
            }

            const prevSectionId = prevSection._id;

            const prevSubSectionLength = prevSection.subSection.length;
            const prevSubSectionId = prevSection?.subSection[prevSubSectionLength - 1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`) 
        }

    }


    const handleLectureCompleted = async () => {

        setLoading(true);

        const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId},jwtToken);
        if(res){
            dispatch(updateCompletedLectures(subSectionId));
        }

        setLoading(false);
        
    }

console.log("videoData => ",videoData);

  return (
    <div className='w-[100%] relative text-white '>
     {
        !videoData ? (<div>No Data Found</div>) : (
            <div className='w-[98%] h-screen flex flex-col justify-center mt-5  ' >
                <Player
               ref = {playerRef}
                 aspectRatio='16:9'
                playsInline
                onEnded={() => setVideoEnded(true)}
                src={videoData?.videoUrl}
            >

            {videoEnded && (
                <div className='absolute  top-[40%] left-[45%] z-40 flex flex-col gap-4'>
                    {!completedLectures.includes(subSectionId) && (
                        <IconBtn
                           text={!loading ? "Mark As Completed" : "Loading..."}
                           onclick={()=>handleLectureCompleted()}
                           disabled={loading}
                           
                        />
                    )}

                    
                        <IconBtn
                        disabled={loading}
                        onclick={()=>{
                            if(playerRef?.current){
                                playerRef?.current?.seek(0);
                                setVideoEnded(false);
                            }
                        }}

                        text={"Rewatch"}
                        customClasses={"text-xl"}


                        />

                        <div className='flex gap-5' >
                             {!isFirstVideo() && (
                                    <button
                                    disabled={loading}
                                    onClick={goToPrevVideo}
                                    className='blackButton text-lg'
                                    >
                                        Prev
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button
                                    disabled={loading}
                                    onClick={goToNextVideo}
                                    className='blackButton text-lg'>
                                        Next
                                    </button>
                                )}
                        </div>
                    
                </div>
            )}

            

            </Player>

            <div className='text-xl mt-5' >
        {videoData?.title}
     </div>
     <div className='text-sm text-richblack-400' >{videoData?.description}</div>
            </div>
        )
     }


     
    </div>
  )
}

export default VideoDetails
