import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FcPrevious,FcNext } from "react-icons/fc";
import WidthContainer from '../../Components/Reuse/WidthContainer/WidthContainer';
const Gallery = ({images}) => {
    const [toggle,setToggle] = useState(true);
    const [galleryActiveIndex,setGallery] = useState(0);
    const handler = ()=>{
        setToggle(!toggle)
    }
    // const images = ["https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-25.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-26.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-27.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-4.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-24.jpg"]

    const next = ()=>{
        const n = galleryActiveIndex + 1;
        if(galleryActiveIndex < images.length-1){
            setGallery(n)
        }
        else{
            setGallery(0)
        }
    }
    const prev = ()=>{
        const p = galleryActiveIndex - 1;
        console.log(p)
        if(galleryActiveIndex <= 0){
            setGallery(p)
            
        }
        else{
            setGallery(images.length-1)
        }
    }
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Gallery</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'-rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold overflow-hidden transition-all duration-500 ease-in-out  ${toggle ? 'max-h-[1200px] opacity-100' : 'max-h-[0]  opacity-100 '}`}>
       <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {
            images.map((image,index)=><img src={image} className='hover:cursor-pointer' key={index} onClick={()=>setGallery(index)} />)
        }
       </div>
        </div>
    {
   galleryActiveIndex !== null &&     <div className=' bg-color_dark h-[100vh] overflow-y-auto fixed top-0 left-0 w-full z-50  '>
   <WidthContainer>
       <div className='flex justify-center pt-20 relative'>
           <img src={images[galleryActiveIndex]} alt="" className='lg:w-[60%]'/>
           <div className='w-full absolute top-1/2 flex justify-between items-center text-4xl'>
               <div className='hover:cursor-pointer' onClick={prev}><FcPrevious></FcPrevious></div>
               <div className='hover:cursor-pointer' onClick={next}> <FcNext></FcNext></div>
           </div>
       </div>
   <div className='grid lg:grid-cols-8 md:grid-cols-6 grid-cols-3 gap-3 py-5'>
       {
           images.map((image,index)=>{
               return <img src={image}  className={`rounded-lg hover:cursor-pointer ${galleryActiveIndex === index ? 'border-4 border-color_primary' : ''}`} alt="" onClick={()=>setGallery(index)}/>
           })
       }
   </div>
   </WidthContainer>
   <div className='px-3 py-2 border rounded text-white absolute top-4 right-4 hover:cursor-pointer' onClick={()=>setGallery(null)}>
       <RxCross2></RxCross2> 
   </div>
</div>
    }
        </div>
    );
}

export default Gallery;
