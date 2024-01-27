import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from '../Components/Reuse/Footer/Footer';


const Routes = () => {
   
    return (
        <div>
            
            <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
}

export default Routes;
