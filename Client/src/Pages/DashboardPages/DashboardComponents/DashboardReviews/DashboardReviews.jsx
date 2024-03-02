import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { BsHouses } from "react-icons/bs";
import { TbHomeStats } from "react-icons/tb";
import { LuBookmarkMinus } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaList,FaStar} from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import AxiosBase from '../../../../Axios/AxiosBase';
import { Link } from 'react-router-dom';
const DashboardReviews = () => {
const [reviews,setReviews] = useState([]);
    const {user} = UserAuth();

    useEffect(()=>{
     if(user){
         AxiosBase().get(`/reviews/user/recent/${user?.email}`)
         .then(res =>{
             setReviews(res.data)
         })
     }
    },[user])

  
    return (
        <div className=' bg-white shadow-xl font-pop py-5 pl-5 pr-32'>
         <h1 className='text-black text-2xl '>Review</h1>
            <div className='pt-10 space-y-4'>
            
          {
reviews.length ?
reviews.map((review,index)=>{
    return     <div className='flex justify-between items-center ' key={index}>
                   <div className='flex items-center gap-3'>
                       <img src={review.userPhoto} alt=""  className='w-20 h-20 rounded-full'/>
                       <div className='space-y-2'>
                           <h2 className='text-xl text-black'>{review.name}</h2>
                           <p className='text-color_success text-[14px] font-normal'>{review.date.year}-{review.date.month+1}-{review.date.day} {review.date.time.hour}:{review.date.time.minute}:{review.date.time.second}</p>
                           <p>{review.reviewText}</p>
                           <Rating initialRating={review.ratting.averageRatting} 
                emptySymbol={<TiStarOutline className=' text-color_primary'/>}
                fullSymbol={<TiStarFullOutline className=' text-color_primary'/>}
                           readonly
                       
   />
                       </div>
                   </div>
                   <div className='flex items-center gap-2 text-gray-600 text-xl'>
                       <Link to={`/listings/property/details/:${review.listingId}`}>
                       <IoEyeOutline className='hover:text-[#ff385c] hover:cursor-pointer'></IoEyeOutline> </Link>
                       <MdDelete className='hover:text-[#ff385c] hover:cursor-pointer'></MdDelete>
                   </div>
               </div>
   })
:

<div className=' py-14 text-center text-color_text_normal text-3xl font-semibold'>No recent Reviews</div>
          }
         
                </div>
         </div>
    );
}

export default DashboardReviews;
