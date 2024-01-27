import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { LuMinus } from "react-icons/lu";
const Navbar2 = ({isNavbar}) => {
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
     <div className={`border border-gray-200 px-10 ${isNavbar ? 'hidden' : 'block'}`}>
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
        <div className='text-4xl text-black lg:hidden'>
            <BiMenu></BiMenu>
        </div>
    </div>
     </div>
    );
}

export default Navbar2;
