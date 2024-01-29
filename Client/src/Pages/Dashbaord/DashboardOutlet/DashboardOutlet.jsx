import React from 'react';
import { Outlet } from 'react-router-dom';
import DashNavbar from '../../DashboardPages/DashboardComponents/DashNavbar/DashNavbar';

const DashboardOutlet = () => {
    return (
        <div>
            
            <DashNavbar></DashNavbar>
            <Outlet></Outlet>
        </div>
    );
}

export default DashboardOutlet;
