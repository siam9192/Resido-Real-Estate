import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PropertyRating from './Rating';
const Details = ({property}) => {
    const [toggle,setToggle] = useState(true);
    const handler = ()=>{
        setToggle(!toggle)
    }
    // console.log(property?.details)
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Details & Features</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold transition-[max-height] duration-500 ease-in-out overflow-hidden ${toggle ? 'max-h-[1000px]' : 'max-h-0 transition-[max-height] duration-500'}`}>
        <h3>Garage : <span>{property?.details?.features.garages}</span></h3>
        <h3>Area Size (sqft) : <span>{property?.details?.area}</span></h3>
        <h3>Bedrooms : <span>{property?.details?.features?.bedrooms}</span></h3>
        <h3>Bathrooms : <span>{property?.details?.features?.bathrooms}</span></h3>
        </div>
        </div>
    );
}

export default Details;
