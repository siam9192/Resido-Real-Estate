import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

const Membership = () => {
    const currentPackage =   {
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
    }
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
        <div className='lg:p-5 p-2 space-y-10 font-jost'>
         <div  className='px-5 border-2 border-black flex lg:flex-row flex-col rounded-lg'>
            <div className='lg:w-[60%] lg:border-r-2 lg:border-b-0 border-b-2 pr-5 border-black py-10'>
            <h2 className='text-xl text-black'>Current Plane</h2>
            <h1 className='text-4xl text-black'>{currentPackage.package_name}</h1>
            <p className='mt-3'>Unlimited access to our legal document library and online rental application tool, billed monthly.</p>
            </div>
            <div className='lg:w-[40%] px-2 py-10 flex items-center gap-2'>
       
            <h1 className='text-6xl font-bold text-black'>${currentPackage.price}</h1>
            <div className='space-y-2'>
                <h1 className='text-black text-xl font-semibold'>Monthly Plane</h1>
                <p className='text-color_warning'>Your subscription renews July 12th, 2023</p>
            </div>
            <div>

            </div>
            </div>
            </div>    
            <div className='py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    packages.map((pack,index)=>{
                        return <div className='p-2 border rounded-lg bg-white' key={index}>
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
        </div>
    );
}

export default Membership;
