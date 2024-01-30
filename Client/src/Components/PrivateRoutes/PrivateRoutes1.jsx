import React from 'react';
import UserAuth from '../../Authentication/userAuth/userAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { IoGameController } from 'react-icons/io5';

const PrivateRoutes1 = ({children}) => {
    const {user,loading} = UserAuth();
    const {pathname,state} = useLocation();
  
    if(user){
    return children
    }
     if(loading){
     return   <div className='flex  justify-center py-72 text-5xl'>
<span className="loading loading-infinity loading-lg text-color_danger"></span>
        </div>
    }
  
    if(!loading && !user){
    return <Navigate to={'/sign-in'} state={pathname} replace></Navigate>
    }
  
}

export default PrivateRoutes1;
