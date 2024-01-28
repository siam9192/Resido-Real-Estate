import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Details = ({property}) => {
    const [toggle,setToggle] = useState(false);
    const handler = ()=>{
        setToggle(!toggle)
    }
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Details & Features</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold transition-[max-height] duration-500 ease-in-out overflow-hidden ${toggle ? 'max-h-[100px]' : 'max-h-0 transition-[max-height] duration-500'}`}>
        <h3>Garage : <span>{1}</span></h3>
        <h3>Area Size (sqft) : <span>{1200}</span></h3>
        <h3>Bedroom : <span>{4}</span></h3>
        <h3>Bathroom : <span>{3}</span></h3>
        </div>
        </div>
    );
}

export default Details;
