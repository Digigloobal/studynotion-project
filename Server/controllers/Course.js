const Category = require("../model/Category");
const Course = require("../model/Course");
const CourseProgress = require("../model/CourseProgress");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");
const User = require("../model/User");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const { uploadDataToCloudinary } = require("../utils/uploadToCloudnary");

exports.createCourse = async (req,res) => {

    try {
        const {courseName, 
             courseDescription ,
             whatYouWillLearn ,
             price ,
             tag : _tag , 
             category,
             instructions: _instructions,
             status } = req.body;

        const thumbnail = req.files.thumbnailImage;

         const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        if(!courseDescription || !courseName || !whatYouWillLearn || !price || !tag || !category || !thumbnail ){
            res.status(400).json({
                success:false,
                message : "Plz fill all details carefully for course creation"
            })
        }
    

        const userId = req.user.id;
        console.log("UserId =>",userId)
        const instructordetails = await User.findById({_id:userId}, {
			accountType: "Instructor",
		});
         console.log("Instructor Details: " , instructordetails);

         if(!instructordetails){
            res.status(404).json({
                success:false,
                message:"instructor details not found"
            })
         }

         const categoryDetails = await Category.findById(category);

         if(!categoryDetails){
            res.status(404).json({
                success:false,
                message:"Category details not found"
            })
         }

        console.log("thumbnailImage =>",thumbnail);

         const thumbnailImageUpload = await uploadDataToCloudinary(thumbnail , process.env.FOLDER_NAME);

         const newCourse = await Course.create({
            courseName,
            courseDescription:courseDescription,
            price,
            tag,
            whatYouWillLearn,
            category:categoryDetails._id,
            instructor:instructordetails._id,
            thumbnail:thumbnailImageUpload.secure_url,
            instructions,
            status
         })

         await User.findByIdAndUpdate({_id:instructordetails._id},{
            $push:{
                courses:newCourse._id,
            }
         },{returnDocument: 'after'});

         await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ returnDocument:'after' }
		);


       return  res.status(200).json({
            success:true,
            message:"course created successfully",
            data:newCourse
         })

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success:false,
            message:"something problem in created in course creation"
        })
    }
    
}

exports.editCourse = async(req,res) => {
     
   try {

     const {courseId} = req.body;
     const updates = req.body;

     const course = await Course.findById(courseId);

     if(!course){
       return res.status(404).json({ error: "Course not found" })
     }

     if(req.files){
     console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadDataToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }
     

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates,key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    

    await course.save();

    const updatedCourse = await Course.findById(courseId).
    populate({
       path: "instructor",
        populate: {
          path: "additionalDetail",
        }, 
    }).populate("category")
    .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
    }).populate("ratingAndReviews")
    .exec();


     res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })

    
    
   } catch (error) {
    
     console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })

   }

}

exports.getAllCourses = async (req,res) => {

    try {
        const allCourse = await Course.find({},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnrolled: true,
			}
		)
			.populate("instructor")
			.exec();
        

        return res.status(200).json({
                success:true,
                message:'Data for all courses fetched successfully',
                data:allCourse,
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
    
}

exports.getCourseDetails = async (req,res) => {

    try {

        const { courseId } = req.body;
        console.log("course id =>",courseId);
        

        const courseDetails = await Course.findOne({_id:courseId})
                                .populate({
                                    path : "instructor",
                                    populate:{
                                        path:"additionalDetail"
                                    }
                                    
                                }).populate({
                                    path:"courseContent",
                                    populate:{
                                       path:"subSection",
                                    },
                                   
                                }).populate("category")
                                .populate("ratingAndReviews")
                                .exec();

          if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:`There is not course data for this courseId ${courseId}`,
            })
          }  

          //console.log("courseDetails =>", courseDetails);

      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
      console.log("totalDuration=>",totalDurationInSeconds);
          
          return res.status(200).json({
            success:true,
            message:"course data fetch successfully",
            courseDetails,
            totalDurationInSeconds,
          })
        
    } catch (error) {
        return res.status(404).json({
                success:false,
                message:`There is not course data for this courseId`,
                message:error.message
            })
    }
    
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

      //console.log("courseDetails",courseDetails);

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    })

    //console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

     //console.log("1")
    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    //console.log("totalDurationInSecond" , totalDurationInSeconds);

    //console.log("2");
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    //console.log("totalduration",totalDuration);

    

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.totalStudentEnrolledUpdate = async (req,res) => {

	try {
		
		const {courseId} = req.body;

		const studentEnrolledUpdate = await Course.findByIdAndUpdate({_id:courseId},
			{ $inc: {totalEnrolledStudent:1 }},
			{new:true});

			if(!studentEnrolledUpdate){
				return res.status(404).json({
					success:false,
					message:"something wrong in update totalstudentenrolled value"
				})
			}

			return res.status(200).json({
				success:true,
				message:"totalStudentEnrolled value is update",
				studentEnrolledUpdate
			})
	} catch (error) {
		console.log(error)
		return res.status(200).json({
				success:true,
				message:error.message,
				
			})
	}
	
}


exports.getInstructorCourses = async (req,res) =>{

    try {
         
        const instructorId = req.user.id;

        const instructorCourses = await Course.find({
            instructor:instructorId
        }).sort({createdAt : -1});

         res.status(200).json({
      success: true,
      data: instructorCourses,
    })

    } catch (error) {
        
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })


    }
}


exports.deleteCourse = async (req,res) => {

   try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    const instructorId = course.instructor;
    await User.findByIdAndUpdate(instructorId,{
        $pull:{courses:courseId},
    })
    

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
    
}