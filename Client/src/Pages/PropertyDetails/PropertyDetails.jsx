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
import { useLocation, useParams } from 'react-router-dom';
import AxiosBase from '../../Axios/AxiosBase';
import SideComponents from './SideComponents';
import { useQuery } from '@tanstack/react-query';

const PropertyDetails = () => {
    const [isNavbar,setIsNavbar] = useState(false);
    const[ property,setProperty ] = useState({})
    const [pages,setPages] = useState([1,2,3,4])
    const {id} = useParams()
    useEffect(()=>{
       window.scrollTo(0,0)
        AxiosBase().get(`/property/single/get/${id}`)
        .then(res =>{
            setProperty(res.data)
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
      const {data:reviews=[],isLoading,refetch:refetchReviews} = useQuery({
        queryKey:['Reviews'],
        queryFn:async()=>{
         const res = await AxiosBase().get(`/listing/reviews/get/${id}`)
         return res.data;
        }
      })
    return (
        <div className='min-h-[120vh] font-jost bg-color_bg_green'>
         <div className=''><Navbar2 isNavbar={isNavbar}></Navbar2></div>
           <Navbar isNavbar={isNavbar}></Navbar>
           <GallerySlider images={property.images}></GallerySlider>
             <WidthContainer>
            
<div className='flex lg:flex-row flex-col gap-5 lg:py-20 py-10 '>
    <div className='lg:w-[70%]  space-y-10'>
        <div className='p-5 bg-white rounded-md'>
            <div className='space-y-2'>
            <p className=' bg-[#f8cbcb] text-color_danger px-4 py-1 text-[14px] rounded-full w-fit '>{property?.propertyStatus?.listingIn}</p>
            <h1 className='text-2xl font-semibold text-color_text_normal'>{property?.title}</h1>
            <div className='flex items-center gap-2'><FaLocationArrow></FaLocationArrow><p><h3>{property?.details?.address.address}</h3></p></div>
            <h1 className='text-2xl text-color_primary font-bold'>${property?.propertyStatus?.listingIn==='Rent' ? property?.propertyStatus?.rentAmount : property?.propertyStatus?.salePrice}</h1>
            </div>
            <div className='flex md:flex-row flex-col  gap-2 md:items-center pt-5'>
 <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><IoBedOutline></IoBedOutline></div><p>{property?.details?.features?.bedrooms} Beds</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><LuBath></LuBath></div><p>{property?.details?.features?.bathrooms} Baths</p></div>
        <div className='flex items-center gap-2'>
        <div className='p-2 bg-gray-200 rounded-full'><TbArrowAutofitHeight></TbArrowAutofitHeight></div><p>{property?.details?.area} Sqft</p></div>
       </div>
        </div>

        <Details property={property}></Details>
        <Description property={property}></Description>
        <Amenities amenities={property?.details?.amenities||[]}></Amenities>
        {/* <PropertyVideo></PropertyVideo> */}
        <FloorPlane></FloorPlane>
        <Gallery images = {property?.images||[]}></Gallery>
        <PropertyRating></PropertyRating>
        <WriteReview refetch={refetchReviews}></WriteReview>
        <Reviews reviews={reviews}></Reviews>

    </div>
    <div className='lg:w-[30%]'>
      <SideComponents email = {property?.userEmail}></SideComponents>
    </div>
</div>

             </WidthContainer>
             <Footer></Footer>
    </div>
    )}

    export default PropertyDetails
    