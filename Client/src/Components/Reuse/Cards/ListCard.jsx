import React from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { Link } from 'react-router-dom';
const ListCard = ({property}) => {
    return (
        <Link to='/listings/property/details/1'>
        <div className='font-jost border rounded-lg md:flex '>
            <div className='md:w-[40%] w-[80%]'>
            <img src={property.images[0]} alt="" className='h-52  w-full rounded-l-lg'/>
            </div>
        <div className='p-4 bg-white w-full'>
       <div className='flex gap-3 items-center'>
        <div> 
        <h2 className='text-gray-800 font-semibold text-xl'>{property.title}</h2>
        <p className=' bg-[#ffb1b1] px-4 py-1 text-[14px] rounded-full w-fit '>{'Rent'}</p>
        </div>
        <div>
            <h1 className='text-2xl text-color_primary font-bold'>${property.price}</h1>
        </div>
       </div>
       <div className='flex md:flex-row flex-col md:justify-end gap-2 md:items-center py-3 border-b'>
 <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><IoBedOutline></IoBedOutline></div><p>{property.bedrooms} Beds</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><LuBath></LuBath></div><p>{property.bathrooms} Baths</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><TbArrowAutofitHeight></TbArrowAutofitHeight></div><p>{1200} Sqft</p></div>
       </div>
       <div className='pt-2 flex justify-between items-center'>
        <div className='flex items-center gap-2'><FaLocationArrow></FaLocationArrow><p><h3>{property.address}</h3></p></div>
        <button className='px-6 py-2 bg-color_primary text-white rounded-full'>View</button>
       </div>
        </div>
        </div>
        </Link>
    );
}

export default ListCard;
