import {toast} from 'react-hot-toast';

import { setLoading , setJwtToken } from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice';
import { resetCart } from '../../slices/cartSlice';
import { apiConnector } from '../apiConnector';
import { endpoints } from '../apis';


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints;


export function sendOtp(email , navigate){
  
     return async (dispatch) => {
        const toastId = toast.loading("Loading....");
         
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST" , SENDOTP_API , {
                email:email,
                checkUser:true,
            }
        )

        console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message);
      }

       toast.success("OTP Sent Successfully")
      navigate("/verify-email")
             



        } catch (error) {
             console.log("SENDOTP API ERROR............", error)
             toast.error("Could Not Send OTP")
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId)
        
        
     }

}


export function signUp(

        firstName , 
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        accountType,
        otp,
        navigate

)
{
    return( async (dispatch) => {

        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

    try {

        console.log("i am starting the signup Fuction")

        const response = await apiConnector("POST" , SIGNUP_API,{
            firstName , 
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,           
            accountType,
            otp
        })

         console.log("SIGNUP API RESPONSE............", response)

         if(!response.data.success){

            throw new Error(response.data.message);
         }

         toast.success("Signup Successful")
        navigate("/login")
        
    } catch (error) {

        console.log("SIGNUP API ERROR............", error);
        toast.error("COULD NOT SIGNUP ")
        
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
        
    })
}


export function login(
    email,
    password,
    navigate
){

      return(async (dispatch) => {

         const toastId = toast.loading("Loading...");
         dispatch(setLoading(true));

         try {

            const response = await apiConnector("POST" , LOGIN_API , {
                email,
                password,
            })

            console.log("LOGIN API RESPONSE .......",response);

            if(!response.data.success){

            throw new Error(response.data.message);
         }

         toast.success("Login Successful")
         console.log("jwtToken =>" , response.data.user.jwtToken);
           
         dispatch(setJwtToken(response.data?.user?.jwtToken));

         const userImage = response.data?.user?.image ? response.data.user.image :

           `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.user.lastName}`;

        dispatch(setUser({...response.data.user , image : userImage}));
        

        localStorage.setItem("jwtToken",JSON.stringify(response.data?.user?.jwtToken));
       
        localStorage.setItem("user",JSON.stringify(response.data.user));

         navigate("/dashboard/my-profile")


            
         } catch (error) {

            console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
            
         }

         dispatch(setLoading(false));
         toast.dismiss(toastId);

        
      })
   
}


export function resetPasswordToken(email ,setEmailSend){

    return async (dispatch) => {

        const toastId = toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            console.log("I am starting the function");
            const response = await apiConnector("POST" , RESETPASSTOKEN_API,{
                email:email,
            })

            console.log("RESETPASSWORDTOKENAPI......",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Email Send successful Check your Email")
            setEmailSend(true);
           

            
        } catch (error) {

            console.log(error);
            toast.error("Email Not sent something Problem ")
            
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    
    }

}


export function resetPassword(password,confirmPassword,token,navigate){
    return async (dispatch) => {

        const toastId = toast.loading("loading...");
        dispatch(setLoading(true));

        try {
            console.log("I am starting the function")
             const response = await apiConnector("POST",RESETPASSWORD_API,{
                password:password,
                confirmPassword:confirmPassword,
                token:token
             })

             console.log("RESETPASSWORD_API....",response);

             if(!response.data.success){
                throw new Error(response.data.message);
             }

             toast.success("Your password is reset Successfully");
             navigate("/login");


        } catch (error) {

            console.log(error);
            toast.error("Failed To Reset Password")
            
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
        
    }
}

export function logout(navigate){
    return (dispatch) =>{
        dispatch(setJwtToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    
    }

}

