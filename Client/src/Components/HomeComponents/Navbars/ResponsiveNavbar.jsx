import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ResponsiveNavbar = ({isResponsiveNavbar,handler}) => {
    const [tabIndex,setTabIndex] = useState(0);
    const componentRef = useRef();
    const tabs = ['Home','Account','Setting'];
    const navLinks = [{    display:'Home',  routes:'/'},{    display:'Shop',  routes:'/ego/shop'},{    display:'New Arrivals',  routes:'/ego/new-arrivals'},{    display:'Contact Us',  routes:'/contact'},{    display:'About us',  routes:'/about'},{    display:'Add Product',  routes:'/add-product'}]
    const accounts = [{    display:'Sign in',  routes:'/ego/account/sign-in'},{    display:'Register',  routes:'/ego/account/register'},{  display:'Profile',  routes:'/ego/profile'}]
    
    const handleOutsideClick = (event) => {
        if (componentRef.current && !componentRef.current.contains(event.target)) {
          // Click occurred outside the component, close it
         handler(false)
        }
      };
    
      useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleOutsideClick);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);
   
    return (
        <div className={`w-full h-full bg-gray-600 bg-opacity-25 fixed top-0 z-40 ${!isResponsiveNavbar ? '-left-[200%]' : 'left-0'} transition-all duration-200 `}>
            <div className='min-w-[300px] max-w-[300px] bg-white opacity-100 h-full z-50 p-5 font-rubik transition-all duration-300' ref={componentRef}>
        <div className='flex justify-between items-center text-black font-semibold pb-3 border-b'>
            {
                tabs.map((tab,index)=> <button className={`${tabIndex === index ? 'border-b-2 border-black':''} h-full`} key={index} onClick={()=>setTabIndex(index)}>{tab}</button>)
            }

        </div>
        <div className='py-4 space-y-3 flex flex-col'>
          {
            tabIndex === 0 &&
            
                navLinks.map((nav,index)=>{
            return <Link to={nav.routes} className='hover:text-[#ff2424]' key={index}>{nav.display}</Link>
                })
            ||
            tabIndex === 1 &&
           accounts.map((nav,index)=>{
                return <Link to={nav.routes} key={index}>{nav.display}</Link>
                    })
          }
        </div>
            </div>
        </div>
    );
}

export default ResponsiveNavbar;
