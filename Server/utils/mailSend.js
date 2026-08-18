const { BrevoClient } = require('@getbrevo/brevo')
require("dotenv").config()

const brevo = new BrevoClient({
    apiKey : process.env.BREVO_API_KEY,
})


const mailSend = async (email,title,body) => {

    try {

        const result = await brevo.transactionalEmails.sendTransacEmail({
        sender:{
            name: "StudyNotion",
            email:process.env.BREVO_SENDER_EMAIL 
        },
        to:[
            {
                email:email,
            }
        ],
        subject:title,
        htmlContent:body

    })

         console.log("Email sent successfully:", result.messageId);

    return result;
        

     
        
    } catch (error) {
        console.log("Brevo email error:", error);
        throw error;
    }
    
}

module.exports = mailSend;

