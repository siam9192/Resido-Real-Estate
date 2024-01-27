import React, { useEffect, useState } from 'react';
import Navbar1 from '../../Components/HomeComponents/Navbars/Navbar1';
import Navbar2 from '../../Components/HomeComponents/Navbars/Navbar2';
import WidthContainer from '../../Components/Reuse/WidthContainer/WidthContainer';
import SearchBox from './SearchBox';
import MainListBox from './MainListBox';
import Navbar from '../../Components/HomeComponents/Navbars/Navbar';

const Listings = () => {
    const [isNavbar,setIsNavbar] = useState(false);
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
        <div className='min-h-[120vh]'>
         
           <div className=''><Navbar2 isNavbar={isNavbar}></Navbar2></div>
           <Navbar isNavbar={isNavbar}></Navbar>
            <div className='lg:py-14 md:py-10 py-5 bg-[#3f47b7] font-jost'>

            <WidthContainer>
<div>
    <h1 className='md:text-7xl text-5xl text-white font-bold'>Property List</h1>
                </div>
            </WidthContainer>
           
            </div>
            <div className='py-10'>
                <WidthContainer>

                    <div className='flex lg:flex-row flex-col gap-5'>
                        <div className='lg:w-[30%]'>
                            <SearchBox></SearchBox>
                        </div>
                        <div className='lg:w-[70%]'>
                            <MainListBox></MainListBox>
                        </div>
                    </div>
                </WidthContainer>
            </div>
        </div>
    );
}

export default Listings;
