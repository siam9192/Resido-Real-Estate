import React from 'react';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import { BsCurrencyDollar } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { LuFileSearch2 } from "react-icons/lu";
import { BsHouses } from "react-icons/bs";
import { TbHomeSearch } from "react-icons/tb";
import { TbHomeStats } from "react-icons/tb";
import DivCard from '../../DashboardComponents/Divcard/DivCard';
const Dashboard = () => {
    const {user} = UserAuth();
    const showCards = [
        {
            name:'Total Post',
            value:230,
            icon:<BsHouses></BsHouses>
        },
        {
            name:'Total Visitor',
            value:230,
            icon:<HiUserGroup></HiUserGroup>
        },
        {
            name:'Total Reviews',
            value:230,
            icon:<LuFileSearch2></LuFileSearch2>
        },
         {
            name:'Active Properties',
            value:230,
            icon:<TbHomeStats></TbHomeStats>
        },
    ]
    // https://hously-admin-next.vercel.app/
    return (
        <div className='p-5 font-jost'>
         <div className='space-y-2'>
         <h1 className='text-2xl font-semibold'>Hello,{user?.displayName.split(' ')[0]}</h1>
         <p className=' text-color_secondary font-semibold'>Welcome back!</p>
         </div>
         <div className='space-y-10'>
          <div className='py-10 grid lg:grid-cols-4 grid-cols-2 gap-5'>
          {
            showCards.map((card,index)=>{
                return <div className='px-5 pt-5 pb-10 bg-white shadow-md flex items-center justify-between rounded-md border'>
                    <div className='space-y-2'>
                        <h1 className=' text-color_text_normal  font-semibold'>{card.name}</h1>
                        <h1 className=' text-black text-2xl font-semibold'>{card.value}</h1>
                    </div>
                   <div className='text-4xl text-color_primary p-2 bg-gray-100 rounded-md'> {
                        card.icon
                    }</div>
                </div>
            })
           }
          </div>
          <div className='md:grid grid-cols-6 gap-5'>
            <div className=' col-span-4 bg-white p-10 shadow-md rounded-md'>

            </div>
           <div className='grid col-span-2 '>
           <DivCard>
                
                </DivCard>
           </div>
          </div>
         </div>
        </div>
    );
}

export default Dashboard;
