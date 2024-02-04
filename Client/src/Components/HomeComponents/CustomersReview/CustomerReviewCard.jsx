import React from 'react';
import Rating from 'react-rating';
import {TiStarOutline,TiStarFullOutline} from 'react-icons/ti'
const CustomerReviewCard = ({review}) => {

      
    return (
        <div className='bg-white font-just p-5 rounded-md'>
        <div className='md:flex gap-3'>
            <img src={review.image} alt="" className='w-20 h-20 rounded-full' />
            <div className='space-y-3'>
            <Rating initialRating={review.rating} 
                 emptySymbol={<TiStarOutline className='text-color_warning text-xl hover:cursor-pointer'/>}
                 fullSymbol={<TiStarFullOutline className=' text-color_warning text-xl hover:cursor-pointer'/>}
                            readonly
    />
    <p>{review.review_text}/</p>
  <div className='space-y-1'>
  <h1 className='md:text-2xl text-xl font-semibold'>{review.name}</h1>
    <p>{review.profession}</p>
  </div>
            </div>
        </div>
        </div>
    );
}

export default CustomerReviewCard;
