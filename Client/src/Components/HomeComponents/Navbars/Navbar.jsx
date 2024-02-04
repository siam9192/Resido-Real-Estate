import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { LuMinus } from "react-icons/lu";
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import UserAuth from '../../../Authentication/userAuth/userAuth';
const Navbar = ({isNavbar}) => {
    const {user} = UserAuth()
    const navLinks = [
        {
            name:'Home',path:'/'
        },
        {
            name:'Listings',path:'/listings'
        },
        {
            name:'Agencies and Agents',path:'/features'
        }
    ]
   

    return (
     <div className={`borde border-gray-200 lg:px-0 px-2 fixed transition-all ease-in-out duration-300  ${isNavbar ? 'top-0' :'-top-[200%]'} shadow-md lg:block hidden w-full bg-white z-40`}>
          <WidthContainer>
          <div className='py-6 lg:flex justify-between items-center font-jost '>
        
        <div className='flex items-center gap-6'>
        <div>
            <img src="https://resido-v2.smartdemowp.com/wp-content/themes/resido/assets/images/logo.svg" alt="" className='md:w-52 w-32' />
            
            <h1 className='text-3xl '></h1>
        </div>
        <ul className='lg:flex items-center gap-3 font-semibold mt-3 lg:block hidden'>
            {
                navLinks.map((link,index)=>{
                   return <Link to={link.path}>{link.name}</Link>
                })
            }
        </ul>
        </div>
        <div className='lg:flex items-center justify-between gap-3 lg:block hidden'>
         <Link to={'/dashboard'} className='flex items-center gap-2 text-black'><img src="https://resido-v2.smartdemowp.com/wp-content/themes/resido/assets/images/submit.svg" alt="" className='w-5 text-white'/><h3>Add to property</h3></Link>
         {
            !user ?<Link to={'/sign-in'}><button className=' bg-color_dark text-white px-8 py-2 w-fit rounded-md'>Sign In</button></Link>
            :
         <div className='flex items-center gap-3 text-white'>
{/*            
               <div className='py-3 px-5 text-xl bg-black text-white font-bold rounded-full border-info'>
                {user.displayName[0].toUpperCase()}
            </div> */}
            <button className='px-6 py-3 bg-color_text_normal text-white rounded-lg'>Dashboard</button>
           {/* <div className='text-xl '>
           <IoIosArrowDown ></IoIosArrowDown>
           
           </div> */}
         </div>
          }
        </div>
        
    </div>
  
          </WidthContainer>
     </div>
    );
}

export default Navbar;
