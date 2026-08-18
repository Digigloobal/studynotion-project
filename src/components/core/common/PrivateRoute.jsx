import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
     
    const {jwtToken} = useSelector((state)=>state.auth);

    if(jwtToken != null){
        return children;
    }else{

        return <Navigate to={"/login"}/>

    }

  
}

export default PrivateRoute
