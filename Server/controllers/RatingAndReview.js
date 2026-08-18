const { default: mongoose } = require("mongoose");
const Course = require("../model/Course");
const RatingAndReview = require("../model/RatingAndReview");
const User = require("../model/User");

exports.createRating = async (req,res) => {

    try {
        
        const userId = req.user.id;
        const { rating , review , courseId} = req.body;

        if(!rating || !review || !courseId){
            return res.status(400).json({
                success:false,
                message:"plz provide all detail"
            })
        }

        const courseDetails = await Course.findById({_id:courseId,
                                     studentsEnrolled :{$elemMatch: {$eq : userId}},  
                               });
         
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }  
        
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });


        if(alreadyReviewed){
            return res.status(200).json({
                success:false,
                message : "User is already review the course "
            })
        }

        const ratingAndReview = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId
        });

        const courseDetailsUpdate  = await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                ratingAndReviews:ratingAndReview._id,
            }
        },{returnDocument:'after'});

        console.log("courseDtaisl=>",courseDetailsUpdate);


        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingAndReview,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
};


exports.getAverageRating = async (req,res) => {

    try {
        
        const {courseId} = req.body;

        const result = await Course.aggregate([

            {
                $match :{
                    course:new mongoose.Types.ObjectId(courseId),
                },
                
            },
            {$group:{
                    _id:null,
                    averageRating:{$avg : "$rating"},
                }}
        ]);

          //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })

    } catch (error) {
           console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    
}


exports.getAllRatingReview = async (req,res) => {

    try {
        
        const allReviews = await RatingAndReview.find({})
                           .sort({rating : "desc"})
                           .populate({
                              path:"user",
                              select:"firstName  lastName  email image"
                           })
                           .populate({
                            path:"course",
                            select:"courseName"
                           })
                           .exec();
   
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
                            

    } catch (error) {
          console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    
}