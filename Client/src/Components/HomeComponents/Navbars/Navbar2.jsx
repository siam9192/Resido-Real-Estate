import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { LuMinus } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import ResponsiveNavbar from './ResponsiveNavbar';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
const Navbar2 = ({isNavbar}) => {
    const [isResponsive,setResponsive] = useState(false);
    const [toggle,setToggle] = useState(false);
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
    useEffect(()=>{
        const handleScroll = ()=>{
          setToggle(false)
          }
        window.addEventListener('scroll',handleScroll)
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
        },[scrollY])
    const handleToggle = ()=>{
        setToggle(!toggle)
    }
    return (
        <>
     <div className={`border border-gray-200 px-10 ${isNavbar ? 'hidden' : 'block'} bg-white`}>
         <WidthContainer>
         <div className='py-6 flex justify-between items-center font-jost '>
        
        <div className='flex items-center gap-6'>
        <div>
            <img src="https://resido-v2.smartdemowp.com/wp-content/themes/resido/assets/images/logo.svg" alt="" className='md:w-52 w-32' />
            
            <h1 className='text-3xl '></h1>
        </div>
        <ul className='lg:flex items-center gap-3 font-semibold mt-3 lg:block hidden'>
            {
                navLinks.map((link,index)=>{
                   return <Link to={link.path} key={index}>{link.name}</Link>
                })
            }
        </ul>
        </div>
        <div className='lg:flex items-center justify-between gap-3 lg:block hidden'>
         <Link className='flex items-center gap-2 text-color_primary font-semibold'><img src="https://resido-v2.smartdemowp.com/wp-content/themes/resido/assets/images/submit.svg" alt="" className='w-5 text-white'/><h3>Add to property</h3></Link>
         <button className=' bg-color_dark text-white py-4 bg-opacity-70 px-5 rounded-md flex items-center gap-2'><AiOutlineUser></AiOutlineUser><p>Sign in</p> </button>
        </div>
        <div className='text-4xl text-black lg:hidden hover:cursor-pointer ' onClick={handleToggle}>
           {
            toggle ? <RxCross1 className={`transition-all ease-in duration-300 -rotate-180`}></RxCross1> :  <BiMenu className={`transition-all duration-500 -rotate-180`}></BiMenu>
           }
        </div>
    </div>
  
         </WidthContainer>
     </div>
  <div className={`${toggle ? 'max-h-[600px]' : 'max-h-0'} overflow-hidden   transition-all ease-in duration-500 lg:hidden block`}>
  <div className='p-10 rounded-md lg:none block mx-5 mb-5 bg-whit  bg-color_primary text-white shadow-lg  font-jost'>
   <ul className='flex flex-col  text-xl gap-2'>
   {
                navLinks.map((link,index)=>{
                   return <Link to={link.path} key={index}>{link.name}</Link>
                })
                
            }
            <Link>Add to Property</Link>
           <Link to={'/sign-in'}><button className=' bg-color_dark text-white px-8 py-2 w-fit rounded-md '>Sign In</button></Link>
   </ul>
    </div>
  </div>
       </>
    );
}

export default Navbar2;
