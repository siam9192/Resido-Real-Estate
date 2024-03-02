import React, { useEffect, useState } from 'react';
import { BsHouses } from "react-icons/bs";
import { TbHomeStats } from "react-icons/tb";
import { LuBookmarkMinus } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaList,FaStar} from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import AxiosBase from '../../../../Axios/AxiosBase';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
const DashboardListing = () => {
    const [listings,setListing] = useState([])

    const {user} = UserAuth();

   useEffect(()=>{
    if(user){
        AxiosBase().get(`/listing/user/recent/${user?.email}`)
        .then(res =>{
            setListing(res.data)
        })
    }
   },[user])

 
    return (
        <div className=' bg-white shadow-xl font-pop p-5'>
        <h1 className='text-black text-2xl '>Listing</h1>
        <div className='pt-10'>
        <div className="overflow-x-auto">
{
    listings.length ?
    <table className="table text-xl  ">
{/* head */}
<thead className='text-black text-xl'>
  <tr>
    <th>Listing Name</th>
    <th>Posted Date</th>
    <th>Status</th>
    <th>Edit</th>
  </tr>
</thead>
<tbody className='max-h-[250px] overflow-y-auto'>
  
  {
    listings.map((listing,index)=>{
        return <tr className="hover:bg-base-200" key={index}>
        <td>{listing.title}</td>
        <td>23 Jan 2020</td>
     
        <td>{listing.details.approveStatus.approve_status}</td>
        <td><MdOutlineModeEdit className='text-[#ff385c]'></MdOutlineModeEdit></td>
      </tr>
    })
  }
 
</tbody>
</table>
:
<div className=' py-14 text-center text-color_text_normal text-3xl font-semibold'>No recent Listing</div>
}
</div>
        </div>
        </div>
    );
}

export default DashboardListing;
