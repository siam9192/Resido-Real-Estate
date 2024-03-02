
import React, { useEffect, useState } from 'react';
import PopularCard from '../../Reuse/Cards/PopularCard';
import Heading from '../../Reuse/Heading/Heading'
import AOS from 'aos';
import 'aos/dist/aos.css';
import AxiosBase from '../../../Axios/AxiosBase';

import axios from 'axios';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';

const PopularLocations = () => {
  const [properties,setProperties] = useState([])
  
   const locationValues = [{name:"Los Angeles",image:"https://i.ibb.co/Rywt1jz/los-angels.jpg"},{name:"Chicago",image:"https://i.ibb.co/pLfFjbd/chicago.jpg",
   count:properties?.find(item=>item._id==='Los Angeles')?.count||0},
   {name:"San Francisco",image:"https://i.ibb.co/R7HF4M1/sanfran.jpg",  count:properties?.filter(item=>item._id==='San Francisco').count||0},
   {name:"Miami",image:"https://i.ibb.co/Xxsw8jX/miami.jpg",count:properties?.filter(item=>item._id==='Miami')?.count||0},
   {name:"Houseton",image:"",  count:properties?.filter(item=>item._id==='Houseton')?.count||0},
   {name:"London",image:"https://i.ibb.co/RSDKd9y/london.webp",  count:properties?.filter(item=>item.city==='London')?.count}];
    useEffect(()=>{
        // AOS.init()
        AxiosBase().get('/popular/locations')
        .then((res)=>{
            const data = res.data;
           setProperties(data)
       
        })
    },[])

   
    
    return (
        <div className='font-pop py-10' >
           <WidthContainer>
          <Heading heading={'Popular Pages'} title={'Properties In Most Popular Places'}></Heading>
            <div className='pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:px-0 px-2'>
             
               {
                locationValues.map((location,index)=>{
                    return   <PopularCard key={index} area={location} properties={307}></PopularCard>
                })
               }
            </div>
           </WidthContainer>
        </div>
    );
}

export default PopularLocations;
