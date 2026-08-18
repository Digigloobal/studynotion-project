import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../common/RatingStars';

const Course_Card = ({course,Height}) => {
    
    const [avgReviewCount, setAvgReviewCount] = useState(0);


    useEffect(()=>{
        const count = GetAvgRating(course?.ratingAndReviews);
         setAvgReviewCount(count);
    },[course]);

  return (
    <div  >
      <Link to={`/courses/${course._id}`}>
        <div className='flex flex-col gap-1' >
            <div>
                <img
                    src={course?.thumbnail}
                    alt='course thubnail'
                    className={`${Height} rounded-lg object-cover   `}
                />
            </div>
            <div className='uppercase mt-2 ' >
                {course?.courseName}
            </div>
            <div className='text-richblack-400'>{course.instructor?.firstName} {course.instructor?.lastName}</div>
            <div className='flex gap-3' >
                <span className='text-yellow-100' >{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
                 <span className='text-richblack-400' >{course?.ratingAndReviews?.length} Ratings</span>

                
            </div>

            <div>Rs {course?.price}</div>
        </div>
      </Link>

      
    </div>
  )
}

export default Course_Card
