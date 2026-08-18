const nodemailer = require("nodemailer");
require("dotenv").config()


const mailSend = async (email,title,body) => {

    try {

         const transport = nodemailer.createTransport({
    
           host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
        } 
    }) 

    let info  = await transport.sendMail({
        from:'STUDYNOTION',
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`
    })
     
    console.log("Email sent successfully:", info.messageId);
    return info;
        
    } catch (error) {
        console.log("Mail sending error:", error);
         throw error;
    }
    
}

module.exports = mailSend;

