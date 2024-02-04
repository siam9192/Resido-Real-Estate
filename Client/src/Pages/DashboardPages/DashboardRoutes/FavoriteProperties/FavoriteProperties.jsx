import React, { useEffect, useState } from 'react';
import AxiosBase from '../../../../Axios/AxiosBase';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import GridCard from '../../../../Components/Reuse/Cards/GridCard';
import ListCard from '../../../../Components/Reuse/Cards/ListCard';
import { CiSquareRemove } from "react-icons/ci";
const FavoriteProperties = () => {
    const [listings,setListings] = useState([]);
    const [refetch,setRefetch] = useState(false);
    const {user} = UserAuth();

    useEffect(()=>{
      if(user){
        AxiosBase().get(`/user/listings/favourite?email=${user?.email}`)
        .then(res=>{
            setListings(res.data)
        })
      }
    },[user,refetch])
    
    const handleRemove = (id)=>{
        AxiosBase().delete('/user/listings/favourite/remove',{id})
        .then(res =>{
          if(res.data.deletedCount>0){
            setRefetch(!refetch);
          }
        })
    }
    return (
        <div className='p-5 font-jost'>
            <h1 className='text-3xl text-black font-semibold'>Favourites</h1>
            <div className='py-5 grid grid-cols- gap-5'>
                {
                    listings.map((list,index)=>{
                        return <div className='relative'><ListCard  property={list} key={index}></ListCard>
                        <div className='absolute right-2 top-2 text-3xl text-black hover:cursor-pointer hover:text-red-500' onClick={()=>handleRemove(list._id)}>
                        <CiSquareRemove></CiSquareRemove>
                        </div>
                        
                            
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default FavoriteProperties;
