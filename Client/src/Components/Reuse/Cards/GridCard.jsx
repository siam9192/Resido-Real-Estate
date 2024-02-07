import React, { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { Link } from 'react-router-dom';
import AxiosBase from '../../../Axios/AxiosBase';
const GridCard = ({property}) => {
  
   const updateViews = ()=>{
    AxiosBase().put('/listing/view/update',{id:property._id})
   }
   const makePayment = async()=>{
    const stripe = await loadStripe()
   }
    return (
        <div className='font-jost border rounded-lg'
           >
            <img src={property.images[0]} alt="" className='h-72 w-full rounded-t-lg' />
        <div className='p-4 bg-white'>
       <div className='flex justify-between items-center'>
        <div> <p>{property.propertyStatus.listingIn}</p>
        <h2 className='text-gray-800 font-semibold text-xl'>{property.title}</h2></div>
        <div>
            <h1 className='text-2xl text-color_primary font-bold'>${property.propertyStatus.listingIn==='Rent' ? property.propertyStatus.rentAmount : property.propertyStatus.salePrice}</h1>
        </div>
       </div>
       <div className='flex justify-end gap-2 items-center py-3 border-b'>
 <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><IoBedOutline></IoBedOutline></div><p>{property.details.features.bedrooms} Beds</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><LuBath></LuBath></div><p>{property.details.features.bathrooms} Baths</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><TbArrowAutofitHeight></TbArrowAutofitHeight></div><p>{property.details.area} Sqft</p></div>
       </div>
       <div className='pt-2 flex justify-between items-center'>
        <div className='flex items-center gap-2'><FaLocationArrow></FaLocationArrow><p><h3>{property.details.address.address}</h3></p></div>
       <Link to={`/listings/property/details/${property._id}`}  onClick={updateViews}> <button className='px-6 py-2 bg-color_primary text-white rounded-full'>View</button></Link>
       </div>
        </div>
        </div>
    );
}

export default GridCard;
