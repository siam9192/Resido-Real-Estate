import React from 'react';
import Rating from 'react-rating';
import {TiStarOutline,TiStarFullOutline} from 'react-icons/ti'
const CustomerReviewCard = ({review}) => {

      
    return (
        <div className='bg-white font-just p-5 rounded-md'>
        <div className='md:flex gap-3'>
            <img src="https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/user-3.jpg" alt="" className='w-20 h-20 rounded-full' />
            <div className='space-y-3'>
            <Rating initialRating={4.5} 
                 emptySymbol={<TiStarOutline className='text-color_warning text-xl hover:cursor-pointer'/>}
                 fullSymbol={<TiStarFullOutline className=' text-color_warning text-xl hover:cursor-pointer'/>}
                            readonly
    />
    <p>{review.comment}</p>
  <div className='space-y-1'>
  <h1 className='md:text-2xl text-xl font-semibold'>{review.name}</h1>
    <p>Youtuber</p>
  </div>
            </div>
        </div>
        </div>
    );
}

export default CustomerReviewCard;
