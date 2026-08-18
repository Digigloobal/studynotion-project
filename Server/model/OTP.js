const mongoose = require("mongoose");
const mailSend = require("../utils/mailSend");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    
     email:{
        type:String,
        required:true,
     },

     otp:{
        type:String,
        required:true,
     },

     createdAt:{
        type:Date,
        default:Date.now(),
        expires: 60*5 ,
     }
})

async function sendVerificationEmail(email,otp){

  try {
    const mailResponse = await mailSend(
      email,
      "Verification email from studyNotion",
      emailTemplate(otp)
   );
    console.log("Email sent Successfully: ", mailResponse.response);
  } catch (error) {
     console.log("error occured while sending mails: ", error);
        throw error;
  }
}

OTPSchema.pre("save", async function () {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	
});




const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
