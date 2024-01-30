import React, { useEffect, useState } from 'react';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import axios from 'axios';
import GridCard from '../../../../Components/Reuse/Cards/GridCard';

const Profile = () => {
    const {user} = UserAuth();
    const [properties,setProperties] = useState([])
    const [tabIndex,setTabIndex] = useState(0);
    const tabs=['About Me','Edit Profile']
    const handleTab = (index)=>{
        setTabIndex(index)
    }

    const skills = ['React Js','Redux','Next Js','Php','Laravel','My Sql']
    const languages = ['Bangla','English','French']


    useEffect(()=>{
        axios.get('/Json/Properties.json')
        .then(res => setProperties(res.data))
    },[])
    return (
        <div className='lg:p-5 p-2 font-jost space-y-10'>

            <div className='p-5 bg-white rounded-lg'><h1 className='text-xl font-semibold text-color_text_normal'>Dashboard / Profile</h1></div>
            <div className='p-5 bg-white rounded-lg  shadow-main'>
                <img src="https://griya.dexignzone.com/react/demo/static/media/cover.3b17b4bcd4008640868a.jpg" alt="" className='md:h-[250px] h-[200px]  w-full rounded-xl'/>
                <div className='flex md:flex-row flex-col items-cente gap-5 px-10'>
                    <div>
                        <img src="https://griya.dexignzone.com/react/demo/static/media/profile.99a9e3bfca0a776976ac.png" alt="" className='w-20 h-20 -mt-8 rounded-full
                        ' />
                       
                    </div>
                    <div className='space-y-1 mt-2'>
                            <h1 className='text-color_primary font-semibold text-xl'>{user?.displayName||'Mitchell C. Shay'}</h1>
                            <h2>Digital Marketer</h2>
                        </div>
                        <div className='mt-2 space-y-1'>
                            <h2 className='text-gray-600 text-xl'>hello@email.com</h2>
                            <h3>Email</h3>
                        </div>
                </div>
            </div>
            <div className='md:grid grid-cols-6 gap-5 md:space-y-0 space-y-5'>
                <div className=' col-span-4 bg-white p-5 shadow-main rounded-lg'>
                    <div className='flex items-center gap-5 pb-5'>
                        {
                            tabs.map((tab,index)=>{
                                return <div className={`${tabIndex === index ? ' text-color_primary border-b-2' : ''} font-semibold hover:cursor-pointer`} onClick={()=>handleTab(index)} key={index}>
                                 {tab}
                                </div>
                            })
                        }
                    </div>
                    <div className='mt-5 space-y-3'>
                  <div className='space-y-2'>
                  <h1 className=' text-color_primary text-xl font-semibold'>About Me</h1>
                        <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence was created for the bliss of souls like mine.I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.

A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p>
                  </div>
                  <div className='space-y-2'>
                  <h1 className=' text-color_primary text-xl font-semibold'>Skills</h1>
                     <div className='flex items-center flex-wrap gap-3'>
                    {
                        skills.map((skill,index)=>{
                            return <div className=' bg-color_bg_green hover:bg-color_primary text-color_primary hover:text-white px-4 py-1 rounded-full text-center hover:cursor-pointer' key={index}>{skill}</div>
                        })
                    }
                     </div>
                  </div>
                  <div className='space-y-2'>
                  <h1 className=' text-color_primary text-xl font-semibold'>Language</h1>
                     <div className='flex items-center gap-3'>
                    {
                        languages.map((language,index)=>{
                            return <div className='  hover:bg-color_primary  hover:text-white px-4 py-1 rounded-full text-center hover:cursor-pointer' key={index}>{language}</div>
                        })
                    }
                     </div>
                  </div>
                  <div className='space-y-2'>
                  <h1 className=' text-color_primary text-xl font-semibold'>Personal Information</h1>
                       <div className='space-y-3'>
                        <h1 className='text-black font-semibold'>Email: <span className='text-[12px] text-gray-600'>x@gmail.com</span></h1>
                        <h1 className='text-black font-semibold'>Phone: <span className='text-[12px] text-gray-600'>019376436</span></h1>
                        <h1 className='text-black font-semibold'>City: <span className='text-[12px] text-gray-600'>Dhaka</span></h1>
                        <h1 className='text-black font-semibold'>Address: <span className='text-[12px] text-gray-600'>23-Mirpur-14,Dhaka,Bangladesh</span></h1>
                        
                       </div>
                  </div>
                    </div>
                </div>
                <div className=' col-span-2 bg-white p-5 shadow-main rounded-lg  '>
                    <h1 className='text-xl font-semibold text-color_text_normal pb-3'>Recent Property</h1>
                   <div className='md:space-y-3 md:max-h-[700px] overflow-y-auto md:grid-cols-none grid grid-cols-1 gap-5'>
                   {
                        properties.map((property,index)=><GridCard property={property} key={index}></GridCard>)
                    }
                   </div>
                </div>
                
            </div>
            
         
        </div>
    );
}

export default Profile;
