import React from 'react';

const ResponsiveDashBar = () => {
    const dashboardRoutes = [
            {
                display:'Dashboard',
                path:'/dashboard',
                icon:<IoGridOutline></IoGridOutline>
            },
            {
            display:'Message',
            path:'/dashboard/message',
            icon:<LuMail></LuMail>
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
        {
            display:'Membership',
            path:'/dashboard/membership',
            icon:<IoBagHandle></IoBagHandle>
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
                display:'Favourites',
                path:'/dashboard/favourite-property',
                icon:<FiHeart></FiHeart>
            }
           
           
        ]
      
    
    return (
        <div className=' p-5'>
            
        </div>
    );
}

export default ResponsiveDashBar;
