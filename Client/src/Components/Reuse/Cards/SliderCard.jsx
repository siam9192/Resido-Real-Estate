import React, { useEffect, useRef, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { TbArrowAutofitHeight } from "react-icons/tb";
const SliderCard = ({property,index,slideIndex}) => {
    const [width,setWidth] = useState(0)
    const cardRef = useRef(null)
    useEffect(()=>{
       setWidth(cardRef.current.offsetWidth + 20)
    },[])
    const getWidth =(e)=>{
       setWidth(e.target.offsetWidth)
    }
  
    return (
       <>
        <div className='font-jost lg:block hidden border rounded-lg absolute lg:w-[30%] h-fit transition-transform ease-in duration-300 ' style={{
            left:`${index*35}%`,transform:`translateX(-${slideIndex*35}%) `
            }} ref={cardRef}>
            <img src={property.images[0]} alt="" className='h-72 w-full rounded-t-lg' />
        <div className='p-4 bg-white'>
       <div className='flex justify-between items-center'>
        <div> <p>{'Rent'}</p>
        <h2 className='text-gray-800 font-semibold text-xl'>{property.title}</h2></div>
        <div>
            <h1 className='text-2xl text-color_primary font-bold'>${`${property.propertyStatus.listingIn==='Rent' ? property.propertyStatus.rentAmount  : property.propertyStatus.salePrice}`}</h1>
        </div>
       </div>
       <div className='flex justify-end gap-2 items-center py-3 border-b'>
 <div className='lg:flex items-center gap-2 space-y-2'>
        <div className='p-2 bg-gray-200 rounded-full'><IoBedOutline></IoBedOutline></div><p>{property.bedrooms} Beds</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><LuBath></LuBath></div><p>{property.bathrooms} Baths</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><TbArrowAutofitHeight></TbArrowAutofitHeight></div><p>{1200} Sqft</p></div>
       </div>
       <div className='pt-2 flex justify-between items-center'>
        <div className='flex items-center gap-2'><FaLocationArrow></FaLocationArrow><p><h3>{property.details.address.address}</h3></p></div>
        <button className='px-6 py-2 bg-color_primary text-white rounded-full'>View</button>
       </div>
        </div>
        </div>
        <div className='font-jost border lg:hidden block rounded-lg  absolute w-full h-fit transition-transform ease-in duration-300 ' style={{
            top:`${index*550}px`,transform:`translateY(-${slideIndex*550}px) `
            }} onLoad={getWidth}>
            <img src={property.images[0]} alt="" className='h-72 w-full rounded-t-lg' />
        <div className='p-4 bg-white'>
       <div className='flex justify-between items-center'>
        <div> <p>{'Rent'}</p>
        <h2 className='text-gray-800 font-semibold text-xl'>{property.title}</h2></div>
        <div>
            <h1 className='text-2xl text-color_primary font-bold'>${`${property.propertyStatus.listingIn==='Rent' ? property.propertyStatus.rentAmount  : property.propertyStatus.salePrice}`}</h1>
        </div>
       </div>
       <div className='flex lg:flex-row flex-col lg:justify-end gap-2 lg:items-center py-3 border-b'>
 <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><IoBedOutline></IoBedOutline></div><p>{property.bedrooms} Beds</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><LuBath></LuBath></div><p>{property.bathrooms} Baths</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><TbArrowAutofitHeight></TbArrowAutofitHeight></div><p>{1200} Sqft</p></div>
       </div>
       <div className='pt-2 flex justify-between items-center'>
        <div className='flex items-center gap-2'><FaLocationArrow></FaLocationArrow><p><h3>{property.details.address.address}</h3></p></div>
        <button className='px-6 py-2 bg-color_primary text-white rounded-full'>View</button>
       </div>
        </div>
        </div>
       </>
    );
}

export default SliderCard;
