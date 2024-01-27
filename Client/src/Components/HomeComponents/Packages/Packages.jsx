import React from 'react';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import SectionHeading from '../../Reuse/SectionHeading/SectionHeading';
import { IoMdCheckmark } from "react-icons/io";
const Packages = () => {
    const packages = [
        {
            package_name:'Standard Package',
            price:199,
            color:'#e5f6fe',
            features:{
                listing:{
                    total:50,
                    status:true
                },
                agent_contact:{
                    total:50,
                    status:true
                },
                oneYearValidity:{
                    status:true
                },
                support:{
                    status:true
                }
            }
        },
        {
            package_name:'Platinum Package',
            price:99,
            color:'#e9f8eb',
            features:{
                listing:{
                    total:50,
                    status:true
                },
                agent_contact:{
                
                    status:true
                },
                oneYearValidity:{
                    status:true
                },
                support:{
                    status:true
                }
            }
        },
        {
            package_name:'Basic Package',
            price:50,
            color:'#ffedea',
            features:{
                listing:{
                    total:15,
                    status:true
                },
                agent_contact:{
                   
                    status:true
                },
                oneYearValidity:{
                    status:true
                },
                support:{
                    status:false
                }
            }
        }
    ]
    return (
        <div className=' font-jost py-10'>
            <WidthContainer>
            <SectionHeading heading={'See our packages '} title={`"Discover Tailored Solutions: Explore Our Comprehensive Packages for Your Real Estate Journey – Unmatched Choices, Exceptional Value."`}></SectionHeading>

            <div className='py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    packages.map((pack,index)=>{
                        return <div className='p-2 border rounded-lg' key={index}>
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
                            <button className='bg-[#e7faf4] px-6 py-3 border-2 border-[#b5efdf] rounded-md  text-color_primary font-semibold text-xl'>Chose Plane</button>
                          </div>
                        </div>
                    })
                }
            </div>
            </WidthContainer>
            
        </div>
    );
}

export default Packages;
