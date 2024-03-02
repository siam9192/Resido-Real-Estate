import React from 'react';
import { BsHouses } from "react-icons/bs";
import { TbHomeStats } from "react-icons/tb";
import { LuBookmarkMinus } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaList,FaStar} from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
const DashboardMessage = () => {
    return (
        <div className=' bg-white shadow-xl font-pop p-5'>
        <h1 className='text-black text-2xl '>Message</h1>
           <div className='pt-10 space-y-4'>
           <div className='flex justify-between items-center '>
               <div className='flex items-center gap-3'>
                   <img src="/images/agents/1.jpg" alt=""  className='w-20 h-20 rounded-full'/>
                   <div className='space-y-2'>
                       <h2 className='text-xl text-black'>Marry Smith</h2>
                       <h2>22 Minutes ago</h2>
                       <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores aut sed quaerat repellat quos aliquid at repudiandae placeat iste cum.</p>
                   </div>
               </div>
               <div className='flex items-center gap-2 text-gray-600 text-xl'>
                   <IoEyeOutline></IoEyeOutline> <MdDelete></MdDelete>
               </div>
           </div>
           <div className='flex justify-between items-center '>
               <div className='flex items-center gap-3'>
                   <img src="/images/agents/1.jpg" alt=""  className='w-20 h-20 rounded-full'/>
                   <div className='space-y-2'>
                       <h2 className='text-xl text-black'>Marry Smith</h2>
                       <h2>22 Minutes ago</h2>
                       <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores aut sed quaerat repellat quos aliquid at repudiandae placeat iste cum.</p>
                   </div>
               </div>
               <div className='flex items-center gap-2 text-gray-600 text-xl'>
                   <IoEyeOutline></IoEyeOutline> <MdDelete></MdDelete>
               </div>
           </div>
           <div className='flex justify-between items-center '>
               <div className='flex items-center gap-3'>
                   <img src="/images/agents/1.jpg" alt=""  className='w-20 h-20 rounded-full'/>
                   <div className='space-y-2'>
                       <h2 className='text-xl text-black'>Marry Smith</h2>
                       <h2>22 Minutes ago</h2>
                       <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores aut sed quaerat repellat quos aliquid at repudiandae placeat iste cum.</p>
                   </div>
               </div>
               <div className='flex items-center gap-2 text-gray-600 text-xl'>
                   <IoEyeOutline></IoEyeOutline> <MdDelete></MdDelete>
               </div>
           </div>
           <div className='flex justify-between items-center '>
               <div className='flex items-center gap-3'>
                   <img src="/images/agents/1.jpg" alt=""  className='w-20 h-20 rounded-full'/>
                   <div className='space-y-2'>
                       <h2 className='text-xl text-black'>Marry Smith</h2>
                       <h2>22 Minutes ago</h2>
                       <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores aut sed quaerat repellat quos aliquid at repudiandae placeat iste cum.</p>
                   </div>
               </div>
               <div className='flex items-center gap-2 text-gray-600 text-xl'>
                   <IoEyeOutline></IoEyeOutline> <MdDelete></MdDelete>
               </div>
           </div>
               </div>
        </div>
    );
}

export default DashboardMessage;
