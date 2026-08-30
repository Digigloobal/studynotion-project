import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../services/apiConnector';
import { ratingsEndpoints } from '../../../services/apis';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,Navigation, Pagination } from 'swiper/modules'
import RatingStars from './RatingStars';

const ReviewSlider = () => {
   
    const [reviews,setReviews] = useState([]);
    const [loading , setLoading] = useState(false);
     const TRUNCATE_LENGTH = 20

    useEffect(() =>{

        const fetchAllReviews = async () => {

            setLoading(true);

            const response = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("LOgging response in rating =>",response?.data?.data);

            
               
                setReviews(response?.data?.data);
               
            

            console.log("Printing Reviews", reviews); 
            setLoading(false);  
        }

        fetchAllReviews();

    },[])

  return (
   
    <div className='text-white lg:w-11/12 w-full'>

    <div className='w-full'  >
        <Swiper
                  spaceBetween={15}
                  centeredSlides={false}

                  autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                  }}
                //   pagination={{
                //       clickable: true,
                //   }}
                  // navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  breakpoints={{
                      1024: { slidesPerView: 4 },
                      0:{ slidesPerView:1 },
                      640:{ slidesPerView:2 },
                  }}
                  className="mySwiper"
        >

        { loading ? (<div>Loading</div>) : (
            reviews.map((review,index) => (
                <SwiperSlide className='bg-richblack-800 p-4 rounded-lg flex flex-col gap-3 h-[200px] sm:h-[220px] ' key={index}>
                    <div className='flex gap-3'>
                        <img
                            src={ review?.user?.image ? (review?.user?.image) :
                            (`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`)}

                            className='lg:w-[40px] w-[20px] lg:h-[40px] h-[20px] object-cover rounded-full '
                            alt='user image'

                        />
                        <div>
                            <p className='text-richblack-5 sm:text-[10px]'>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p className='text-sm text-richblack-600 sm:text-[10px]' >{review?.user?.email}</p>
                        </div>


                    </div>
                   <div className=' text-richblack-25 text-sm'  >
                    {review?.review.split(" ").length > TRUNCATE_LENGTH ? ( review?.review.split(" ").slice(0,TRUNCATE_LENGTH).join(" ") + "..." ) : review?.review }
                   </div>

                   <div className='flex items-center gap-3' >
                    <p>{review?.rating.toFixed(1)}</p>
                    <RatingStars Review_Count={review?.rating} />

                   </div>
                </SwiperSlide>
            ))
        )}

        



        </Swiper>
    </div>
      
    </div>
  )
}

export default ReviewSlider
