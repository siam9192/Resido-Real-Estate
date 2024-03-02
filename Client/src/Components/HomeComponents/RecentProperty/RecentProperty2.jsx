import React, { useEffect, useRef, useState } from 'react';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import SectionHeading from '../../Reuse/SectionHeading/SectionHeading';
import axios from 'axios';
import SliderCard from '../../Reuse/Cards/SliderCard';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import AxiosBase from '../../../Axios/AxiosBase';
import GridCard from '../../Reuse/Cards/GridCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
const RecentProperty2 = () => {
    const[ properties,setProperties ] = useState([]);
    const [cardIndex,setCardIndex] = useState(0);
    const [slideIndex,setSlideIndex] = useState(0)
    
    const [slidePages,setSlidePages] = useState([]);
   

    const [width,setWidth] = useState(0)
    const cardRef = useRef(null)
    useEffect(()=>{
    //    setWidth(cardRef.current.offsetWidth + 20)
    // setWidth(cardRef.current.offsetWidth)
    },[])
    const getWidth =(e)=>{
       setWidth(e.target.offsetWidth)
    }
    
    useEffect(()=>{
        AxiosBase().get('/property/recent')
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
        if(next > properties.length-3){
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
   
   
    return (
        <div className='py-10 font-jost '>
            <WidthContainer>
                <SectionHeading heading={'Recent Property For Rent '} title={`"Current Rentals: Find Your Perfect Home Today - Browse Our Latest Listings!"
`}></SectionHeading>
{/* <div className='flex justify-end gap-3 py-5' >
    <div className=' bg-color_primary px-4 py-2 text-xl text-white' onClick={handleSlidePrev}>
        <FaArrowLeftLong></FaArrowLeftLong>
    </div>
    <div className=' bg-color_primary px-4 py-2 text-xl text-white' onClick={handleSingleSlideNext}>
        <FaArrowRightLong></FaArrowRightLong>
    </div>
</div> */}

{/* <div className=' flex gap-5 overflow-hidden' ref={cardRef}>
{
    properties.map((property,index)=>{
      return  <div className={`w-[400px] transition-transform ease-in duration-300`} key={index} style={{
       left:`${index*400}px`,transform:`translateX(-${(slideIndex*400)-((properties.length)*400)}px) `
        }} >
            
            <GridCard property={property} ></GridCard>
        </div>
    })
}
</div> */}
   <div className=' py-10'>
   <Swiper
              breakpoints={{
                540: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                }
              }}
            spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper" >
            {
              properties.map((item,index)=>{
                return <SwiperSlide key={item._id}>
             <GridCard property={item} key={index}></GridCard>
            </SwiperSlide>
              })
            }
            </Swiper>
   </div>

            </WidthContainer>
        </div>
    );
}

export default RecentProperty2;
