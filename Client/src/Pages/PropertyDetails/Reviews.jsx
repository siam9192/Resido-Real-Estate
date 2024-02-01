import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AxiosBase from '../../Axios/AxiosBase';
import { useParams } from 'react-router-dom';
const Reviews = ({reviews}) => {
    const [toggle,setToggle] = useState(true);
   

    const {id} = useParams();
   
  

      
const handler = ()=>{
  setToggle(!toggle)
}

    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Reviews</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold hover:cursor-pointer' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'-rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold overflow-hidden transition-all duration-500 ease-in-out  ${toggle ? 'max-h-[700px] opacity-100 overflow-y-scroll' : 'max-h-[0]  opacity-100 '}`}>
       <div className='space-y-3 '>
        {
            reviews.map((review,index)=>{
                return <div className='p-5 bg-white' key={index}>
                   <div className='flex gap-2'>
                    <div>
                    <img src={review.userPhoto} alt="" className='w-20 h-20 rounded-full' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-xl font-semibol'>{review.name}</h1>
                        <p className='text-color_success text-[14px] font-normal'>{review.date.year}-{review.date.month+1}-{review.date.day} {review.date.time.hour}:{review.date.time.minute}:{review.date.time.second}</p>
                    </div>
                   </div>
                   <p className='font-normal pt-3'>{review.reviewText}</p>
                </div>
            })
        }
       </div>
        </div>
        
        </div>
    );
}

export default Reviews;
