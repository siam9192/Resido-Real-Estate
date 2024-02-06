import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashNavbar from '../DashboardComponents/DashNavbar/DashNavbar';
import DashSideBar from '../DashboardComponents/DashSideBar/DashSideBar';
import './Dashboard.css'
// lg:static absolute -left-[200%]
export const NavbarHandlingContext = createContext('')
const DashboardOutlet = () => {
    const [toggle,setToggle] = useState(false);
    const {pathname} = useLocation();
    const handleToggle = (value)=>{
        setToggle(value)
    }

    useEffect(()=>{
      setToggle(false)
    },[pathname])

    useEffect(()=>{
      window.addEventListener('scroll',handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  },[])

  const handleScroll = ()=>{
    if(toggle){
    window.scrollTo(0,0)
    } 
 }
    return (
        <div>
        <NavbarHandlingContext.Provider value={{toggle,handleToggle}}>
    
          <div className='flex min-h-[100vh] relative overflow-hidden'>
            <div className={` lg:w-[30%] lg:max-w-[30%]  ${toggle? 'lg:w-[30%] w-[80%] max-w-[90%] sticky top-0': 'max-w-0 min-w-0  '} overflow-hidden transition-all duration-500 ease-in`}>
            <DashSideBar></DashSideBar>
            </div>
            <div className={`w-full ${toggle ? 'lg:-mr-0 -mr-[200%]' : '-mr-0'} overflow-x-hidden bg-color_bg_green lg:max-h-[95vh] overflow-y-auto transition-all ease-out duration-300 `}>
            <DashNavbar></DashNavbar>
                <Outlet></Outlet>
            </div>
          </div>
        </NavbarHandlingContext.Provider>
        </div>
    );
}

export default DashboardOutlet;
