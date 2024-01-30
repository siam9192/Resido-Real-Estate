import React, { useContext, useState } from 'react';
import { TiThMenu } from "react-icons/ti";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { FiBell } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { NavbarHandlingContext } from '../../DashboardOutlet/DashboardOutlet';
const DashNavbar = () => {
    const {toggle,handleToggle} = useContext(NavbarHandlingContext);
   
    return (
        <div className='flex h-[80px] font-jost relative'>
            <div className='w-[30%] lg:block hidden  bg-dashboard_primary border-b p-2 lg:flex justify-between items-center '>
            <h1 className='text-5xl font-bold text-white'>Resido</h1>
            <div className='lg:hidden block'>
<HiOutlineMenuAlt3 className='text-4xl text-white'></HiOutlineMenuAlt3>
            </div>
            </div>
            <div className='w-full flex justify-between items-center px-5 shadow-lg'>
                <div className='text-black text-5xl lg:hidden hover:cursor-pointer' onClick={()=>handleToggle(!toggle)}>
                {
                toggle ? <RxCross1 ></RxCross1> : <HiOutlineMenuAlt3></HiOutlineMenuAlt3>
                }
                </div>
                <div className='lg:block hidden lg:flex items-center gap-2  border p-2 rounded-lg'>
                 <AiOutlineSearch></AiOutlineSearch> <input type="text" className='w-52 outline-none' placeholder='Search..' />
                </div>
                <div className='flex items-center gap-2'>
                    <div className='p-2 bg-gray-200 rounded-lg relative'>
                        <FiBell></FiBell>
                        <div className='w-2 h-2 rounded-full bg-color_danger absolute -top-0 -right-1'></div>
                    </div>
                    <img src={"https://resido-v2.smartdemowp.com/wp-content/uploads/2022/08/team-1.jpg"} alt="" className='w-8 h-8 rounded-lg'/>
                </div>
            </div>
        </div>
    );
}

export default DashNavbar;
