import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { IoIosArrowRoundForward } from "react-icons/io";
import AxiosBase from '../../../../Axios/AxiosBase'
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const MyProperties = () => {
    const [properties,setProperties] = useState([]);
    const shortBy = ['Newest','Views H-L','Views L-H','Price H-L','Price L-H']
    const [pages,setPages] = useState([])
    const [currentPage,setCurrentPage] = useState(1);
    const [activeOptionBar,setActiveOptionBar] = useState(null);
    const [sort,setSort] = useState('')
    const [perPage,setPerPage] = useState(5);
    const {user} = UserAuth()
    const shortingTypes = [{
      display:'Views Low-High',
      value:'v-l-h'
    },{
      display:'Views High-Low',
      value:'v-h-l'
    },{
      display:'Added Date',
      value:'date'
    },]
    useEffect(()=>{
        if(user){
          AxiosBase().get(`user/listings?email=${user.email}&sort=${sort}&currentPage=${currentPage}&perPage=${perPage}`)
        .then(res => {
          setProperties(res.data.data)

          const count = res.data.count
         
          const totalPage = Math.ceil(count/perPage);
          const arr = [];
          for (let x = 1;x<=totalPage;x++){
            arr.push(x)
          }

          setPages(arr)
        })
        }
    },[user,sort,currentPage ])
    console.log(sort)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   const handleOptionBar = (value)=>{
   setActiveOptionBar(value)
   }

   const handleDelete = (id)=>{
    setActiveOptionBar(null)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background:"#000000",
      color:"#ffffff"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your property has been deleted.",
          icon: "success",
          background:"#000000",
          color:"#ffffff"
        });
      }
    });
   }
   
    return (
     <>
     <Helmet>
        <title>Dashboard || {user?.displayName}'s Properties</title>
     </Helmet>
     
     <div className='font-jost lg:p-5 p-2'>
        <h1 className='lg:text-5xl text-3xl text-black'>My Properties</h1>
        <div className='pt-10 space-y-10'>
            <div className='flex md:justify-between md:flex-row flex-col lg:gap-0 gap-4 md:items-center'>
                <p className='lg:text-normal text-xl'>Showing {properties.length} results</p>
                <div className='flex items-center gap-2'><p className=''>Short by</p> <select className='border border-black p-2 rounded-full' onChange={(e)=>setSort(e.target.value)}>
                  <option value="">Filter Default</option>
                    {
                     shortingTypes.map((item,index)=><option value={item.value} key={index}>{item.display}</option>)
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
        <th>Action</th>r
      </tr>
    </thead>
    <tbody>
      {
        properties.map((property,index)=>{
          return <tr className='relative'>
       
          <td className='flex md:flex-row flex-col gap-2'>
            <img src={property.images[0]} className='w-32 rounded-lg' alt="" />
            <div className='space-y-2'>
              <h1 className='text-xl text-black font-semibold'>{property.title}</h1>
            <p className=''>{property.address}</p>
            <h1 className='text-xl text-black font-semibold'>${property?.propertyStatus.salePrice||property?.propertyStatus.rentAmount}</h1>
            </div>
          </td>
          {
            property.date ? 
            <td>{property.date.day} {monthNames[property.date.month]},{property.date.year}</td>
            :
            <td>Missing</td>
          }
          <td>{property.views||0}</td>
          <td><h2 className='py-1 px-3 bg-[#bef3cb]  text-color_success text-center rounded-full capitalize'>{property.details.approveStatus.approve_status||'pending'}</h2></td>
           <td ><div className='text-gray-700 hover:text-color_danger  text-end text-xl hover:cursor-pointer ' onClick={()=>activeOptionBar===index ? setActiveOptionBar(null) : handleOptionBar(index)} >
           <SlOptionsVertical ></SlOptionsVertical> 
           </div>
           <div className={`bg-white absolute top-20 h-fit right-4 z-40 shadow-md flex flex-col gap-3 p-3 -bottom-2 ${activeOptionBar===index?'block' : 'hidden'}`}>
           <Link to={`/listings/property/details/${property._id}`} className=' hover:text-color_primary'><button>View</button></Link>
            {/* <button>Pause</button> */}
            <button onClick={()=>handleDelete(property._id)}>Delete</button>
           </div>
           </td>
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
              pages.map((page,index)=><div key={index} className={`text-black px-3 py-1 ${currentPage === page && 'bg-black text-white  '} hover:cursor-pointer rounded-full`} onClick={()=>setCurrentPage(page)}>{page}</div>)
             }...
             {/* <div className='text-2xl'><IoIosArrowRoundForward></IoIosArrowRoundForward></div> */}
            </div>
            </div>
        </div>
            
        </div>
     </>
    );
}

export default MyProperties;
