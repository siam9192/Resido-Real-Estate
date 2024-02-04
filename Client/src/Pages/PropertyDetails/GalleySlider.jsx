import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
const GallerySlider = ({images}) => {
    const [slideNo,setSlideNo] = useState(0)
    
    // const [images,setImages] = useState(["https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-25.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-26.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-27.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-4.jpg","https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-24.jpg"])

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
        <>
        <div className='relative  lg:min-h-[60vh] min-h-[30vh] max-h-[70vh] overflow-x-hidden  md:block hidden'>
         
         {
             images?.map((image,index)=>{
                 return<img src={image} key={index} alt="" className={`absolute  w-1/2 h-full transition-transform duration-500 ease-in-out`} style={{left:`${index*50}%`,transform:`translateX(-${slideNo*100}%)`}} />
             })
         }
     
         <div className='absolute top-1/2 left-0 flex justify-between items-center w-full md:px-10 px-5'>
             <div className='bg-white w-fit px-3 py-1 text-color_primary md:text-4xl text-2xl font-bold rounded-md' onClick={prev}><IoIosArrowRoundBack ></IoIosArrowRoundBack></div>
             <div className='bg-white w-fit px-3 py-1 text-color_primary md:text-4xl text-2xl font-bold rounded-md' onClick={next}><IoIosArrowRoundForward></IoIosArrowRoundForward></div>
             
         </div>
        
     </div>
     <div className='relative  lg:min-h-[60vh] min-h-[40vh] max-h-[70vh] overflow-x-hidden w-full block md:hidden'>
         
            {
                images?.map((image,index)=>{
                    return<img src={image} key={index} alt="" className={`absolute  w-full h-full transition-transform duration-500 ease-in-out`} style={{left:`${index*100}%`,transform:`translateX(-${slideNo*100}%)`}} />
                })
            }
        
            <div className='absolute top-1/2 left-0 flex justify-between items-center w-full md:px-10 px-5'>
                <button className='bg-white w-fit px-3 py-1 text-color_primary md:text-4xl text-2xl font-bold rounded-md'  onClick={prev}><IoIosArrowRoundBack ></IoIosArrowRoundBack></button>
                <button className='bg-white w-fit px-3 py-1 text-color_primary md:text-4xl text-2xl font-bold rounded-md' onClick={()=> next(9)}><IoIosArrowRoundForward></IoIosArrowRoundForward></button>
                
            </div>
           
        </div>
        </>
    );
}

export default GallerySlider;
