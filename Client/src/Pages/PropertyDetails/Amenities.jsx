import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
const Amenities = ({amenities}) => {
    const [toggle,setToggle] = useState(true);
    const handler = ()=>{
        setToggle(!toggle)
    }
    const houseAmenities = [
        'Spacious Kitchen',
        'Modern Bathroom',
        'Central Heating and Air Conditioning',
        'High-Speed Internet Connection',
        'Adequate Storage Space',
        'Outdoor Patio or Deck',
        'Energy-Efficient Appliances',
        'Security System',
        'Laundry Room',
        'Home Office Space',
      ];
      
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Amenities</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold hover:cursor-pointer' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold overflow-hidden transition-all duration-500 ease-in-out  ${toggle ? 'max-h-[700px] opacity-100' : 'max-h-[0]  opacity-100 '}`}>
        <div className='grid md:grid-cols-3 grid-cols-2 gap-5'>
            {
                amenities.map((item,index)=>{
                 return   <div className='flex items-center gap-2'>
                        <div className='p-2 rounded-full bg-color_bg_green text-color_success'>
                            <IoCheckmark></IoCheckmark>
                        </div>
                        <h4 className='font-normal'>{item}</h4>
                    </div>
                })
            }
        </div>
        </div>
        </div>
    );
}

export default Amenities;
