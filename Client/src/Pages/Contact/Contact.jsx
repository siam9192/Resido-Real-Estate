import React from 'react';
import WidthContainer from '../../Components/Reuse/WidthContainer/WidthContainer';
import { AiTwotoneHome } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import Navbar from '../../Components/HomeComponents/Navbars/Navbar';
import Navbar1 from '../../Components/HomeComponents/Navbars/Navbar1';
import Navbar2 from '../../Components/HomeComponents/Navbars/Navbar2';
const Contact = () => {
    return (
        <>
        <Navbar2></Navbar2>
        <div>
            <div className='lg:py-14 md:py-10 py-20 bg-[#3f47b7] font-jost'>

<WidthContainer>
<div>
<h1 className='md:text-7xl text-5xl text-white font-bold'>Contacts</h1>
<h3 className='text-gray-200 pt-3'>Get in touch</h3>
    </div>


   
</WidthContainer>

</div>

<WidthContainer>
<div className=' md:py-10 py-5  grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10'>

<form action="" className=' space-y-2 '>
    <div className=' flex lg:flex-row flex-col lg:items-center gap-5'>
    <div className='space-y-1 flex-1'>
                    <h3 className=' text-color_text_normal font-semibold uppercase'>Name <span className=' text-red-500'>*</span></h3>
                <input type="text" name='name' className='w-full py-5 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Your Email' required/>
                </div>
                <div className='space-y-1 flex-1'>
                    <h3 className=' text-color_text_normal font-semibold uppercase'>Email  <span className=' text-red-500'>*</span></h3>
                <input type="text" name='email' className='w-full py-5 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Your Email' required/>
                </div>
                
    </div>
    <div className='space-y-1 flex-1'>
                    <h3 className=' text-color_text_normal font-semibold uppercase'>Message <span className=' text-red-500'>*</span></h3>
                <textarea type="text" name='email' className='w-full py-6 px-2 border rounded-md  bg-color_bg_green text-black  resize-none h-52' placeholder='Message' required></textarea>
                </div>
                <button className='bg-[#e7faf4] mt-4 px-6 py-3 border-2 border-[#b5efdf] rounded-md  text-color_primary font-semibold text-xl'>Submit Review</button>
</form>
<div className=' space-y-6'>
    <h1 className=' text-3xl text-color_dark font-bold'>Get In Touch</h1>
    <p className=' font-medium text-color_secondary'>Connecting Beyond Distances: Embrace Seamless Communication and Get in Touch for Meaningful Connections in the Modern World.</p>
    <div className=' flex gap-2 items-center'>
        <div className=' text-5xl text-color_primary'>
            <AiTwotoneHome></AiTwotoneHome>
        </div>
        <div className=' space-y-1'>
        <h2 className=' text-color_dark font-semibold text-xl'>Reach Us</h2>
        <p className=' text-color_text_normal'>2512, New Market, Eliza Road, Sincher 80 CA, Canada, USA </p>
        </div>
    </div>
    <div className=' flex gap-2 items-center'>
        <div className=' text-5xl text-color_primary'>
        <MdOutlineMailOutline></MdOutlineMailOutline>
        </div>
        <div className=' space-y-1'>
        <h2 className=' text-color_dark font-semibold text-xl'>Drop a Mail</h2>
        <p className=' text-color_text_normal'>support@Rikada.com Rikada@gmail.com </p>
        </div>
    </div>
    <div className=' flex gap-2 items-center'>
        <div className=' text-5xl text-color_primary'>
            <IoPhonePortraitOutline></IoPhonePortraitOutline>
        </div>
        <div className=' space-y-1'>
        <h2 className=' text-color_dark font-semibold text-xl'>Call Us</h2>
        <p className=' text-color_text_normal'>(41) 123 521 458 +91 235 548 7548  </p>
        </div>
    </div>
</div>
</div>
</WidthContainer>
        </div>
        </>
    );
}

export default Contact;
