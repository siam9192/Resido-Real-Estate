import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react';
import { BsGrid } from "react-icons/bs";
import { CiCircleList } from "react-icons/ci";

import GridCard from '../../Components/Reuse/Cards/GridCard';
import ListCard from '../../Components/Reuse/Cards/ListCard';
import AxiosBase from '../../Axios/AxiosBase';
import { createSearchParams, useNavigate } from 'react-router-dom';
const MainListBox = ({params,currentPage,setCurrentPage}) => {
    const [cardType,setCardType] = useState('grid') ;
    const[ properties,setProperties ] = useState([])
    const [isLoading,setLoading] = useState(false)
    const [pages,setPages] = useState([]);
    const [perPage,setPerPage] = useState(10);
    const [propertyCount,setPropertyCount] = useState(0)
    const [error,setError] = useState('')
    const navigate = useNavigate();
    const mainListRef = useRef();
    const [sortBy,setSortBy] = useState('');
    useEffect(()=>{
        setCardType(localStorage.getItem('card-type'|| 'grid') )
        mainListRef.current.scrollIntoView({behavior:'smooth'})
        setLoading(true)
        AxiosBase().get(`/properties/get/${currentPage}?key=${params[0][1].join(',')}&locations=${params[1][1].join(',')}&types=${params[2][1].join(',')}&status=${params[3][1].join(',')}&features=${params[4][1].join(',')}&sort=${sortBy}`)
        .then(res =>{
            setProperties(res.data.properties)
            const document = res.data.document;
            const pageCount = Math.ceil(document/6);
            const array = [];
            for(let i = 1; i <= pageCount; i++){
                array.push(i)
            }
            setPages(array)
            setPropertyCount(document)
            setLoading(false)
        })
        .catch(err=>{
            setLoading(false)
            setError('Something went wrong please try again')

        })
    },[params,currentPage,sortBy])
    const handleCardType = (value)=>{
        setCardType(value);
        localStorage.setItem('card-type',value)
    }

   const handleSortBy = (e)=>{
    setSortBy(e.target.value);
   }
    return (
        <div className=' font-jost' ref={mainListRef}>
            <div className='flex lg:flex-row flex-col justify-between lg:items-center lg:gap-0 gap-3'>
                <h1 className='text-2xl text-color_text_normal font-bold'>Showing {(currentPage-1)*4+properties.length} of {propertyCount} Results</h1>
                <div className='flex items-center gap-3'>
            <select name="" id="" className='bg-white  md:px-6 md:py-4 px-4 py-2 border-2 border-color_primary rounded-md' onChange={handleSortBy}>
                {/* <option value="l-h-r">Low to High(Rent)</option>
                <option value="l-h-s">Low to High(Sale)</option>
                <option value="h-l-r">High to Low (Rent)</option>
                <option value="h-l-s">High to Low (Sale)</option> */}
                   <option value="">Short By</option>
                <option value="date">By Date</option>
                <option value="views">By Views</option>
            </select>
            <div className={`md:text-2xl text-xl md:px-6 md:py-4 px-4 py-2 border-color_primary border-2 ${cardType === 'grid' ? ' text-color_info': ''} rounded-md hover:cursor-pointer`} onClick={()=>handleCardType('grid')}>
                    <BsGrid></BsGrid>
                </div>
                <div className={`md:text-2xl text-xl md:px-6 md:py-4 px-4 py-2 border-color_primary border-2 ${cardType === 'list' ? ' text-color_info': ''} rounded-md cursor-pointer`} onClick={()=>handleCardType('list')}>
                    <CiCircleList></CiCircleList>
                </div>
                </div>

            </div>
            
   <div className='min-h-[70vh]'>

   {
        isLoading ? 
          <div className='py-20 md:py-32 text-center text-5xl'>
           <span className="loading loading-spinner loading-lg text-color_primary"></span>
          </div>
        :
      <>
      {
        !properties.length ?
        <div className='lg:py-52 py-32 text-center text-4xl text-color_text_normal font-semibold font-jost'>
            No results found
        </div>
        :

        <>
        {
               cardType === 'grid' ?
               <div className='py-5 grid lg:grid-cols-2 grid-cols-1 gap-10'>
               {
                   properties.map((property,index)=>{
                       return <GridCard property={property} key={index}></GridCard>
                   })
               }
           </div>
           :
           <div className='py-5 grid grid-cols-1 gap-10'>
           {
               properties.map((property,index)=>{
                   return <ListCard property={property} key={index}></ListCard>
               })
           }
       </div>
           }
        </>
      }
      </>
      }
   </div>
           
      {
        properties.length &&    <div className='pt-5 flex justify-center items-center'>
        <div className='flex items-center gap-2'>
        {
            pages.map((page,index)=>{
                return <div className={`px-4 py-2 hover:cursor-pointer ${currentPage === page ? 'bg-color_primary': 'bg-black'}  text-white shadow-lg rounded-md`} key={index} onClick={()=>setCurrentPage(page)}>{page}</div>
            })
        }
        </div>
       
     </div>
      }
         
        </div>
    );
}

export default MainListBox;
