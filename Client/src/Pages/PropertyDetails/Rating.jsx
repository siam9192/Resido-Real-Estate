import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import Rating from 'react-rating';
const PropertyRating = ({property}) => {
    const [toggle,setToggle] = useState(true);
    const handler = ()=>{
        setToggle(!toggle)
    }
    const rattingStatus = [{
        type:'Property',
        value:60
    },{
        type:'Value for Money',
        value:90
    },,{
        type:'Location',
        value:80
    },{
        type:'Support',
        value:95
    }]
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Rating</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold hover:cursor-pointer' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'-rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold overflow-hidden transition-all duration-500 ease-in-out  ${toggle ? 'max-h-[700px] opacity-100' : 'max-h-[0]  opacity-100 '}`}>
         <div className='px-5 py-5 md:py-10 md:flex gap-5'>
            <div className='md:w-1/2 px-5 border-r-2 border-color_text_normal flex flex-col items-center '>
                <h1 className='text-6xl font-semibold'>{4.8}</h1>
                <p>out of 5</p>
                <Rating initialRating={4.5} 
                 emptySymbol={<TiStarOutline className='text-color_warning text-xl hover:cursor-pointer'/>}
                 fullSymbol={<TiStarFullOutline className=' text-color_warning text-xl hover:cursor-pointer'/>}
                            readonly
    />
            </div>
            <div className='pl-5 w-full grid md:grid-cols-2 gap-5'>
                {
                    rattingStatus.map((item,index)=>{
                    return <div className='space-y-2'>
                        <h3 className='font-normal'>{item.type}</h3>
                       <div className='flex gap-3 items-center'>
                       <div className='bg-gray-200 w-full rounded-full'>
                            <div className='py-1 rounded-full bg-color_success ' style={{width:`${item.value}%`}}></div>
                        </div>
                        <div className='px-4 py-1 bg-gray-100 text-[12px] rounded-full'>{item.value}</div>
                       </div>
                    </div>
                    })
                }
            </div>
         </div>
        </div>
        </div>
    );
}

export default PropertyRating;
