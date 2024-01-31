import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Gallery = ({images}) => {
    const [toggle,setToggle] = useState(true);
    const handler = ()=>{
        setToggle(!toggle)
    }
    // const images = ["https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-25.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-26.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-27.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-4.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-24.jpg"]
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Gallery</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'-rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold overflow-hidden transition-all duration-500 ease-in-out  ${toggle ? 'max-h-[1200px] opacity-100' : 'max-h-[0]  opacity-100 '}`}>
       <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {
            images.map((image,index)=><img src={image}/>)
        }
       </div>
        </div>
        </div>
    );
}

export default Gallery;
