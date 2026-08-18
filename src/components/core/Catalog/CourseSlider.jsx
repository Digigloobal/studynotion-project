import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Course_Card from './Course_Card'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,Navigation, Pagination } from 'swiper/modules'





const CourseSlider = ({courses}) => {
    

  return (
    <div>

    {
        courses?.length ? (
            <Swiper
               spaceBetween={30}
        centeredSlides={true}

        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
       // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
          breakpoints={{
            1024:{slidesPerView:2}
          }}
        className="mySwiper"
            >
                {courses.map((course,index) => (
                    <SwiperSlide key={index} >
                    <Course_Card course ={course} Height={"h-[300px]"} />
                        
                    </SwiperSlide>
                ))}
            </Swiper>
        ) : (
            <div> No Courses Found</div>
        )
    }
      
    </div>
  )
}

export default CourseSlider
