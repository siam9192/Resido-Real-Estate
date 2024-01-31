import { Rating } from '@mui/material';
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import UserAuth from '../../Authentication/userAuth/userAuth';
import toast from 'react-hot-toast';
import  { Toaster } from 'react-hot-toast';
import AxiosBase from '../../Axios/AxiosBase';
const WriteReview = ({refetch}) => {
    const [toggle,setToggle] = useState(true);
    const {user} = UserAuth();
    const handler = ()=>{
        setToggle(!toggle)
    }
    const [propertyRatting,setPropertyRatting] = useState(3) 
    const [locationRatting,setLocationRatting] = useState(3)
    const [valueRatting,setValueRatting] = useState(3) 
    const [supportRatting,setSupportRatting] = useState(3) 

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!user){
            toast.error('Please Login first')
            return;
        }
        const form = e.target;
        const name = form.name.value;
        const email = user?.email;
        const message = form.message.value;
        const review = {
         name,email,
         userPhoto:user.photoURL || 'https://i.ibb.co/TH1W6TG/default-Pic.png',
         message,

         ratting:{
            property:propertyRatting,
            location:locationRatting,
            cost:valueRatting,
            support:supportRatting,
            averageRatting: (propertyRatting+locationRatting+valueRatting + supportRatting)/4
         }
        }
    AxiosBase().post('/listing/review/post',review)
    .then(res =>{
        if(res.data.insertedId){
          toast.success('Thanks for your valuable review')
          refetch()
        }
        else{
            toast.error('Something went wrong')
        }
    })
    .catch(err =>{
        toast.error('Something went wrong')
    })
    }
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Write a review</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold hover:cursor-pointer' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'-rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold overflow-hidden transition-all duration-500 ease-in-out  ${toggle ? 'max-h-[2000px] opacity-100' : 'max-h-[0]  opacity-100 '}`}>
        <div className='md:p-5 p-2'>
            <div className='grid md:grid-cols-3 gap-10'>
                <div className='space-y-3'>
            <div className='space-y-2'>
                <h2>Property</h2>
                <Rating  value={propertyRatting} size = "mid" onChange={(event,value)=>{
                if(value < 2){
                    return;
                }
                setPropertyRatting(value)
            }}/>
            </div>
            <div className='space-y-2'>
                <h2>Value for Money</h2>
                <Rating  value={valueRatting} size = "mid" onChange={(event,value)=>{
                if(value < 2){
                    return;
                }
                setValueRatting(value)
            }}/>
            </div>
                </div>
                
                <div className='space-y-3'>
            <div className='space-y-2'>
                <h2>Location</h2>
                <Rating  value={locationRatting} size = "mid" onChange={(event,value)=>{
                if(value < 2){
                    return;
                }
                setLocationRatting(value)
            }}/>
            </div>
            <div className='space-y-2'>
                <h2>Agent</h2>
                <Rating  value={supportRatting} size = "mid" onChange={(event,value)=>{
                if(value < 2){
                    return;
                }
                setSupportRatting(value)
            }}/>
            </div>
                </div>
                <div className='bg-gray-100 rounded-md text-color_text_normal flex flex-col justify-center items-center p-5'>
                    <h1 className='text-4xl font-semibold'>{(propertyRatting+locationRatting+valueRatting + supportRatting)/4}</h1>
                    <h1 className='font-normal'>Average Rating</h1>

                </div>
            </div>
            <form className='space-y-4 text-normal font-normal pt-5' onSubmit={handleSubmit}>
            <textarea  className='w-full h-72 bg-color_bg_green border p-2' name='message' placeholder='Message'></textarea>
            <div className='grid lg:grid-cols-2 gap-5'>
               
                <input className='w-full py-3 bg-color_bg_green  border rounded-md px-2' name='name' readOnly value={user?.displayName||''} placeholder='Your Name'/>
                <input className='w-full py-3 bg-color_bg_green  border rounded-md px-2' value={user?.email||''} placeholder='Your Email'/>
            </div>
            <button className='bg-[#e7faf4] px-6 py-3 border-2 border-[#b5efdf] rounded-md  text-color_primary font-semibold text-xl'>Submit Review</button>
            </form>
        </div>
        </div>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </div>
    );
}

export default WriteReview;
