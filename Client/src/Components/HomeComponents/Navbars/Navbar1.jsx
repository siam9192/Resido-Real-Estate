import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import ResponsiveNavbar from './ResponsiveNavbar';
import { RxCross1 } from 'react-icons/rx';
import { IoIosArrowDown } from "react-icons/io";
import UserAuth from '../../../Authentication/userAuth/userAuth';
const Navbar1 = ({bg}) => {
    const [toggle,setToggle] = useState(false);
    const {user,logout} = UserAuth();
    
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
     <div className={`border-b border-gray-500 px-10 ${bg?'bg-white' : 'bg-transparent'}`}>
           <div className='py-6 flex justify-between items-center font-pop '>
        
        <div className='flex items-center gap-6'>
        <div>
            <img src="https://resido-v2.smartdemowp.com/wp-content/themes/resido/assets/images/logo-light.svg" alt="" className='md:w-52 w-32' />
            
            <h1 className='text-3xl text-white'></h1>
        </div>
        <ul className='lg:flex items-center gap-3 text-white font-semibold mt-3 lg:block hidden'>
            {
                navLinks.map((link,index)=>{
                   return <Link to={link.path}>{link.name}</Link>
                })
            }
        </ul>
        </div>
        <div className='lg:flex items-center justify-between gap-3 lg:block hidden'>
         <Link to={'/dashboard'} className='flex items-center gap-2 text-white'><img src="https://resido-v2.smartdemowp.com/wp-content/themes/resido/assets/images/submit.svg" alt="" className='w-5 text-white'/><h3>Add to property</h3></Link>
         {
            !user ?<Link to={'/sign-in'}><button className=' bg-color_dark text-white px-8 py-2 w-fit rounded-md'>Sign In</button></Link>
            :
         <div className='flex items-center gap-3 text-white'>
<Link to={'/dashboard'}>

<button className='px-6 py-3 bg-color_text_normal text-white rounded-lg'>Dashboard</button>
          </Link>
         </div>
          }
        </div>
        <div className='text-4xl text-white lg:hidden hover:cursor-pointer' onClick={handleToggle}>
        {
            toggle ? <RxCross1 className={`transition-all ease-in duration-300 -rotate-180`}></RxCross1> :  <BiMenu className={`transition-all duration-500 -rotate-180 `}></BiMenu>
           }
        </div>
    </div>
    <div className={`${toggle ? 'max-h-[600px]' : 'max-h-0'} overflow-hidden transition-all ease-in duration-500 lg:hidden block z-50`}>
  <div className='p-10 rounded-md lg:hidden block  w-full  text-white shadow-lg font-jost'>
   <ul className='flex flex-col  text-xl gap-2'>
   {
                navLinks.map((link,index)=>{
                   return <Link to={link.path} key={index}>{link.name}</Link>
                })
                
            }
            <Link to={'/dashboard'}>Add to Property</Link>
          {
            !user ?<Link to={'/sign-in'}><button className=' bg-color_dark text-white px-8 py-3 w-fit rounded-md'>Sign In</button></Link>
            :
            <>
          <Link to={'/dashboard'}>  <button className='py-2 px-6 bg-color_text_normal text-white rounded-md'>Dashboard</button>
            </Link>
            <button onClick={logout} className=' bg-color_danger text-white px-6 py-2 rounded-md'>Logout</button>
            </>
          }
   </ul>
    </div>
  </div>
    
     </div>
    );
}

export default Navbar1;
