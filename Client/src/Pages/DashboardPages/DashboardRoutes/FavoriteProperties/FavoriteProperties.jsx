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
    },[user])
    
    const handleRemove = (id,index)=>{
     
        AxiosBase().delete(`/user/listings/favourite/remove/${id}`)
        .then(res =>{
          if(res.data.deletedCount>0){
            const arr = [...listings];
            arr.splice(index,1);
            setListings([...arr])
            
          }
        })
    }
    return (
        <div className='p-5 font-jost'>
            <h1 className='text-3xl text-black font-semibold'>Favourites</h1>
            {
              FavoriteProperties.length === 0 ?
              <div className='min-h-[50] py-32'>
                <h1 className='text-4xl text-gray-700 font-semibold  text-center'>You have no favourites</h1>
              </div>
              :
              <div className='py-5 grid grid-cols- gap-5'>
                {
                    listings.map((list,index)=>{
                        return <div className='relative'><ListCard  property={list} key={index}></ListCard>
                        <div className='absolute right-2 top-2 text-3xl text-black hover:cursor-pointer hover:text-red-500' onClick={()=>handleRemove(list._id,index)}>
                        <CiSquareRemove></CiSquareRemove>
                        </div>
                        
                            
                        </div>
                    })
                }
            </div>
            }
        </div>
    );
}

export default FavoriteProperties;
