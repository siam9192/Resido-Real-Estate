import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const FloorPlane = () => {
    
    const [toggle,setToggle] = useState(true);
    const handler = ()=>{
        setToggle(!toggle)
    }
    const planes = [{name:'First Floor',area:720},{name:'Second Floor',area:1200},{name:'Third Floor',area:1720}]
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Floor Planes</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold hover:cursor-pointer' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold overflow-hidden transition-all duration-500 ease-in-out  ${toggle ? 'max-h-[700px] opacity-100' : 'max-h-[0]  opacity-100 '}`}>
        <div className='border-2'>
           {
            planes.map((item,index)=>{
           return <div className='p-2 border-t flex justify-between items-center '>
            <h1 className='font-semibold'>{item.name}</h1> <h3 className='px-4 py-1 bg-gray-200 rounded-md'>{item.area} Sqft</h3>
           </div>
            })
           }
        </div>
        </div>
        </div>
    );
}

export default FloorPlane;
