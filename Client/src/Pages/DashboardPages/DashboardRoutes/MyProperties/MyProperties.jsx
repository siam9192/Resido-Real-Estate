import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowRoundForward } from "react-icons/io";
import AxiosBase from '../../../../Axios/AxiosBase'
import UserAuth from '../../../../Authentication/userAuth/userAuth';
const MyProperties = () => {
    const [properties,setProperties] = useState([]);
    const shortBy = ['Newest','Views H-L','Views L-H','Price H-L','Price L-H']
    const [pages,setPages] = useState([1,2,3,4,5,6,7,8])
    const [currentPage,setCurrentPage] = useState(1)
    const {user} = UserAuth()
    useEffect(()=>{
        if(user){
          AxiosBase().get(`user/listings?email=${user.email}`)
        .then(res => setProperties(res.data))
        }
    },[user])
    return (
        <div className='font-jost lg:p-5 p-2'>
        <h1 className='lg:text-5xl text-3xl text-black'>My Properties</h1>
        <div className='pt-10 space-y-10'>
            <div className='flex justify-between items-center'>
                <p>Showing 1–5 of 40 results</p>
                <div className='flex items-center gap-2'><p>Short by</p> <select className='border border-black p-2 rounded-full'>
                    {
                        shortBy.map((item,index)=><option value={item} key={index}>{item}</option>)
                    }
                    </select></div>
            </div>
            <div className='bg-white rounded-lg p-5'>
            <div className="overflow-x-auto ">
  <table className="table">
    {/* head */}
    <thead className='bg-black text-whit py-4 rounded-l-md text-gray-50 uppercase'>
      <tr >
        <th>Title</th>
        <th>Date</th>
        <th>Views</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        properties.map((property,index)=>{
          return <tr>
       
          <td className='flex md:flex-row flex-col gap-2'>
            <img src={property.images[0]} className='w-32 rounded-lg' alt="" />
            <div className='space-y-2'>
              <h1 className='text-xl text-black font-semibold'>{property.title}</h1>
            <p className=''>{property.address}</p>
            <h1 className='text-xl text-black font-semibold'>${property?.propertyStatus.salePrice||property?.propertyStatus.rentAmount}</h1>
            </div>
          </td>
          <td>13 Jan,2023</td>
          <td>{property.views||0}</td>
          <td><h2 className='py-1 px-3 bg-[#bef3cb]  text-color_success text-center rounded-full capitalize'>{property.details.approveStatus.approve_status||'pending'}</h2></td>
           <td className='text-gray-700 hover:text-color_danger  text-end text-xl hover:cursor-pointer'><SlOptionsVertical></SlOptionsVertical> </td>
        </tr>
        
        })
      }
    
    </tbody>
  </table>
</div>

            </div>
            <div className='py-5 flex justify-center items-center'>
            <div className='flex items-center gap-2'>
            {
              pages.slice(currentPage-1,4).map((page,index)=><div className={`text-black px-3 py-1 ${currentPage === page && 'bg-black text-white  '} hover:cursor-pointer rounded-full`} onClick={()=>setCurrentPage(page)}>{page}</div>)
             }...
             <div className='text-2xl'><IoIosArrowRoundForward></IoIosArrowRoundForward></div>
            </div>
            </div>
        </div>
            
        </div>
    );
}

export default MyProperties;
