import React from 'react';
import { Outlet } from 'react-router-dom';
import DashNavbar from '../DashboardComponents/DashNavbar/DashNavbar';
import DashSideBar from '../DashboardComponents/DashSideBar/DashSideBar';
// lg:static absolute -left-[200%]

const DashboardOutlet = () => {
    // const [toggle,setToggle] = useState(false)
    return (
        <div>
              <DashNavbar></DashNavbar>
          <div className='flex min-h-[100vh] relative'>
            <div className={` lg:w-[30%] lg:max-w-[30%]  max-w-0 min-w-0  overflow-hidden transition-all duration-500 ease-in`}>
            <DashSideBar></DashSideBar>
            </div>
            <div className='w-full bg-color_bg_green max-h-[95vh] overflow-scroll'>
                <Outlet></Outlet>
            </div>
          </div>
        </div>
    );
}

export default DashboardOutlet;
