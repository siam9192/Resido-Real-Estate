import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const PropertyVideo = ({property}) => {
    const [toggle,setToggle] = useState(true);
    const handler = ()=>{
        setToggle(!toggle)
    }
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center' onClick={handler}>
        <h1 className='text-xl text-color_text_normal font-semibold'>Video</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'-rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold overflow-hidden transition-all duration-500 ease-in-out  ${toggle ? 'max-h-[700px] opacity-100' : 'max-h-[0]  opacity-100 '}`}>
         <div className='relative max-h-[500px]'>
            <video src="/Video/1.mp4" controls={true} className='w-full'></video>
         </div>
        </div>
        </div>
    );
}

export default PropertyVideo;
