import React from 'react';
import { Outlet } from 'react-router-dom';
import DashNavbar from '../DashboardComponents/DashNavbar/DashNavbar';
import DashSideBar from '../DashboardComponents/DashSideBar/DashSideBar';

const DashboardOutlet = () => {
    return (
        <div>
              <DashNavbar></DashNavbar>
          <div className='flex min-h-[100vh]'>
            <div className='w-[30%]'>
            <DashSideBar></DashSideBar>
            </div>
            <div className='w-full bg-color_bg_green'>
                <Outlet></Outlet>
            </div>
          </div>
        </div>
    );
}

export default DashboardOutlet;
