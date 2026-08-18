import React from 'react'
import * as Icons from "react-icons/vsc"
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({iconName,link}) => {
   
    const Icon = Icons[iconName];
    const location = useLocation();

  const matchRoute = (route)=>{
    return matchPath({path:route}, location.pathname);
  }


  return (
    <NavLink to={link.path} 

    className={ ` flex justify-center item-center h-10  ${matchRoute(link.path) ? "bg-yellow-700 border-l-2 border-yellow-100 text-yellow-100" :"bg-opacity-0 text-richblack-500"}`}
    
    >
    

        <div className='flex gap-3 w-full items-center pl-5 h-[100%]'>
        <Icon className="text-xl"/>
        <span>{link.name}</span>

        </div>

    </NavLink>
  )
}

export default SidebarLink
