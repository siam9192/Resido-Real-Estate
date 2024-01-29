import React, { useState } from 'react';
import { CgArrowsExpandDownLeft } from "react-icons/cg";
import { BiSolidHomeSmile } from "react-icons/bi"
import { MdAddHomeWork } from "react-icons/md";
import { BiSolidHomeHeart } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
const DashSideBar = () => {
    const [activeRoute,setActiveRoute] = useState(0);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const dashboardRoutes = [
    {
        display:'Dashboard',
        path:'/dashboard',
        icon:<CgArrowsExpandDownLeft></CgArrowsExpandDownLeft>
    },
    {
        display:'My Properties',
        path:'/dashboard/my-properties',
        icon:<BiSolidHomeSmile></BiSolidHomeSmile>
    },
    {
        display:'Add Property',
        path:'/dashboard/add-property',
        icon:<BiSolidHomeHeart></BiSolidHomeHeart>
    },
    {
        display:'Chat',
        path:'/dashboard/chat',
        icon:<BsChat></BsChat>
    },
    {
        display:'Profile',
        path:'/dashboard/profile',
        icon:<FaUserEdit></FaUserEdit>
    },
    {
        display:'Account Setting',
        path:'/dashboard/account-setting',
        icon:<FaUserCog></FaUserCog>
    },
    ]


    const handleActiveRoutes = (index)=>{
    setActiveRoute(index)
    }
    const handleNavigation = (path)=>{
        navigate(path)
    }
    return (
        <div className='h-full bg-dashboard_primary  py-5  font-jost'>
           <div className='space-y-5'>
            {
                dashboardRoutes.map((item,index)=>{
                    return <div className='relative hover:cursor-pointer' onClick={()=> handleNavigation(item.path)} key={index}>
                        <div className='flex items-center gap-2 text-dashboard_text_primary text-xl font-semibold px-10 py-5 '>
                        {item.icon} <h3>{item.display}</h3>
                    </div>
                    <div className='w-5 h-full bg-white absolute top-0 -left-3 rounded-r-lg' style={{display: pathname === item.path ? 'block' : 'none' }}></div>
                    </div>
                })
            }
           </div>
            
        </div>
    );
}

export default DashSideBar;
