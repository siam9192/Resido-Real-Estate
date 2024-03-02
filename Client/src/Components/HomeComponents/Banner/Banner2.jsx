import React, { useEffect, useState } from 'react';
import './Banner.css'
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import { useNavigate } from 'react-router-dom';
import { Typewriter, useTypewriter } from 'react-simple-typewriter';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Navbars/Navbar';
import Navbar2 from '../Navbars/Navbar2';
import Navbar1 from '../Navbars/Navbar1';
import BannerNavbar from '../Navbars/BannerNavbar';
const Banner2 = () => {
    const [propertyStatus,setPropertyStatus] = useState('Rent');
    const [activeBanner,setActiveBanner] = useState(1)
    const navigate = useNavigate();
    const locationValues = ["Los Angeles","Chicago","San Francisco","Miami","Houseton"];
    const [isNavbar,setIsNavbar] = useState(false);
    const [type,setType] = useState('Rent')
    const types = ['Buy','Rent','Sale']
    const images = ["https://i.ibb.co/ZW8GcrM/3d-rendering-house-model.jpg","https://i.ibb.co/C8tJxXL/back-view-family-hugging-admiring-their-home.jpg","https://i.ibb.co/6Y4zL8P/logo-make-11-06-2023-8.jpg","'https://i.ibb.co/8P6G6Gh/3d-rendering-loft-luxury-living-room-with-shelf-near-dining-table.jpg'"]
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

        const handleType = (value)=>{
          setType(value)
        }
    useEffect(()=>{
        AOS.init()
    },[])
    const locations = [
        "Tokyo",
        "New York City",
        "London",
        "Paris",
        "Sydney",
        "Dubai",
        "Rio de Janeiro",
        "Delhi",
        "Beijing",
        "Los Angeles"
      ];
     const propertyTypes = [
        "Apartment",
        "Condos",
        "Denver",
        "House",
        "Flat",
        "Offices",
        "Rental",
        "Studios",
        "Villas"
      ];
    
    const search = (e)=>{
        e.preventDefault();
        const form = e.target;
        const keyword = form.keyword.value;
        const location = form.location.value;
        const propertyType = form.propertyType.value;
        if(!location || !propertyType){
            return;
        }


        
        navigate(`/listings?key=${keyword}&locations=${location}&status=${propertyStatus}`)
       
    }
    const [text,Cursor] = useTypewriter({
        words:['Property','House','Apartment','Plaza'],
        loop:{},
        cursor:true
    })
   
         
    const handlePropertyStatus = (status)=>{
        setPropertyStatus(status)
    }

    useEffect(()=>{
        const handleImages = ()=>{
            const next = activeBanner+1;
            if(next <= images.length){
           setActiveBanner(next)
            }
            else{
                setActiveBanner(0)
            }
        }
      const imageInterval =   setInterval(handleImages,10000)

      return()=>{
        clearInterval(imageInterval,100000)
      }
    },[activeBanner])
    return (
        <>
        <BannerNavbar></BannerNavbar>
        <div className='banner min-h-[95vh]' style={{ background: `url(${images[1]}),linear-gradient(rgb(58, 57, 57,0.5),rgba(66, 65, 63, 0.6))`, backgroundBlendMode: 'overlay',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'}}>
            
            <Navbar isNavbar={isNavbar}></Navbar>
           <WidthContainer>
               <div className='pt-32 text-center space-y-5 font-pop lg:px-0 px-2' data-aos="fade-up"  data-aos-duration="2000"
  >
                   <h1 className='lg:text-6xl text-4xl text-white font-lato'>Find Your Dream  <Typewriter words={['Property','House','Apartment','Plaza']} loop = {true} cursor = {true} cursorColor='#ff385c'></Typewriter> </h1>
                   <p className='text-xl text-white font-lato'>We have a million Property for you</p>
                   <div className='flex flex-col justify-center items-center gap-10'>
                       <div className='flex items-center gap-4 text-white font-semibold'>
                          <div className='relative' onClick={()=>handlePropertyStatus('Rent')}>
                          <button className={`px-8 py-3 rounded-lg ${propertyStatus === 'Rent' ? ' bg-color_primary ' : 'bg-white text-black' }`}>For Rent</button>
                           <div class={propertyStatus === 'Rent' ? 'arrow_down' : 'hidden'}></div> 
                           </div>
                          <div className='relative' onClick={()=>handlePropertyStatus('Sale')}>
                          <button   className={`px-8 py-3 rounded-lg ${propertyStatus === 'Sale' ? ' bg-color_primary ' : 'bg-white text-black' }`}>For Sale</button>
                          <div class={propertyStatus === 'Sale' ? 'arrow_down' : 'hidden'}></div> 
                          </div>
                       </div>
                       <form  onSubmit={search}>
                       <div className='p-3 lg:min-w-1/2 w-full backdrop-blur-lg backdrop-brightness-100 backdrop-contrast-125 bg-white/20 rounded-md'>
                       <div className='p-10 bg-white rounded-md flex  lg:justify-between lg:flex-row flex-col lg:items-center gap-5 '>
                           <input type="text" name='keyword' placeholder='Enter your keyword...' className='w-full px-2 py-3  border-[1px] outline-none rounded-lg border-gray-500 text-black bg-white'></input> 
                          {/* <input type="text"  placeholder='Enter keyword' className='min-w-[250px] p-2 b border-2 border-black text-black'/> */}
                          <select type="text" name='location'  placeholder='Location' className='w-full px-2 py-3  border-[1px] rounded-lg border-gray-500 text-black bg-white'>
                          <option value="">Location</option>
                           {
                               locations.map(location=>{
                                   return  <option value={location}>{location}</option>
                               })
                           }
                          
                          
                           </select>
                          <select type="text" name='propertyType'  placeholder='Property type' className='w-full px-2 py-3 border-[1px] rounded-lg border-gray-500  text-black bg-white'>
                          <option value="null">Property Type</option>
                         {
                            propertyTypes.map(type=>{
                                return <option value={type}>{type}</option>
                            })
                         }
                           
                          </select>
                         
                          <button type='submit' className='min-w-[250px] py-3  bg-color_primary text-white hover:bg-[#0f0f0f] rounded-lg font-semibold '>Search Now</button>
                       </div>
                       </div>
                       </form>
                   </div>
               </div>
           </WidthContainer>
       </div>
        </>
    );
}

export default Banner2;
