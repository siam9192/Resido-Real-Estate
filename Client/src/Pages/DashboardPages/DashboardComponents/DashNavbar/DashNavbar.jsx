import React, { useContext, useState } from 'react';
import { TiThMenu } from "react-icons/ti";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import { FiBell } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { NavbarHandlingContext } from '../../DashboardOutlet/DashboardOutlet';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import { Link } from 'react-router-dom';
const DashNavbar = () => {
    const {toggle,handleToggle} = useContext(NavbarHandlingContext);
    const [isNotificationBar,setNotificationBar] = useState(false)
    const{user} = UserAuth();

    const handleNotificationBar = ()=>{
        setNotificationBar(!isNotificationBar)
    }
    const notifications = [
        "New message received",
        "Reminder: Meeting at 2 PM",
        "Update: Your package has been shipped",
        "Weather alert: Heavy rain expected",
        "Congratulations! You've earned a badge"
      ];
      
  
      
    return (
        <div className='flex font-jost sticky top-0 bg-color_bg_green'>
           
            <div className='w-full flex justify-between items-center px-5 py-7'>
                <div className='text-black text-5xl lg:hidden hover:cursor-pointer' onClick={()=>handleToggle(!toggle)}>
                {
                toggle ? <RxCross1 ></RxCross1> : <HiOutlineMenuAlt3></HiOutlineMenuAlt3>
                }
                </div>
                {/* <div className='lg:block hidden lg:flex items-center gap-2  border border-gray-700 p-2 rounded-lg' >
                 <AiOutlineSearch></AiOutlineSearch> <input type="text" className='w-60   bg-transparent outline-none' placeholder='Search..' />
                </div>
                <div className='flex items-center gap-2' onClick={handleNotificationBar}>
                    <div className='p-2 bg-gray-200 rounded-lg relative text-3xl text-black'>
                        <FiBell></FiBell>
                        <div className='w-2 h-2 rounded-full bg-color_danger absolute -top-0 -right-1'></div>
                      
                    </div>
                    <img src={user?.photoURL} alt="" className='w-14 h-14 rounded-lg'/>
                </div>
                <div className={`p-5 space-y-3 bg-white absolute top-24 right-20 z-10 shadow-md rounded-lg ${isNotificationBar? 'block' : 'hidden'}`} onMouseEnter={handleNotificationBar} >
                            {
                                notifications.map((notification,index)=>{
                                    return <div className=' text-[14px] flex items-center gap-2 hover:text-color_primary ' key={index} > <div className='w-2 h-2 rounded-full bg-black '></div><Link >{notification}</Link></div>
                                })
                            }

                        </div> */}
            </div>
        </div>
    );
}

export default DashNavbar;
