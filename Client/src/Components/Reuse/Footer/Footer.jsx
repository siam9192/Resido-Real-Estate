import React from 'react';
import WidthContainer from '../WidthContainer/WidthContainer';
import { Link } from 'react-router-dom';
import { FaApple, FaGooglePlay } from 'react-icons/fa6';

const Footer = () => {
    const navigations = [
    " About Us",
      "  FAQs",
       " Contact",
       " Blog",
    ]
    const highlights = [
    
       " Apartment",
       "My Houses",
        "Condos",
     "Villas",
    
    ]
    const agency = [

         "Agency List",
      "Agency Details",
        "Agents List",
        "Agent Details"
    
    ]
    return (
        <div className=' bg-color_dark text-gray-300 font-jost py-10'>
            <WidthContainer>
             <div className='flex justify-between lg:flex-row flex-col lg:gap-0 gap-5'>

            <div className='space-y-3'>
                <img src="https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/logo-light.svg" alt="" className='w-40' />
              <div className='pt-3 space-y-2'>
              <p>Collins Street West, Victoria 8007, Australia.</p>
                <p>
+1 246-345-0695
</p>
<p>info@example.com</p>
              </div>
            </div>
            <div>
                <h3 className='text-xl text-white font-semibold'>Navigations</h3>
                <ul className='pt-3 space-y-2 flex flex-col'>
                {
                    navigations.map((nav,index)=>{
                        return <Link key={index} className='text-gray-300'>{nav}</Link>
                    })
                }
                </ul>
            </div>
           
            <div>
                <h3 className='text-xl text-white font-semibold'>The Highlights</h3>
                <ul className='pt-3 space-y-2 flex flex-col'>
                {
                    highlights.map((nav,index)=>{
                        return <Link key={index} className='text-gray-300'>{nav}</Link>
                    })
                }
                </ul>
            </div>
            <div>
                <h3 className='text-xl text-white font-semibold'>Navigations</h3>
                <ul className='pt-3 space-y-2 flex flex-col'>
                {
                    agency.map((nav,index)=>{
                        return <Link key={index} className='text-gray-300'>{nav}</Link>
                    })
                }
                </ul>
            </div>
            <div>
                <h3 className='text-xl text-white font-semibold'>Navigations</h3>
                <ul className='pt-3 space-y-4 flex flex-col'>
                <div className='flex items-center gap-1 border p-3 rounded-md lg:w-full w-1/2'>
                        <div className='text-4xl text-color_primary'>
                       <FaGooglePlay></FaGooglePlay>
                        </div>
                        <div>
                            <h1 className='text-2xl font-semibold'>Google Play</h1>
                            <p>Get it Now</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-1 border rounded-md p-3 lg:w-full w-1/2'>
                        <div className='text-4xl text-color_primary'>
                        <FaApple></FaApple>
                        </div>
                        <div>
                            <h1 className='text-2xl font-semibold'>Play Store</h1>
                            <p>Get it Now</p>
                        </div>
                    </div>
                </ul>
            </div>
             </div>
            </WidthContainer>
        </div>
    );
}

export default Footer;
