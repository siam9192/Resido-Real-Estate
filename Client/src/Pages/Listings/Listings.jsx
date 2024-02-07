import React, { useEffect, useRef, useState } from 'react';
import Navbar1 from '../../Components/HomeComponents/Navbars/Navbar1';
import Navbar2 from '../../Components/HomeComponents/Navbars/Navbar2';
import WidthContainer from '../../Components/Reuse/WidthContainer/WidthContainer';
import SearchBox from './SearchBox';
import MainListBox from './MainListBox';
import Navbar from '../../Components/HomeComponents/Navbars/Navbar';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Listings = () => {
    const [isNavbar,setIsNavbar] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    // const mainListRef = useRef();
    const [params,setParams] = useState([
        ['key',searchParams.get('key')?.split(',').filter(val=> val !== '')||[]],
        ['locations', searchParams.get('locations')?.split(',').filter(val=> val !== '')||[]],
        ['type',searchParams.get('type')?.split(',').filter(val=> val !== '')||[]],
        ['status',searchParams.get('status')?.split(',').filter(val=> val !== '')||[]],
        ['features',searchParams.get('features')?.split(',').filter(val=> val !== '')||[]]
      ]

    )
   
 
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


        const handleParams = (value)=>{
            setParams(value)
        }

       
    return (
        <>
        <Helmet>
            <title>Listings</title>
        </Helmet>
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
                            <SearchBox params={params} setParams={handleParams}></SearchBox>
                        </div>
                        <div className='lg:w-[70%]'>
                            <MainListBox params={params} setParams={handleParams}></MainListBox>
                        </div>
                    </div>
                </WidthContainer>
            </div>
        </div>
        </>
    );
}

export default Listings;
