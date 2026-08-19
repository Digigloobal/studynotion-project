const User = require("../model/User");
const OTP = require("../model/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../model/Profile");
const jwt  = require("jsonwebtoken");
const mailSend = require("../utils/mailSend");
require("dotenv").config();


exports.sendOTP = async (req,res) => {

try {
        const { email } = req.body;

    const checkUser = await User.findOne({email});

    if(checkUser){
      return  res.status(403).json({
            success:false,
            message:"User is already registered plz login "
        })
    }

    var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
    })

    console.log(otp);



    let checkOtp = await OTP.findOne({ otp : otp});
    console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", checkOtp);

    while(checkOtp){
        otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
    });

    }

    console.log("otp-2",otp);

const otpPayload = { email, otp};

const otpBody = await OTP.create(otpPayload);

  return res.status(200).json({
    success:true,
    message:"Otp generate sucessfully",
    otp,
})
} catch (error) {
    console.log(error);
   return res.status(500).json({
        success:false,
        message:"internal server error for gernerate otp "
    })
}


}

exports.signUp = async (req,res) => {

  try {
    
    const {
        firstName , 
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        additionalDetail,
        accountType,
        otp
    } = req.body;

  

    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
       return res.status(403).json({
            success:false,
            message:"Plz fill all the detail for signUp"
        })
    }


 console.log("password =>",password)
 console.log("Confirm Password",confirmPassword);
    if(password != confirmPassword){
       return res.status(403).json({
            success:false,
            message:"password and confirm Password value not match.plz fill correct detail",
        })
    };

    

    const checkUser = await User.findOne({email});

    if(checkUser){
       return res.status(401).json({
            success:false,
            message:"User is already registered plz try login "
        })
    }

    console.log("accountType =>",accountType);

     

    const recentOtp = await OTP.find({email:email} ).sort({createdAt:-1}).limit(1);
    console.log("recentOtp => ",recentOtp);

    if(recentOtp.length === 0){
       return res.status(404).json({
        success:false,
        message:"OTP not Found"
       })
    }else if(otp!== recentOtp[0].otp){
        return res.status(401).json({
            success:false,
            message:"Invalid Otp",
        })

    }


    const hashedPassword = await bcrypt.hash(password , 10);

    const profile = await Profile.create({
       gender:null,dateOfBirth:null, about:null , contactNumber:null
    })

     

    const user = await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        additionalDetail:profile._id,
        accountType,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    return res.status(200).json({
            success:true,
            message:'User is registered Successfully',
            user,
    })

  } catch (error) {
    console.log(error);
   return res.status(500).json({
        success:false,
        message:"Something wrong in signUp"
    })
  }

        
    }

exports.login = async (req,res) => {
    try {
       const {email ,password} = req.body;
       
       if(!email || !password){
       return res.status(400).json({
            success:false,
            message:"Plz Fill All The Details",
        })
       }

      let user = await User.findOne({email}).populate("additionalDetail");
       if(!user){
       return res.status(401).json({
            success:false,
            message:"User is not registered plz signUp",
        })
       }

       if(await bcrypt.compare(password,user.password)){

        const payload = {
            email : user.email,
            accountType : user.accountType,
            id : user._id
        }

        const jwtToken = jwt.sign(payload ,process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

         user =  user.toObject();
        user.jwtToken = jwtToken;
        user.password = undefined;

        const option = {
            expiresIn:new Date(Date.now() + 3*24*60*60*1000) ,
            httpOnly: true,
        }

       return res.cookie("jwtToken" , jwtToken , option).status(200).json({
            success:true,
            message:"User login succesfully",
            user
        })

       }else{
       return res.status(401).json({
            success:false,
            message:"Password does not match"
        })
       }
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success:false,
            message:"Something wrong while Login"
        })
    }
}


exports.changePassword = async (req,res) => {

    try {
        
         const {oldPassword , newPassword , newConfirmPassword = newPassword} = req.body;

          console.log("old password",oldPassword)
         const userDetail = await User.findById(req.user.id);

         console.log("userDetail",userDetail);

         if(!userDetail){
           return res.status(400).json({
                success:false,
                message:"user does exist plz registered",
            })
         }

          
        // console.log("Old password compare", userDetail.password);

         console.log( (await bcrypt.compare(oldPassword,userDetail.password)));

         if( !(await bcrypt.compare(oldPassword,userDetail.password))){
            // If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
         }


          console.log("Old Password compare complete")

         if( !newPassword || !newConfirmPassword){
          return  res.status(401).json({
                success:false,
                message:"Plz fill all the details",
            })
         }


 

    if(newPassword !== newConfirmPassword){
       return res.status(401).json({
            success : false,
            message:"new Password and new Confirm password Value not match",
        })
    }
   

    console.log("new password hashing start")

    const hashedPassword = await bcrypt.hash(newPassword,10);

    const updatedUser = await User.findByIdAndUpdate({_id:req.user.id} ,
      {password:hashedPassword}
       ,{returnDocument:true});

        await mailSend(updatedUser.email,`Reset complete!` ,`All done! We have sent an email to ${userDetail.email} `)


       return res.status(200).json({
            success:true,
            message:"password change successfully"
        })
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success:false,
            message:"something error while change the password"
        })
    }

   
    
}

    
