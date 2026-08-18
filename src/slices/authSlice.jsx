import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jwtToken: localStorage.getItem("jwtToken") ? JSON.parse(localStorage.getItem("jwtToken")) : null ,
    signupData : null,
    loading:false
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setJwtToken(state,value){
            state.jwtToken = value.payload;
        },

        setSignupData(state,value){
           state.signupData =value.payload;
        },

        setLoading(state,value){
            state.loading = value.payload;
        }
    }
})


export const { setJwtToken , setLoading ,setSignupData } = authSlice.actions;
export default authSlice.reducer