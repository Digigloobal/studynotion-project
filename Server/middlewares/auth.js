const User = require("../model/User");
const jwt =  require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req,res,next) => {

    try {
        
        //console.log("backened start")
        const jwtToken  = req.cookies?.jwtToken ||  req.body?.jwtToken  || req.header("Authorization").replace("Bearer ", "");
       // console.log(jwtToken);
        //console.log(req.headers.authorization);
      //console.log(jwtToken);

        //console.log("1")

        if(!jwtToken){
           return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        // console.log("2")

        try {

            // console.log("3")

            const decode = jwt.verify(jwtToken , process.env.JWT_SECRET);

             // console.log("Decoded:", decode);

            req.user = decode;

            //console.log("5")
            
        } catch (error) {
            console.log(error);
             return res.status(401).json({
                success:false,
                message:'token is invalid',

            });
        }

        next();
        
    } catch (error) {
        console.log(error);
      return  res.status(500).json({
            success:false,
            message:"something wrong while auth the jwtToken"
        })
    }
    
}

exports.isStudent = async (req,res,next) => {

    try {
        if(req.user.accountType  !== "Student"){
           return res.status(400).json({
                success:false,
                message:"This is Protected Route for Student Only "
            })
        }

        console.log("is Student verify")

        next();
    } catch (error) {
        console.log(error);
      return  res.status(500).json({
            success:false,
            message:"something wrong while valide the User accountType "
        })
    }
    
}

exports.isInstructor = async (req,res,next) => {

    try {
        if(req.user.accountType !== "Instructor"){
          return  res.status(400).json({
                success:false,
                message:"This is Protected Route for Instructor Only "
            })
        }
        next();
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success:false,
            message:"something wrong while valide the User accountType "
        })
    }
    
}


exports.isAdmin = async (req,res,next) => {

    try {
        console.log("user accoutntype =>", req.user.accountType);
        if(req.user.accountType !== "Admin"){
           return res.status(400).json({
                success:false,
                message:"This is Protected Route for Admin Only "
            })
        }

        next();
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success:false,
            message:"something wrong while valide the User accountType "
        })
    }
    
}