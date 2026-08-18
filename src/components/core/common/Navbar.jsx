import React, { useEffect, useState } from 'react'
import logo from '../../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLinks } from '../../../data/navbar-links'
import { useSelector } from 'react-redux'
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import ProfileDropDown from '../Auth/ProfileDropDown'
import { IoIosArrowDropdown } from "react-icons/io";
import { apiConnector } from '../../../services/apiConnector'
import { categories } from '../../../services/apis'

const Navbar = () => {


  const {jwtToken} = useSelector((state) => state.auth);
  const {user} =useSelector((state)=> state.profile);
  const {totalItems}  = useSelector((state)=>state.cart);

 

  const [subLink , setSubLink] = useState([]);

  const fetchSubLink = async () => {

    try {

      const result = await apiConnector("GET" , categories.CATEGORIES_API);

      console.log("HERE YOUR DATA FETCH" , result);

      setSubLink(result?.data?.data);
      console.log(subLink);
      
    } catch (error) {
       console.log("Could not fetch the category list");
    }
    
  }

  useEffect(()=>{
      fetchSubLink();
  },[])

  console.log("sublenk=>",subLink.length)

   const location = useLocation();

   function matchRoute(route){

    return matchPath({path:route} , location.pathname);

   }

  return (
    <div className='flex w-11/12 h-14 border-b border-richblack-700 items-center justify-between'>
      <div>
      <Link to={'/'}>
         <img src={logo} width='160px'  height = '10px' alt='logo'  ></img>
      </Link>
      </div>

      <div>
        
        <ul className='flex space-x-3'>
           
        {
         
         NavbarLinks.map((link,index) =>(

          <li key={index}>
             
        {
          link.title === 'Catalog' ? (<div className='text-white flex items-center gap-1 group relative cursor-pointer hover:text-yellow-25'>
            <p>{link.title}</p>
            <IoIosArrowDropdown/>
            <div className=' invisible absolute w-[250px]  bg-richblack-25 translate-y-[60%] left-[-90%] transition-all duration-200 z-10 group-hover:visible' >
              <div className='absolute w-[40px] h-[40px] rotate-45 bg-richblack-25 translate-x-[255%] -z-10 '></div>
               
               {
                subLink.length > 0 ? (subLink.map((data,index) => (
                  <div  key = {index} className='flex flex-col gap-2 ml-2 w-[300px] text-richblack-700'>
                   <Link to={`/catalog/${data?.name.split(" ")
                                    .join("-")
                                    .toLowerCase()}`} className='flex flex-col p-3 w-[300px] font-semibold'>
                    <p className='uppercase'>{data?.name}</p>
                   </Link>
                  </div>
                 
                ))):(<div></div>)
               }
            </div>
            
          </div>) : (<div>
            <Link to={link?.path}>
              <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-white"}`}>{link.title}</p>

            </Link>
          </div> )
        }

          </li>

        

         ))
     

        }
        </ul>
        
      </div>


      <div className='flex space-x-3'>
       
        {user && user?.accountType !== "Instructor" && (
          <Link to={'/dashboard/cart'} className='relative'>
          <PiShoppingCartSimpleBold className='text-white mt-2'/>

          {totalItems > 0 && (
          <span className='text-white bg-pink-300 rounded-2xl px-1 absolute bottom-3  text-[10px] left-2 ' >{totalItems}</span>)} 
          
          </Link>
        )}


        {
          jwtToken === null && (
            <Link to={"/login"}>
              <button className={ `flex items-center bg-richblack-800 border border-richblack-700 rounded-md p-2 ${location.pathname === '/login' ? 'text-yellow-100' : 'text-richblack-100' } px-3 hover:scale-105` }>
                Log In
              </button>
            </Link>
          )
        }

        {
          jwtToken === null && (
            <Link to={"/signup"}>
              <button className={ `flex items-center bg-richblack-800 border border-richblack-700 rounded-md p-2  ${location.pathname === '/signup' ? 'text-yellow-100' :' text-richblack-100'} px-3 hover:scale-105` }>
               Signup
              </button>
            </Link>
          )
        }

        {jwtToken != null && (
        <ProfileDropDown/>
        )}

      </div>

      
       


    </div>
  )
}

export default Navbar
