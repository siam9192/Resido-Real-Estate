import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Reviews = ({property}) => {
    const [toggle,setToggle] = useState(true);
    const handler = ()=>{
        setToggle(!toggle)
    }
 const reviews =   [
        {
          "userName": "HappyHomeHunter123",
          "review": "I recently purchased a property through XYZ Realty, and I couldn't be happier with my new home! The agent was incredibly helpful and patient throughout the entire process. The property exceeded my expectations, and the neighborhood is fantastic. I give it a solid 5 out of 5!",
          "rating": 5
        },
        {
          "userName": "UrbanExplorer22",
          "review": "My experience with ABC Properties was exceptional. The location of the property is unbeatable, close to amenities and public transportation. The layout and design of the house are modern and functional. The transaction was smooth, and the staff at ABC Properties were professional. I'd rate it a 4.5 out of 5.",
          "rating": 4.5
        },
        {
          "userName": "DreamHomeSeeker567",
          "review": "Found my dream home through DEF Real Estate! The attention to detail in the construction is impressive, and the interior finishes are top-notch. The neighborhood is peaceful, and the view from my balcony is breathtaking. I give it a solid 5-star rating. Highly recommend!",
          "rating": 5
        },
        {
          "userName": "BudgetConsciousBuyer",
          "review": "Bought a property through LMN Realty that perfectly fit my budget. The agent was understanding of my financial constraints and helped me find an affordable yet quality home. The property is cozy and well-maintained. I would rate it a 4 out of 5.",
          "rating": 4
        },
        {
          "userName": "SereneRetreatSeeker",
          "review": "CDE Homes provided me with the tranquil retreat I was looking for. The property is surrounded by nature, and the architecture seamlessly blends with the environment. The buying process was hassle-free, and the team at CDE Homes was attentive. 5 stars for this serene retreat!",
          "rating": 5
        }
      ]
      
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
                    <img src="https://secure.gravatar.com/avatar/9d00073a50a3a0813fb6d7476de302a9?s=160&d=mm&r=g" alt="" className='w-20 h-20 rounded-full' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-xl font-semibol'>{review.userName}</h1>
                        <p className='text-color_success text-[14px] font-normal'>2022-08-28 06:43:52</p>
                    </div>
                   </div>
                   <p className='font-normal'>{review.review}</p>
                </div>
            })
        }
       </div>
        </div>
        
        </div>
    );
}

export default Reviews;
