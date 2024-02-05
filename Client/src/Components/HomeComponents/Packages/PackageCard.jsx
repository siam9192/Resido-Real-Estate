import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { IoMdCheckmark } from "react-icons/io";
import AxiosBase from '../../../Axios/AxiosBase';
import UserAuth from '../../../Authentication/userAuth/userAuth';
import { Navigate } from 'react-router-dom';
const PackageCard = ({pack}) => {
    const {user} = UserAuth();
    const makePayment = async()=>{
      if(!user){
         return <Navigate to='/sign-in' state={'/'}></Navigate>
      }
        const stripe = await loadStripe('pk_test_51OEFoaF0un34BsUzlCeA1Qjv16j4AbeWpd3AUsVgVxb4JD1DbZ57GjcCYn8sNbeoiHX8svh7iTzqMTc2mmymbdXr00cb9TNfxr')
        const body = {
         email:user.email,
         name:pack.package_name,
         price:pack.price
        }
       
        const response = await AxiosBase().post('/create-checkout-session',body);
       const session = response.data;
       console.log(stripe)
       const result = stripe.redirectToCheckout({
         sessionId:session.id
       });
       if(result.error){
         console.log(result.error)
       }
        
    
       }
    return (
        <div className='p-2 border rounded-lg'>
        <div className={`p-5 rounded-lg`} style={{backgroundColor:pack.color}}>
          <h1 className='text-6xl font-semibold text-color_primary text-center'><sup className=''>$</sup>{pack.price}</h1>
          <h1 className='text-[#2D3954 text-black text-center font-bold text-2xl'>{pack.package_name}</h1>
        </div>
        <div className='pt-3 px-2 space-y-3'>
       <div className='flex justify-between items-center py-3'>
          <h4 className='text-xl'>{pack.features.listing.total} Listings</h4>
          <div className={`p-2 rounded-full ${pack.features.listing.status ? 'bg-[#e5f6fe] text-color_primary' : 'bg-gray-300 text-black'}`}><IoMdCheckmark></IoMdCheckmark></div>
       </div>
       <div className='flex justify-between items-center py-3 border-t-2 border-gray-300  border-dashed'>
          <h4 className='text-xl'> Contact With Agent</h4>
          <div className={`p-2 rounded-full ${pack.features.agent_contact.status ? 'bg-[#e5f6fe] text-color_primary' : 'bg-gray-300 text-black'}`}><IoMdCheckmark></IoMdCheckmark></div>
       </div>
       <div className='flex justify-between items-center py-3 border-t-2 border-gray-300  border-dashed'>
          <h4 className='text-xl'>One Year Validity</h4>
          <div className={`p-2 rounded-full ${pack.features.oneYearValidity.status ? 'bg-[#e5f6fe] text-color_primary' : 'bg-gray-300 text-black'}`}><IoMdCheckmark></IoMdCheckmark></div>
       </div>
       <div className='flex justify-between items-center py-3 border-t-2 border-gray-300 border-dashed'>
          <h4 className='text-xl'>7×24 Fully Support</h4>
          <div className={`p-2 rounded-full ${pack.features.support.status ? 'bg-[#e5f6fe] text-color_primary' : 'bg-gray-300 text-black'}`}><IoMdCheckmark></IoMdCheckmark></div>
       </div>
        </div>
        <div className='text-center pt-5 font-jost'>
          <button className='bg-[#e7faf4] px-6 py-3 border-2 border-[#b5efdf] rounded-md  text-color_primary font-semibold text-xl' onClick={makePayment}>Chose Plane</button>
        </div>
      </div>
    );
}

export default PackageCard;
