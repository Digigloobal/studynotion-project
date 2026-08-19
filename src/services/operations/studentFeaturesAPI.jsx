import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import rzpLogo from '../../assets/Logo/rzp_logo.png'




const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API  } = studentEndpoints ;

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
         document.body.appendChild(script);
    })
}

export async function buyCourse(jwtToken , courses,userDetails,navigate,dispatch){

    const toastId = toast.loading("Loading....");
    console.log("razorpaykey =>", process.env.REACT_APP_RAZORPAY_KEY);
    
    try {
        console.log("script start")
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        console.log("script end")

         if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        const orderResponse = await apiConnector("Post",COURSE_PAYMENT_API,{courses},
            
            {
              Authorization: `Bearer ${jwtToken}`,
            })

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        
        console.log("PRINTING orderResponse", orderResponse);

        const options = {
            key : process.env.REACT_APP_RAZORPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:`StudyNotion`,
            description:"Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount,jwtToken);

                verifyPayment({...response,courses},jwtToken,navigate,dispatch);
            }
        }
              
         console.log("option =>",options);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
        
    } catch (error) {
         console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }

    toast.dismiss(toastId);

}

async function sendPaymentSuccessEmail(response,amount,jwtToken){
    try {
     
         await apiConnector("POST" , SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
         },{
             Authorization: `Bearer ${jwtToken}`
         })
        
    } catch (error) {
         console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }

}

async function verifyPayment(bodyData,jwtToken,navigate,dispatch) {
      
    const toastId = toast.loading("Verify Payment...");
      dispatch(setPaymentLoading(true));

      try {

        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${jwtToken}`,
        });

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
        
      } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
      }

      toast.dismiss(toastId);
       dispatch(setPaymentLoading(false));

}
