const { default: mongoose } = require("mongoose");
const Course = require("../model/Course");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");

exports.createSection = async (req,res) => {

    try {
        
        const {courseId , sectionName} = req.body;

        if(!courseId || !sectionName){
            res.status(400).json({
                success:false,
                message:"plz fill all details"
            })
        };

        const newSection = await Section.create({sectionName});

        const updateCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{
            $push:{courseContent:newSection._id}
        },{
            returnDocument:'after'
        }).populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updateCourseDetails,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"problem in created in Section"
        })
    }
    
}

exports.updateSection = async (req,res) => {
    try {
         
        const {sectionName , sectionId ,courseId} = req.body;

        if(!sectionId || !sectionName){
            res.status(400).json({
                success:false,
                message:"plz fill all details"
            })
        };

        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{
            $set:{sectionName:sectionName}
        },{returnDocument: 'after'});


        const updateCourse = await Course.findById(courseId).populate({
            path:'courseContent',
            populate:{
                path:"subSection",
            },
        }).exec();







      
        
       return res.status(200).json({
            success:true,
            message:'Section updated successfully',
             data: updateCourse
        })




    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"problem in update in Section"
        })
    }
    
}

exports.deleteSection = async (req,res) => {

    try {
        
        const {sectionId ,courseId} = req.body;


          const updatedCourse = await Course.findByIdAndUpdate({_id:courseId},{
            $pull:{courseContent:sectionId}
        },{ returnDocument: 'after' });

        await Section.findByIdAndDelete({_id:sectionId});

        const finalCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();

        return res.status(200).json({
            success:true,
            message:'Section Deleted successfully',
            data:finalCourse
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"problem in delete  in Section"
        })
    }
    
}