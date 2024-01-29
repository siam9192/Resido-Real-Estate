import React from 'react';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import { BsCurrencyDollar } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { LuFileSearch2 } from "react-icons/lu";
import { BsHouses } from "react-icons/bs";
import { TbHomeSearch } from "react-icons/tb";
import { TbHomeStats } from "react-icons/tb";
import DivCard from '../../DashboardComponents/Divcard/DivCard';
import DashBoardLineChart from '../../DashboardComponents/Charts/LineChart';
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
            value:50000,
            icon:<HiUserGroup></HiUserGroup>
        },
        {
            name:'Total Reviews',
            value:6300,
            icon:<LuFileSearch2></LuFileSearch2>
        },
         {
            name:'Active Properties',
            value:60,
            icon:<TbHomeStats></TbHomeStats>
        },
    ]
    const viewsData = [{by:'Male',value:45},{by:'Female',value:30}]
    const viewsByAges = [{by:'18-30',value:30},{by:'31-45',value:55},{by:'46-80',value:15}]
    // https://hously-admin-next.vercel.app/
    return (
        <div className='p-5 font-jost'>
         <div className='space-y-2'>
         <h1 className='text-2xl font-semibold'>Hello,{user?.displayName.split(' ')[0]}</h1>
         <p className=' text-color_secondary font-semibold'>Welcome back!</p>
         </div>
         <div className='space-y-5'>
          <div className='py-5 grid lg:grid-cols-4 grid-cols-2 gap-5'>
          {
            showCards.map((card,index)=>{
                return <div className='px-5 pt-5 pb-10 text-center bg-white shadow-md flex md:flex-row flex-col-reverse items-center justify-between rounded-md border'>
                    <div className='space-y-2'>
                        <h1 className=' text-color_text_normal  font-semibold'>{card.name}</h1>
                        <h1 className=' text-black text-2xl font-semibold'>{card.value}</h1>
                    </div>
                   <div className='lg:text-4xl text-6xl text-color_primary p-2 bg-gray-100 rounded-md'> {
                        card.icon
                    }</div>
                </div>
            })
           }
          </div>
          <div className='md:grid grid-cols-6 gap-5 space-y-5'>
            <div className=' col-span-4 bg-white p-5 shadow-md rounded-md'>
                <h1 className='text-xl text-color_text_normal font-semibold pb-5'>View Analytics</h1>
             <DashBoardLineChart></DashBoardLineChart>
            </div>
           <div className='col-span-2 p-5 bg-white shadow-md rounded-md'>
        
           <h1 className='text-xl text-color_text_normal font-semibold '>Views Data</h1>
           
           <div className='pt-3 space-y-2'>
           <h2 className=' font-semibold text-black pb-1'>Gender</h2>
            {
                viewsData.map((item,index)=>{
                    return <div className='space-y-2'>
                       <div className='flex justify-between items-center'> <h1 className=' text-color_secondary'>{item.by}</h1> <h3 className='text-black'>{item.value}%</h3></div>
                        <div className='bg-gray-200 rounded-full'>
                            <div className=' bg-color_primary rounded-r-full py-1 rounded-full' style={{width:`${item.value}%`}}></div>
                        </div>
                    </div>
                })
            }
           </div>
           <div className='pt-3 space-y-2'>
           <h2 className=' font-semibold text-black pb-1'>Age</h2>
            {
                viewsByAges.map((item,index)=>{
                    return <div className='space-y-2'>
                       <div className='flex justify-between items-center'> <h1 className=' text-color_secondary'>{item.by}</h1> <h3 className='text-black'>{item.value}%</h3></div>
                        <div className='bg-gray-200 rounded-full'>
                            <div className=' bg-color_primary rounded-r-full py-1 rounded-full' style={{width:`${item.value}%`}}></div>
                        </div>
                    </div>
                })
            }
           </div>
           </div>
          </div>
         </div>
        </div>
    );
}

export default Dashboard;
