import React from 'react';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import SectionHeading from '../../Reuse/SectionHeading/SectionHeading';
import PackageCard from './PackageCard';
const Packages = () => {
    const packages = [
        {
            package_name:'Standard Package',
            price:199,
            color:'#e5f6fe',
            features:{
                listing:{
                    total:130,
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
                        return <PackageCard pack={pack} key={index}></PackageCard>
                     
                    })
                }
            </div>
            </WidthContainer>
            
        </div>
    );
}

export default Packages;
