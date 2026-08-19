import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
//import { apiConnector } from '../../../services/apiConnector';
import { fetchCourseDetails } from '../../../services/operations/courseDetailsAPI';
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../common/RatingStars';
import { FiInfo } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr";
import { HiOutlineClock } from "react-icons/hi2";
import { FaArrowPointer } from "react-icons/fa6";
import { FaMobileRetro } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
//import { RxDropdownMenu } from 'react-icons/rx';
import { FaAngleUp } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa";
import Footer from '../common/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../../../services/operations/studentFeaturesAPI';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { addToCart } from '../../../slices/cartSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';


const CourseDetailsPage = () => {
       
    const { courseId } = useParams();
    const [courseData,setCourseData] = useState(null);
    const {user} = useSelector((state)=> state.profile);
    const {jwtToken} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     
   const fetchCourse = async () => {
      
    const result = await fetchCourseDetails(courseId);
    console.log("courseDetails => ", result);
    setCourseData(result);
    
   }

   const handleBuyCourse = () =>{
      
    if(jwtToken){
        buyCourse(jwtToken,[courseId],user,navigate,dispatch);
        return;
    }

   }

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(()=> {
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);

    },[courseData]);


   // console.log("totalNo.Lectures",totalNoOfLectures);



   const [avgReviewCount, setAvgReviewCount] = useState(0);
   
   
       useEffect(()=>{
         if (courseData?.courseDetails?.length > 0) {
           const count = GetAvgRating(courseData?.courseDetails?.ratingAndReviews);
           if(count){
            setAvgReviewCount(count);
           }
        }
       },[courseData]);


    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {

        // console.log("ia ma  xlicked")
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e) => e !== id)

        )
    }

    // console.log("isActive=>", isActive);

     const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you cant buy a course");
            return;
        }
        if(jwtToken) {
            console.log("dispatching add to cart")
            dispatch(addToCart(courseData?.courseDetails));
            toast.success("Course add to your Cart")
            return;
        }
        // setConfirmationModal({
        //     text1:"you are not logged in",
        //     text2:"Please login to add to cart",
        //     btn1text:"login",
        //     btn2Text:"cancel",
        //     btn1Handler:()=>navigate("/login"),
        //     btn2Handler: ()=> setConfirmationModal(null),
        // })
    }

   useEffect(() => {
    fetchCourse();
   },[]);


   const handleShare = () =>{
    copy(window.location.href);
     toast.success("Link Copied to Clipboard")
   }


  return (
    <div className='text-white w-11/12 mt-5'>
        <div className='w-[100%]' >

        {courseData && (
            <div className='w-[100%] bg-richblack-800 rounded-lg flex h-[280px]' >
            <div className='flex flex-col w-[60%] gap-2 p-3 border-r-2 border-richblack-700 my-4 mb-5  ' >
                <p className='text-richblack-400 text-sm' >Home / Learning / <span className='text-yellow-5'> {courseData?.courseDetails?.category.name} </span> </p>
                 <p className='text-2xl' >{courseData?.courseDetails?.courseName}</p>
                 <p className='text-richblack-400 text-sm' >{courseData?.courseDetails?.courseDescription}</p>
                 <div className='flex gap-2 text-richblack-400'>
                    <p className='text-yellow-100'>{avgReviewCount || 0}</p>
                    <RatingStars Review_Count={avgReviewCount} />
                    <p>{`(${courseData?.courseDetails?.ratingAndReviews.length} ratings  )`}</p>
                    <p>{`${courseData?.courseDetails?.studentsEnrolled.length} students`}</p>
                 </div>

                 <div className='text-richblack-50' >Created by {courseData?.courseDetails?.instructor?.firstName} {courseData?.courseDetails?.instructor?.lastName}</div>
                 <div className='flex  items-center gap-2 text-richblack-50' >
                
                       <FiInfo/>
                       <p>Created At {courseData?.courseDetails?.createdAt.split("T")[0]}</p>
                       <GrLanguage/>
                       <p>English</p>
                    
                 </div>
            </div>

            <div className='flex flex-col p-6 mt-5 pl-14'>
                <div >
                <img
                src={courseData?.courseDetails?.thumbnail}
                className='h-[150px] object-cover rounded-t-lg'
                alt='course thumbnail '
                /></div>
                <div className='bg-richblack-700 p-3 flex flex-col  gap-2 rounded-b-lg'>
                    <p className='text-2xl text-richblack-5 font-semibold ' >Rs. {courseData?.courseDetails?.price}</p>
                    { ( !user || !courseData?.courseDetails?.studentsEnrolled.includes(user._id) ) &&
                     <button className='bg-yellow-50 p-2 text-richblack-900 text-sm rounded-lg'
                     onClick={ handleAddToCart}
                     >Add to Cart</button>
                      }
                   
                     <button className='bg-richblack-900 p-2 text-richblack-100 text-sm rounded-lg' 
                      onClick={
                                user && courseData?.courseDetails?.studentsEnrolled.includes(user._id) ? () => navigate("/dashboard/enrolled-courses") :
                        handleBuyCourse}
                     >
                      { user && courseData?.courseDetails?.studentsEnrolled.includes(user._id) ? "Go To Course " : "Buy Now "} 
                     </button>
                     <p className='text-[12px] text-richblack-25 mx-auto'>30-Day Money-Back Guarantee</p>
                     <div>
                        <p className='text-sm'>This course includes:</p>
                        <div className='flex flex-col gap-1 mt-2 text-caribbeangreen-400' >
                            <p className='flex items-center gap-1 text-[12px]' > <HiOutlineClock/> 8 hours on-demand video </p>
                            <p className='flex items-center gap-1 text-[12px]'><FaArrowPointer/> Full Lifetime access </p>
                            <p className='flex items-center gap-1 text-[12px]'><FaMobileRetro/> Access on Mobile and TV  </p>
                            <p className='flex items-center gap-1 text-[12px]'><GrCertificate/> Certificate of completion </p>
                        </div>
                     </div>

                     <button className='text-yellow-50 text-sm my-3'
                     onClick={handleShare} >Share</button>
                </div>
            </div>
       
            </div>

        )}

        <div className='flex flex-col  w-[60%] p-6 mt-5 h-[200px] border-2 border-richblack-800 gap-1 '>

        <p className='text-2xl'>What you'll learn</p>
        <p className='text-sm text-richblack-100'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
        <p className='text-sm text-richblack-100'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
        <p className='text-sm text-richblack-100'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
        <p className='text-sm text-richblack-100'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>

        </div>

        <div  className='flex flex-col  w-[60%] p-6 mt-5   gap-1'>
        <div>
            <p className='text-2xl'>Course content</p>
            <div className='flex justify-between' >
            <div className='flex gap-2 text-sm text-richblack-400'>
                <p>{courseData?.courseDetails?.courseContent.length} sections .</p>
                {/* eska kuch function ya adjust krna pde ga  */}
                <p>{totalNoOfLectures} lectures </p>
                {/* {ya par b fuction likna pde ga total length nikale k liye} */}
                <p>{courseData?.totalDurationInSeconds} total length</p>
            </div>

            <div>
                <button className='text-sm text-yellow-50'
                 onClick={() => setIsActive([])}
                > Collapse all Sections</button>
            </div>

            </div>

            <div className='mt-5'>
                {courseData?.courseDetails?.courseContent.map((section)=>(

                    <details key={section._id} 
                        
                        onClick={()=> handleActive(section._id)}
                        
                     className='border-2 border-richblack-700'  >

                    <summary className='flex justify-between px-7 text-xl  bg-richblack-700 p-3 border-b-2 border-richblack-600  transition-all duration-200 ' >
                         <div 
                         
                         className='flex  gap-2 items-center text-sm ' >
                         <FaAngleUp className={`deati`}/>
                            <p>{section.sectionName}</p>
                            </div>
                            <div className='flex gap-4 text-sm' >
                            <p className='text-yellow-100'>{section.subSection.length} lecture</p>
                            <p className='text-richblack-100'>51 min</p>
                            
                         </div>
                    </summary>

                    {section?.subSection.map((data) => (

                        <details key={data._id} className='w-[90%] mx-auto my-3'>
                            <summary className='flex justify-between mx-auto text-sm ' >
                             
                              <div className='flex items-center gap-2 '>
                               <FaLaptopCode/>
                               <p>{data.title}</p>
                               <FaAngleUp/>

                              </div>
                              <p>{`${Math.floor(data.timeDuration)}`}</p>


                            </summary>
                            <p className='text-richblack-400 text-sm' >{data.description}</p>
                        </details>
                       
                    ))}

                    </details>
                ))}
            </div>

            <div className='mt-5' >
                <p className='text-2xl' >Author</p>
                <div className='flex gap-2 items-center' >
                <div className='w-[100px] h-[100px] rounded-full mt-3' >
                    <img src={courseData?.courseDetails?.instructor?.image}
                    className='object-fill rounded-full w-[100px] h-[100px]'
                    alt='instructor image'
                     />
                 </div>
                    <p>{courseData?.courseDetails?.instructor?.firstName} {courseData?.courseDetails?.instructor?.lastName}</p>

                </div>
                <p className='text-richblack-200 mt-3' >{courseData?.courseDetails?.instructor?.additionalDetail?.about}</p>
            </div>
        </div>

        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default CourseDetailsPage
