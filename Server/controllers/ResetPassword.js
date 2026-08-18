const User = require("../model/User");
const mailSend = require("../utils/mailSend");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req,res) => {

    try {
        const email = req.body.email;

        const user = await User.findOne({email:email});
        if(!user){
           return res.status(401).json({
                success:false,
                message:"user is not register plz signup"
            })
        }

        const token = crypto.randomUUID();
        const updateDetails = await User.findOneAndUpdate({email:email},{token:token,
            resetTokenExpires : Date.now() + 5*60*1000, 
        },{new : true});

        const url = `http://localhost:3000/update-password/${token}`;

      await mailSend(email,
        `Password Reset Link` ,
         `Here Your Password Reset Link ${url}`);

        return res.status(200).json({
            success:true,
            message:"Password link generated succesfully",
         })
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success:false,
            message:"error while generating in resetPassword token",
        })
        
    }
    
}

exports.resetPassword = async (req,res) => {
    try {

        const {password,confirmPassword,token} = req.body;

        if(password !== confirmPassword){
          return  res.status(401).json({
                success:false,
                message:"password and confirm Password value not match",
            })
        }

        const checkUser = await User.findOne({token:token});

        if(!checkUser){
          return  res.status(401).json({
                success:false,
                message:"Token is Invalid",
            })

        }

        if(checkUser.resetTokenExpires < Date.now()){
          return  res.status(403).json({
                success:false,
                message:"Token is expire plz regenerate it "
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.findOneAndUpdate({token:token},
            {password:hashedPassword},
            {returnDocument:true});

          return  res.status(200).json({
                success:true,
                message:"password reset successfully"
            })

        
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            success:false,
            message:"something wrong while reset the password "
        })
    }
    
}