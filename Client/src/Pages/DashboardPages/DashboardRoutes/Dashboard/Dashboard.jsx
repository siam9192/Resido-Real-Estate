import React, { useEffect, useState } from 'react';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import { LuFileSearch2 } from "react-icons/lu";
import { BsHouses } from "react-icons/bs";
import { TbHomeStats } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { LuBookmarkMinus } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import DivCard from '../../DashboardComponents/Divcard/DivCard';
import DashBoardLineChart from '../../DashboardComponents/Charts/LineChart';
import AxiosBase from '../../../../Axios/AxiosBase';
import { Helmet } from 'react-helmet';
const Dashboard = () => {
    const {user} = UserAuth();
    const [data,setData] = useState({})
    
    const showCards = [
        {
            name:'Total Post',
            value:data?.totalPost||0,
            icon:<BsHouses></BsHouses>
        },
        {
            name:'Total Pending',
            value:data?.pending||0,
            icon:<LuBookmarkMinus></LuBookmarkMinus>
        },
        {
            name:'Total Views',
            value:data?.viewTotal||0,
            icon:<IoEyeOutline></IoEyeOutline>
        },
         {
            name:'Total Favourite ',
            value:data?.favourite||0,
            icon:<FaRegHeart></FaRegHeart>
        },
    ]
    const viewsData = [{by:'Male',value:45},{by:'Female',value:30}]
    const viewsByAges = [{by:'18-30',value:30},{by:'31-45',value:55},{by:'46-80',value:15}]
    // https://hously-admin-next.vercel.app/
     useEffect(()=>{
       if(user){
        AxiosBase().get(`/dashboard/get-data/${user.email}`)
        .then(res =>{
            setData(res.data)
        })
       }
     },[user])
   
    return (
       <>
       <Helmet>
        <title>Dashboard || {user?.displayName}</title>
       </Helmet>
       <div className='md:p-5 p-2 font-jost'>
         <div className='space-y-2'>
         <h1 className='text-2xl font-semibold'>Hello,{user?.displayName.split(' ')[0]}</h1>
         <p className=' text-color_secondary font-semibold'>Welcome back!</p>
         </div>
         
         <div className='space-y-5 mt-5'>
          <div className='py-5 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-5 bg-white rounded-md'>
          {
            showCards.map((card,index)=>{
                return <div className='px-5 pt-5 pb-10 text-center bg-white  flex md:flex-row flex-col-reverse items-center justify-between ' key={index}>
                    <div className='space-y-2'>
                        <h1 className=' text-color_text_normal  text-xl'>{card.name}</h1>
                    <h1 className=' text-black md:text-4xl text-3xl font-semibold'>{card.value >= 1000? (card.value/1000).toFixed(2)+'K' : card.value}</h1>
                    </div>
                   <div className='lg:text-4xl text-4xl text-white p-4 bg-black  rounded-full'> {
                        card.icon
                    }
                  
                    </div>
                </div>
            })
           }
           <div className='px-5 pt-5 pb-10 text-center bg-white  hidden rounded-md border' >
                    <div className='space-y-2'>
                       <div className='w-full'>
                       <div className='w-[80%] h-44 border-[40px] border-black rounded-full bg-transparent'>
                        <div className='border-[10px] border-color_primary rounded-full h-full '></div>
                       </div>
                       </div>
                        <h1 className=' text-color_text_normal  font-semibold'>{showCards[0].name}</h1>
                        <h1 className=' text-black text-2xl font-semibold'>{showCards[0].value}</h1>
                    </div>
                  
                </div>
          </div>
          <div className='md:grid grid-cols-6 gap-5 lg:space-y-0 space-y-5'>
            <div className=' col-span-4 bg-white p-5  rounded-md'>
                <h1 className='text-xl text-color_text_normal font-semibold pb-5'>View Analytics</h1>
             <DashBoardLineChart></DashBoardLineChart>
            </div>
           <div className='col-span-2 p-5 bg-white  rounded-md'>
        
           <h1 className='text-xl text-color_text_normal font-semibold '>Views Data</h1>
           </div>
          </div>
         </div>
        </div>
       </>
    );
}

export default Dashboard;
