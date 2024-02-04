import React, { useEffect, useState } from 'react';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import { GoLocation } from "react-icons/go";
import Navbar1 from '../Navbars/Navbar1';
import Navbar from '../Navbars/Navbar';
const Banner = () => {
    // https://resido-v2.smartdemowp.com/home-layout-2/?header_layout=1_1
    // https://themeforest.net/item/resido-real-estate-wordpress-theme/31804443
    const [isNavbar,setIsNavbar] = useState(false);
    const [type,setType] = useState('Rent')
    const types = ['Buy','Rent','Sale']
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
    return (
     <>
     <Navbar isNavbar={isNavbar}></Navbar>
        <div className='min-h-[90vh] bg-[#2e36ac] relative'>
            <Navbar1></Navbar1>
            <img src="https://resido-v2.smartdemowp.com/wp-content/uploads/2022/08/banner.png" alt="" className='w-full absolute bottom-10' />
          <WidthContainer>
           <div>
           <div className='text-center text-white font-mooli lg:pt-32 md:pt-32 pt-20 spacey-3 '>
                <p>What are you waiting for <span className=' bg-color_success px-4 py-1 rounded-md'>New</span></p>
                <h1 className='md:text-6xl text-5xl font-semibol pt-3'>Find Your <span className='font-bold'>Perfect Place.</span> </h1>
                </div>
                <div className='flex justify-center pt-14'>
                    <form className='md:w-[70%] w-[90%] bg-white p-5 lg:flex items-center font-serif rounded-lg z-10 lg:space-y-0 space-y-2'>
                        <div className='lg:w-[40%] flex items-center lg:justify-normal justify-between lg:gap-3 px-2 font-pop'>
                            <div className='flex items-center gap-1'>
                                <input type="checkbox" name='type' className=' accent-color_info w-5 h-5 rounded-full' /> <p className='text-gray-600 text-xl outline-none'>Sale</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <input type="checkbox" name='type' className=' accent-color_info w-5 h-5 rounded-full' /> <p className='text-gray-600 text-xl'>Rent</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <input type="checkbox" name='type' className=' accent-color_info w-5 h-5 rounded-full' /> <p className='text-gray-600 text-xl'>Buy</p>
                            </div>
                        </div>
                    <div className='lg:w-[60%] px-3 lg:flex items-center  justify-between lg:border-l font-pop'>
                    <div className='flex items-center gap-2'>
                    <div className='text-2xl text-gray-600 '>
                        <GoLocation></GoLocation>
                    </div>
                    <input type="text" className='bg-transparent border-none outline-none w-full py-6 px-2 text-black' placeholder='Search for a property'/>
                    </div>
                  
                    <button className='md:px-8 md:py-5 lg:w-fit w-full py-4 bg-color_dark text-white rounded-md '>Search</button>
                    </div>
                    </form>
                </div>
           </div>
          </WidthContainer>
        </div>
     </>
    );
}

export default Banner;
