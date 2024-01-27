import React from 'react';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import { Link } from 'react-router-dom';
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
const DownloadApp = () => {
    return (
        <div className='bg-[#e5f6fe] font-jost lg:py-32 md:py-20 p-10'>
            <WidthContainer>
        <div className='flex lg:flex-row flex-col justify-between items-center'>
            <div className='space-y-2'>
                <Link className='text-color_primary'>Download Now</Link>
                 <h1 className='text-4xl font-semibold text-gray-900'>Download App Free App For Android and iPhone </h1>
                 <p>Seamless Access, Anytime, Anywhere: Download Our App for Effortless Real Estate <br /> Exploration and Management!</p>
           <div className='flex lg:items-center md:flex-row flex-col gap-5 pt-5 '>
           <div className='flex gap-5 items-center p-2 border-2 rounded-md border-color_danger shadow-md bg-white'>
                    <div className='flex items-center gap-1 '>
                        <div className='text-4xl '>
                       <FaGooglePlay></FaGooglePlay>
                        </div>
                        <div>
                            <p>Download Now</p>
                            <h1 className='text-2xl font-semibold'>Google Play</h1>
                        </div>
                    </div>
                 </div>
                 <div className='flex gap-5 items-center p-2 border-2 rounded-md border-color_danger shadow-md bg-white'>
                    <div className='flex items-center gap-1'>
                        <div className='text-4xl '>
                       <FaApple></FaApple>
                        </div>
                        <div>
                            <p>Download Now</p>
                            <h1 className='text-2xl font-semibold'>Play Store</h1>
                        </div>
                    </div>
                 </div>
           </div>
            </div>
            <img src="https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/app.png" alt=""  className='lg:w-1/3'/>
        </div>
            </WidthContainer>
            
        </div>
    );
}

export default DownloadApp;
