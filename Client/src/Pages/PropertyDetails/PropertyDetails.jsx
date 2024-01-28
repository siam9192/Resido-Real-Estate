import React, { useEffect, useState } from 'react';
import Navbar1 from '../../Components/HomeComponents/Navbars/Navbar1';
import Navbar2 from '../../Components/HomeComponents/Navbars/Navbar2';
import WidthContainer from '../../Components/Reuse/WidthContainer/WidthContainer';

import Navbar from '../../Components/HomeComponents/Navbars/Navbar';
import axios from 'axios';
import { FaLocationArrow } from 'react-icons/fa6';
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { TbArrowAutofitHeight } from "react-icons/tb";
import Details from './Details';
import Description from './Description';
import Amenities from './Amenities';
import PropertyVideo from './PropertyVideo';
import FloorPlane from './FloorPlane';
import Gallery from './Gallery';
import WriteReview from './WriteReview';
import Reviews from './Reviews';
import GallerySlider from './GalleySlider';
import PropertyRating from './Rating';
import Footer from '../../Components/Reuse/Footer/Footer';

const PropertyDetails = () => {
    const [isNavbar,setIsNavbar] = useState(false);
    const[ property,setProperty ] = useState({})
    const [pages,setPages] = useState([1,2,3,4])
    useEffect(()=>{
      
        axios.get('/Json/Properties.json')
        .then(res =>{
            setProperty(res.data[0])
        })
    },[])
    useEffect(()=>{
        const handleScroll = ()=>{
          if(window.scrollY > 100){
            setIsNavbar(true);

          }
          else{
            setIsNavbar(false)
          }
          
          }
        window.addEventListener('scroll',handleScroll)
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
        },[scrollY])
    return (
        <div className='min-h-[120vh] font-jost bg-color_bg_green'>
         <div className=''><Navbar2 isNavbar={isNavbar}></Navbar2></div>
           <Navbar isNavbar={isNavbar}></Navbar>
           <GallerySlider></GallerySlider>
             <WidthContainer>
            
<div className='flex lg:flex-row flex-col mt-20'>
    <div className='lg:w-[70%] space-y-10'>
        <div className='p-5 bg-white rounded-md'>
            <div className='space-y-2'>
            <p className=' bg-[#f8cbcb] text-color_danger px-4 py-1 text-[14px] rounded-full w-fit '>{'Rent'}</p>
            <h1 className='text-2xl font-semibold text-color_text_normal'>{property.title}</h1>
            <div className='flex items-center gap-2'><FaLocationArrow></FaLocationArrow><p><h3>{property.address}</h3></p></div>
            <h1 className='text-2xl text-color_primary font-bold'>${property.price}</h1>
            </div>
            <div className='flex md:flex-row flex-col  gap-2 md:items-center pt-5'>
 <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><IoBedOutline></IoBedOutline></div><p>{property.bedrooms} Beds</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><LuBath></LuBath></div><p>{property.bathrooms} Baths</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><TbArrowAutofitHeight></TbArrowAutofitHeight></div><p>{1200} Sqft</p></div>
       </div>
        </div>

        <Details property={property}></Details>
        <Description></Description>
        <Amenities></Amenities>
        <PropertyVideo></PropertyVideo>
        <FloorPlane></FloorPlane>
        <Gallery></Gallery>
        <PropertyRating></PropertyRating>
        <WriteReview></WriteReview>
        <Reviews></Reviews>

    </div>
    <div className='lg:w-[30%]'></div>
</div>

             </WidthContainer>
             <Footer></Footer>
    </div>
    )}

    export default PropertyDetails
    