import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsGrid } from "react-icons/bs";
import { CiCircleList } from "react-icons/ci";
import GridCard from '../../Components/Reuse/Cards/GridCard';
import ListCard from '../../Components/Reuse/Cards/ListCard';
const MainListBox = () => {
    const [cardType,setCardType] = useState('grid') ;
    const[ properties,setProperties ] = useState([])
    const [pages,setPages] = useState([1,2,3,4])
    useEffect(()=>{
        setCardType(localStorage.getItem('card-type'|| 'grid') )
        axios.get('/Json/Properties.json')
        .then(res =>{
            setProperties(res.data)
        })
    },[])
    const handleCardType = (value)=>{
        setCardType(value);
        localStorage.setItem('card-type',value)
    }
    return (
        <div className=' font-jost'>
            <div className='flex lg:flex-row flex-col justify-between lg:items-center lg:gap-0 gap-3'>
                <h1 className='text-2xl text-color_text_normal font-bold'>Showing 12 of 18 Results</h1>
                <div className='flex items-center gap-3'>
            <select name="" id="" className='bg-white  md:px-6 md:py-4 px-4 py-2 border-2 border-color_primary rounded-md'>
                <option value="">Low to High</option>
                <option value="">Low to High</option>
                <option value="">Low to High</option>
            </select>
            <div className={`md:text-2xl text-xl md:px-6 md:py-4 px-4 py-2 border-color_primary border-2 ${cardType === 'grid' ? ' text-color_info': ''} rounded-md`} onClick={()=>handleCardType('grid')}>
                    <BsGrid></BsGrid>
                </div>
                <div className={`md:text-2xl text-xl md:px-6 md:py-4 px-4 py-2 border-color_primary border-2 ${cardType === 'list' ? ' text-color_info': ''} rounded-md`} onClick={()=>handleCardType('list')}>
                    <CiCircleList></CiCircleList>
                </div>
                </div>

            </div>
            
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
           
         <div className='pt-5 flex justify-center items-center'>
            <div className='flex items-center gap-2'>
            {
                pages.map((page,index)=>{
                    return <div className='px-4 py-2 bg-white text-color_text_normal shadow-lg' key={index}>{page}</div>
                })
            }
            </div>
           
         </div>
         
        </div>
    );
}

export default MainListBox;
