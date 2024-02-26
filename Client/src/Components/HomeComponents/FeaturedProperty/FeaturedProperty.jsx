import React, { useEffect, useState } from 'react';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import SectionHeading from '../../Reuse/SectionHeading/SectionHeading';
import axios from 'axios';
import ListCard from '../../Reuse/Cards/ListCard';
import AxiosBase from '../../../Axios/AxiosBase';

const FeaturedProperty = () => {
    const[ properties,setProperties ] = useState([])
    useEffect(()=>{
        AxiosBase().get('/property/featured')
        .then(res =>{
            setProperties(res.data)
            console.log(res.data)
        })
    },[])
    return (
        <div className='py-10 bg-[#F5FAFF]'>
        <WidthContainer>
            <SectionHeading heading={'Featured Property For Sale '} title={`"Prime Real Estate: Explore Our Featured Properties for Sale - Your Dream Home Beckons!"`}></SectionHeading>
            <div className='py-5 grid lg:grid-cols-2 gap-5'>
             {
                properties.map((property,index)=>{
                   return <ListCard property={property} key={index}></ListCard>
                })
             }
            </div>
        <div className='flex justify-center pt-3'>
            <button className='px-6 py-3 border-2 border-color_info rounded-md text-color_primary font-semibold'>Browse More Properties...</button>
        </div>
    
        </WidthContainer>
        </div>
    );
}

export default FeaturedProperty;
