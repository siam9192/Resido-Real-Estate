import React, { useContext, useState } from 'react';
import { CgArrowsExpandDownLeft } from "react-icons/cg";
import { BiSolidHomeSmile } from "react-icons/bi"
import { MdAddHomeWork } from "react-icons/md";
import { BiSolidHomeHeart } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoBagHandle } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';
import { NavbarHandlingContext } from '../../DashboardOutlet/DashboardOutlet';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { LuMail } from "react-icons/lu";
import { IoGridOutline } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
const DashSideBar = () => {
    const [activeRoute,setActiveRoute] = useState(0);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {toggle,handleToggle} = useContext(NavbarHandlingContext);
    // https://html.creativegigstf.com/homy/homy/dashboard/favourites.html
    // https://griya.dexignzone.com/react/demo/login
    // https://hously-admin-next.vercel.app/
    const {logout} = UserAuth()
    const dashboardRoutes = {
    dashboard:[
        {
            display:'Dashboard',
            path:'/dashboard',
            icon:<IoGridOutline></IoGridOutline>
        },
        {
        display:'Message',
        path:'/dashboard/message',
        icon:<LuMail></LuMail>
        }

    ],

  
profile:[
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
    {
        display:'Membership',
        path:'/dashboard/membership',
        icon:<IoBagHandle></IoBagHandle>
    }
    
]
  ,
    
  
    listing:[
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
            display:'Favourites',
            path:'/dashboard/favourite-property',
            icon:<FiHeart></FiHeart>
        },
       
       
    ]
  
}
    


    const handleActiveRoutes = (index)=>{
    setActiveRoute(index)
    }
    const handleNavigation = (path)=>{
        navigate(path)
    }
    return (
        <div className='bg-white h-[100vh] overflow-y-scroll  py-3  font-jost '>
            <div className='    border-b py-2 px-10 lg:flex justify-between items-center '>
            <h1 className='text-5xl font-bold text-black'>Resido</h1>
            <div className='lg:hidden block'>
<HiOutlineMenuAlt3 className='text-4xl text-white'></HiOutlineMenuAlt3>
            </div>
            </div>
           {/* <div className='space-y-5'>
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
              <div className='flex items-center gap-2 text-dashboard_text_primary text-xl font-semibold px-10 py-5  hover:cursor-pointer' onClick={logout}>
                     <FiLogOut></FiLogOut> <h3>{'Log out'}</h3>
                    </div>
                    
           </div> */}

           <div className='space-y-5 py-5'>
            <div className='py-5'>
             {
            dashboardRoutes.dashboard.map((item,index)=>{
              return  <div  className='px-10 'key={index}>
                <div className={`flex items-center gap-2 py-3 px-4 rounded-lg ${item.path === pathname ? 'bg-color_primary text-white' : 'text-black'} text-xl font-semibold hover:cursor-pointer`} onClick={()=> handleNavigation(item.path)}  >
                        {item.icon} <h3>{item.display}</h3>
                        </div>
              </div>
            })
             }
            </div>
            <div className='py-5 border-t'>
             <div className='px-10'>
             <h2 className='text-gray-700 py-5 font-semibold'>Profile</h2>
             </div>
             {
            dashboardRoutes.profile.map((item,index)=>{
              return  <div  className='px-10 'key={index}>
                <div className={`flex items-center gap-2 py-3 px-4 rounded-lg ${item.path === pathname ? 'bg-color_primary text-white' : 'text-black'} text-xl font-semibold hover:cursor-pointer`} onClick={()=> handleNavigation(item.path)}  >
                        {item.icon} <h3>{item.display}</h3>
                        </div>
              </div>
            })
             }
            </div>
            <div className='py-5 border-t'>
             <div className='px-10'>
             <h2 className='text-gray-700 py-5 font-semibold'>Listing</h2>
             </div>
             {
            dashboardRoutes.listing.map((item,index)=>{
              return  <div  className='px-10 'key={index}>
                <div className={`flex items-center gap-2 py-3 px-4 rounded-lg  ${item.path === pathname ? 'bg-color_primary text-white' : 'text-black'} text-xl font-semibold hover:cursor-pointer`} onClick={()=> handleNavigation(item.path)}  >
                        {item.icon} <h3>{item.display}</h3>
                        </div>
              </div>
            })
             }
               
              <div  className='px-10 '>
                <div className={`flex items-center gap-2 py-3 px-4 rounded-lg  text-black text-xl  hover:cursor-pointer`} onClick={()=> logout()}  >
                        <BiLogOutCircle></BiLogOutCircle> <h3>Logout</h3>
                        </div>
            </div>
            </div>

           
           </div>
            
        </div>
    );
}

export default DashSideBar;
