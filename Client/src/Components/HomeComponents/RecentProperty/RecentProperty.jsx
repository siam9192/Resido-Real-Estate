import React, { useEffect, useState } from 'react';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import SectionHeading from '../../Reuse/SectionHeading/SectionHeading';
import axios from 'axios';
import SliderCard from '../../Reuse/Cards/SliderCard';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
const RecentProperty = () => {
    const[ properties,setProperties ] = useState([]);
    const [cardIndex,setCardIndex] = useState(0);
    const [slideIndex,setSlideIndex] = useState(0)
    
    const [slidePages,setSlidePages] = useState([]);
    const [slidingType,setSlidingType] = useState('multiple');
    useEffect(()=>{
        axios.get('/Json/Properties.json')
        .then(res =>{
            setProperties(res.data)
            const pageCount = Math.ceil(res.data.length/3);
            const array = [];
            for(let x = 0 ; x < pageCount ; x ++){
                array.push(x)
            }
            setSlidePages([...array])
        })
    },[])
    const handleCard = (index)=>{
        setSlidingType('multiple')
        setCardIndex(index)
    }
    const handleSingleSlideNext = ()=>{

          const next = slideIndex+1;
        if(next === properties.length){
            setSlideIndex(0)
            return;
        }
        setSlideIndex(next)
       
    }
    const handleSlidePrev = ()=>{
        const prev = slideIndex-1;
    
        if(prev < 0){
            setSlideIndex(properties.length-1);
            return;
        }
        setSlideIndex(prev);
        
    }
    console.log(slideIndex)
   
    return (
        <div className='py-10 font-jost '>
            <WidthContainer>
                <SectionHeading heading={'Recent Property For Rent '} title={`"Current Rentals: Find Your Perfect Home Today - Browse Our Latest Listings!"
`}></SectionHeading>
<div className='flex justify-end gap-3' onClick={handleSlidePrev}>
    <div className=' bg-color_primary px-4 py-2 text-xl text-white'>
        <FaArrowLeftLong></FaArrowLeftLong>
    </div>
    <div className=' bg-color_primary px-4 py-2 text-xl text-white' onClick={handleSingleSlideNext}>
        <FaArrowRightLong></FaArrowRightLong>
    </div>
</div>
<div className='pt-4  grid-cols-3 relative h-[500px]  overflow-x-hidden'>
    {
properties.map((property,index)=>{
    return <SliderCard property={property} index={index} slideIndex={slideIndex} key={index}></SliderCard>
})
    }
</div>
<div className='pt-3 flex justify-center items-center'>
         <div className='flex items-center gap-2'>
     {
        slidePages.map((item,index)=>{
          return  <div className={`w-5 h-5  rounded-full border ${cardIndex===index ? ' bg-color_warning': 'bg-color_info'} border-black`}  key={index}
          onClick={()=>handleCard(index)}></div>
        })
     }
         </div>
        </div> 
            </WidthContainer>
        </div>
    );
}

export default RecentProperty;
