const { populate } = require("../model/Category");
const Course = require("../model/Course");
const CourseProgress = require("../model/CourseProgress");
const Profile = require("../model/Profile");
const User = require("../model/User");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const { uploadDataToCloudinary } = require("../utils/uploadToCloudnary");

exports.updateProfile = async (req,res) => {

    try {
        
        const {dateOfBirth = "" , about ="" , gender , contactNumber}  = req.body;
        // console.log("updateProfile 1");

        // console.log("dob=>",dateOfBirth);
        // console.log("about=>",about);
        // console.log("gender=>",gender);
        // console.log("contactNumber=>",contactNumber);

        const id = req.user.id;

        if(!gender || !contactNumber || !id ){
             return res.status(400).json({
                success : false,
                message:"plz fill all details",
            })
        }

        const user = await User.findById(id);

        const profileId  = user.additionalDetail;
        // console.log(profileId);
        const profile = await Profile.findById({ _id : profileId} )
        //    dateOfBirth:dateOfBirth,
        //    about:about,gender:gender,
        //    contactNumber:contactNumber
        // },{returnDocument:true});

        	// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
        profile.gender = gender;

		// Save the updated profile
		await profile.save();


        const updatedUserDetails = await User.findByIdAndUpdate({_id:id},{
            
                additionalDetail:profile._id
            
        },{returnDocument:true}).populate("additionalDetail").exec();
   


         return res.status(200).json({
                success:true,
                message:'Profile Updated Successfully',
                profile,
                updatedUserDetails
            });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
    
}


exports.deleteAccount = async (req,res) => {

    try {

        console.log("1")
        
        const id = req.user.id;

        console.log("userID=>",id);

        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User does not exist",
            })
        }

        await Profile.findByIdAndDelete({_id : userDetails.additionalDetail});

        // h/w is this solutin


        await Course.updateMany({},{

            $pull:{
           studentsEnrolled:id},
        },{new:true})

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })

    } catch (error) {
          return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully',
        });
    }
    
}

exports.getAllUserDetails = async (req, res) => {

    try {
        //get id
        const id = req.user.id;
        console.log(id);

        //validation and get user details
        const userDetails = await User.findById(id)
        .populate("additionalDetail")
        .exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully',
            userDetails
        });
       
    }

    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


exports.updateDisplayProfile = async (req,res) => {

      try {
       
        const displayPicture = req.files.displayPicture;
   
        const userId = req.user.id;
     
        const image = await uploadDataToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000);
        

        
        const updateProfile = await User.findByIdAndUpdate({_id:userId},{image:image.secure_url},{returnDocument:true})
         

       res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updateProfile,
      })

        
      } catch (error) {

         return res.status(500).json({
            success:false,
            message:error.message,
        });


        
      }

}


exports.getEnrolledCourses = async (req,res) => {

    try {

        // console.log("before")

        

        const userId = req.user.id;
        

        const userDetails = await User.findById(userId).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec();
        // console.log("userDetails=>",userDetails)
        // console.log("After")

        

        //userDetails = userDetails.toObject();
       
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}

        

    
		let courseProgressCount = await CourseProgress.findOne({
		  courseId: userDetails.courses[i]._id,
		  userId: userId,
		})

        
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
        
      console.log("userDetails.course",userDetails.courses.progressPercentage);
         if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }


      return res.status(200).json({
        success: true,
        data: userDetails.courses
      })


        
    } catch (error) {

        return res.status(500).json({
        success: false,
        message: error.message,
      })
        
    }
    
}


exports.instructorDashboard = async (req,res) => {
    try {

        const instructorId = req.user.id;

        const courseDetails = await Course.find({instructor:instructorId});

        const courseData =  courseDetails.map((course) => {

            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = course.price * totalStudentsEnrolled;

            const courseDataWithStats = {
                _id : course._id,
                courseName : course.courseName,
                courseDescription : course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStats;


        })

        return res.status(200).json({courses: courseData});
        
 

    } catch (error) {
        console.error(error);
		res.status(500).json({message:"Internal Server Error"});
        
    }
    
}