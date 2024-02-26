
import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";

import { GrNext,GrPrevious } from "react-icons/gr";

const GallerySlider2 = ({images}) => {
    const [slideNo,setSlideNo] = useState(0)
    
    
    const next = (z)=>{
        const x = slideNo + 1
      if(z){
        if(x < images.length){
            setSlideNo(x)
        } 
       
        else{
            if(x < images.length-1){
                setSlideNo(x)
            }
        }
      }
        else{
            const array = [...images];
            
        }
        
    }
    const prev = ()=>{
        const x = slideNo - 1
        if(x > 0){
            setSlideNo(x)
        }
        else{
            const array = [...images];
           
            // setImages(array.concat(images))
        }
    }

    return (
        <div>

<div className='py-5 lg:flex gap-5 lg:space-y-0 space-y-3 bg-white p-5 rounded-md'>
                   <div className='relative w-full lg:h-[80vh] h-[40vh] overflow-hidden '> 
                   {/* <img src={images[slideNo]} alt="" className='w-full max-h-[80vh] rounded-lg' /> */}
                  
                    {
                        images.map((img,index)=>{
                      return <img src={img} key={index} style={{left:`${index*100}%`,transform:`translateX(${slideNo*100})%`}} className='h-full w-full rounded-lg absolute transition-transform duration-200 ease-in-out' alt="" />
                        })
                    }
        
                   <div className='absolute top-0 left-0 flex justify-end w-full p-5'>
                    
                   </div>
                   <div className='absolute flex gap-4 items-center top-4 md:px-10 px-5 w-full'>
                    <button className='md:text-xl text-white bg-color_primary hover:bg-black p-4 rounded-full' onClick={prev}><GrPrevious></GrPrevious></button> <button className='md:text-xl text-white  bg-color_primary hover:bg-black  p-4 rounded-full' onClick={next}><GrNext></GrNext></button>
                    </div></div>

                    <div className=' flex gap-3 max-h-[80vh] lg:flex-col flex-row overflow-y-auto p-5 bg-white rounded-lg'>
                        {
                            images.map((image,index)=><img src={image} className='md:max-h-40 h-20 rounded-lg hover:cursor-pointer' key={index}/>)
                        }
                    </div>
                </div>
            
        </div>
    );
}

export default GallerySlider2;
