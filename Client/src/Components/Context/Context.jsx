import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResponsiveNavbar from '../HomeComponents/Navbars/ResponsiveNavbar';

export const NavBarContext = createContext('')
const Context = ({children}) => {
    const [isNavbar,setIsNavBar] = useState(false); 
  
    useEffect(()=>{
        setIsNavBar(false)
    },[])
    const handler = (value)=>{
        setIsNavBar(value)
    }
    return (
        <div>
         <NavBarContext.Provider value={[isNavbar,handler]}>
            {children}
            </NavBarContext.Provider>   
            <ResponsiveNavbar isResponsiveNavbar={isNavbar} handler={handler}></ResponsiveNavbar>
        </div>
    );
}

export default Context;
