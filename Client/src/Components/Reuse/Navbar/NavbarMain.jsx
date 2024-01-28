import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import ResponsiveNavbar from './ResponsiveNavbar';
const NavbarMain = ({bg}) => {
    const [isResponsiveNavbar,setResponsive] = useState(false)
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

    const handler = (value)=>{
        setResponsive(value)
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
         <Link className='flex items-center gap-2 text-white'><img src="https://resido-v2.smartdemowp.com/wp-content/themes/resido/assets/images/submit.svg" alt="" className='w-5 text-white'/><h3>Add to property</h3></Link>
         <Link to='/sign-up'><button className=' bg-color_dark text-white py-4 bg-opacity-70 px-5 rounded-md flex items-center gap-2'><AiOutlineUser></AiOutlineUser><p>Sign in</p> </button></Link>
        </div>
        <div className='text-4xl text-white lg:hidden' onClick={()=> handler(true)}>
            <BiMenu></BiMenu>
        </div>
    </div>
    <div className='py-10 px-5 bg-white lg:hidden block'>
    <ul className='flex items-center gap-3 font-semibold mt-3 '>
            {
                navLinks.map((link,index)=>{
                   return <Link to={link.path} key={index}>{link.name}</Link>
                })
            }
        </ul>
    </div>
    {/* <ResponsiveNavbar isResponsiveNavbar={isResponsiveNavbar} handler={handler}></ResponsiveNavbar> */}
     </div>
    );
}

export default NavbarMain;
