const nodemailer = require("nodemailer");
require("dotenv").config()


const mailSend = async (email,title,body) => {

    try {

         const transport = nodemailer.createTransport({
    
           host: process.env.MAIL_HOST,
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
     
    console.log(info);
    return info;
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = mailSend;

