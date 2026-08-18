const Course = require("../model/Course");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");
const  { uploadDataToCloudinary }= require("../utils/uploadToCloudnary");
require("dotenv").config();

exports.createSubSection = async (req,res) => {

    try {
        const { sectionId,courseId, title, description , } = req.body;

        const videoFile = req.files.videoFile;
        //console.log("courseId", courseId);

        // console.log("section Id =>",sectionId);
        // console.log("title =>",title);
        // console.log("description =>", description);
        // console.log("videoFile=>",videoFile);

        if(!sectionId || !title || !description  || !videoFile ){
            return res.status(400).json({
                success : false,
                message:"plz fill all details",
            })
        }

        const videoUrl = await uploadDataToCloudinary(videoFile , process.env.FOLDER_NAME);


        const newSubSection = await SubSection.create({
            title,
            description,
            videoUrl:videoUrl.secure_url,
            timeDuration:`${videoUrl.duration}`

        })

        console.log("NewSUbSection ", newSubSection);

        const updateSection = await Section.findByIdAndUpdate({_id : sectionId},{
            $push:{subSection : newSubSection._id}
        },{returnDocument: 'after'}).populate("subSection").exec();

       // console.log("updateSection =>", updateSection);


        const updateCourse = await Course.findById(courseId).populate({
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                })
                .exec();

        // console.log("updateCourse =>", updateCourse);       

        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            data:updateCourse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"problem in created in SubSection"
        })
    }
    
}

exports.updateSubSection = async (req, res) => {
  try {
    const { title, description, subSectionId, courseId } = req.body;

    const videoFile = req.files?.videoFile;

    // console.log("title",title);
    // console.log("description",description);
    // console.log("subSectionId",subSectionId);
    // console.log("courseId",courseId);

    if (!subSectionId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    const updateData = {
      title,
      description,
    };

    if (videoFile) {
      const upload = await uploadDataToCloudinary(
        videoFile,
        process.env.FOLDER_NAME
      );

      updateData.videoUrl = upload.secure_url;
      updateData.timeDuration = `${upload.duration}`
    }

    await SubSection.findByIdAndUpdate(
      subSectionId,
      updateData,
      {
        returnDocument: "after",
      }
    );

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedCourse,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Problem updating subsection",
    });
  }
};

exports.deleteSubSection = async (req,res) => {

    try {
        
        const {subSectionId , sectionId, courseId} = req.body;
        //console.log("courseId",courseId);

        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},{
            $pull:{subSection:subSectionId}
        },{returnDocument : 'after'});


        await SubSection.findByIdAndDelete(subSectionId);


        //const finalSection = await Section.findById(sectionId).populate("subSection").exec();


        const updateCourse = await Course.findById(courseId).populate({
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                })
                .exec();

        return res.status(200).json({
            success:true,
            message:'SubSection Deleted successfully',
            data:updateCourse,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"problem in delete  in SubSection"
        })
    }
    
}

