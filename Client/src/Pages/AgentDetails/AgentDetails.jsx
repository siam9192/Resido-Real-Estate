import React, { useEffect, useState } from 'react';
import WidthContainer from '../../Components/Reuse/WidthContainer/WidthContainer';
import Navbar from '../../Components/HomeComponents/Navbars/Navbar';
import Navbar2 from '../../Components/HomeComponents/Navbars/Navbar2';
import WantToBeAgent from '../../Components/HomeComponents/WantoBeAgent/WantToBeAgent'
import Footer from '../../Components/Reuse/Footer/Footer'
import axios from 'axios';
import { FaLocationArrow } from 'react-icons/fa6';
import { SlSocialFacebook } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { LuLinkedin } from "react-icons/lu";
import { BiSolidUserCircle } from "react-icons/bi";
const AgentDetails = () => {
    const [isNavbar,setIsNavbar] = useState(false);
    const [agent,setAgent] = useState({});
    useEffect(()=>{
        const handleScroll = ()=>{
          if(window.scrollY > 100){
            setIsNavbar(true);

          }
          else{
            setIsNavbar(false)
          }
          
          }
        window.addEventListener('scroll',handleScroll)
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
        },[scrollY])
        useEffect(()=>{
            axios.get('/Json/Agents.json')
            .then(res =>{
                setAgent(res.data[0])
            })
        },[])
        
    return (
        <div className='min-h-[120vh] font-jost bg-color_bg_green'>
           <div className='lg:block : hidden'><Navbar2 isNavbar={isNavbar}></Navbar2></div>
           <Navbar isNavbar={isNavbar}></Navbar>
            <div className='lg:py-14 md:py-10 py-20 bg-[#3f47b7] font-jost'>

            <WidthContainer>
<div>
    <h1 className='md:text-7xl text-5xl text-white font-bold'>Agent Details</h1>
    <h3 className='text-gray-200 pt-3'>Denial Parker From 3599 Huntz Lane </h3>
                </div>
            </WidthContainer>
       
            </div>
            <WidthContainer>
             <div className='lg:px-0 md:px-20 px-0'>
             <div className='p-5 bg-white flex lg:flex-row flex-col gap-10 rounded-md border -mt-14  shadow-lg'>
            <div>
                <img src={agent.image} alt="" className='lg:w-72 w-full rounded-lg' />
            </div>
            <div className='space-y-3'>
            <div className='space-y-2'>
                <h1 className='text-2xl text-color_text_normal font-bold'>{agent.name}</h1>
                <div className='flex items-center gap-2'><FaLocationArrow></FaLocationArrow><p><h3>{agent.location}</h3></p></div>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium sed fugit tenetur labore sint officia nam, quae iure, impedit voluptas qui suscipit reprehenderit reiciendis voluptates consequatur sit esse saepe quaerat!</p>

            </div>
            <div className='px-4 py-1 bg-[#ffedea] text-color_danger w-fit rounded-full'>{0} Property</div>
            <div className='flex items-center gap-3'>
                <div className='bg-gray-100 text-xl px-2 py-2 rounded-full'>
                    <FaInstagram></FaInstagram>
                </div>
                <div className='bg-gray-100 text-xl px-2 py-2 rounded-full'>
                    <FaXTwitter></FaXTwitter>
                </div>
                <div className='bg-gray-100 text-xl px-2 py-2 rounded-full'>
                   <LuLinkedin></LuLinkedin>
                   </div>
            </div>
            </div>
           
                </div>
             </div>

              <div className='lg:px-0 md:px-20 px-0'>
              <div className='flex lg:flex-row flex-col gap-5 py-20'>
                    <div className='lg:w-[70%]'>
                        <div className='bg-white rounded-lg shadow-lg p-10'>
                            <h1 className='text-color_text_normal font-bold text-xl pb-3 border-b'>Agent Info</h1>
                            <div className='grid lg:grid-cols-4 md:gap-14 gap-5 grid-cols-2 pt-5'>
                                <div>
                                    <h4 className='text-color_text_normal font-semibold'>Ceo</h4>
                                    <p className='text-color_primary'>{agent.name}</p>
                                </div>
                                <div>
                                    <h4 className='text-color_text_normal font-semibold'>Email</h4>
                                    <p className='text-color_primary'>{agent.email}</p>
                                </div>
                                <div>
                                    <h4 className='text-color_text_normal font-semibold'>Phone</h4>
                                    <p className='text-color_primary'>{9864563546}</p>
                                </div>
                                <div>
                                    <h4 className='text-color_text_normal font-semibold'>Skype</h4>
                                    <p className='text-color_primary'>78CR9C</p>
                                </div>
                         
                                <div>
                                    <h4 className='text-color_text_normal font-semibold'>Address</h4>
                                    <p className='text-color_primary'>{agent.location}</p>
                                </div>
                                <div>
                                    <h4 className='text-color_text_normal font-semibold'>City</h4>
                                    <p className='text-color_primary'>{'London'}</p>
                                </div>
                                <div>
                                    <h4 className='text-color_text_normal font-semibold'>Country</h4>
                                    <p className='text-color_primary'>Mr. Adam Vilawo</p>
                                </div>
                                <div>
                                    <h4 className='text-color_text_normal font-semibold'>Stab</h4>
                                    <p className='text-color_primary'>{2000}</p>
                                </div>
                            </div>
                         
                           
                        </div>
                    </div>
                    <div className='lg:w-[30%] space-y-5'>
                    <form className='bg-white rounded-md'>
                     <div className='px-5 py-8 bg-color_primary rounded-t-md'>
                        <div >
                        <div className='text-4xl text-white  flex justify-between'>
                        <BiSolidUserCircle ></BiSolidUserCircle>
                        <h1 className='font-semibold text-2xl capitalize'>5353w asdsadasd</h1>
                        </div>
                        </div>
                     </div>
                     <div>
                    <div className='py-3 px-5 space-y-3 '>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>name</h3>
                        <input type="text" name='name' className='w-full py-3 px-2 border rounded-md bg-color_bg_green text-black' placeholder='Your Name'/>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>email</h3>
                        <input type="text" name='email' className='w-full py-3 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Your Email'/>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>phone no:</h3>
                        <input type="text" name='phone' className='w-full py-3 px-2 border rounded-md bg-color_bg_green text-black' placeholder='+001 256637635'/>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Description</h3>
                        <textarea type="text" name='description' className='w-full py-3 px-2 border rounded-md bg-color_bg_green text-black min-h-[300px]'  placeholder='Description..'></textarea>
                        </div>
                    <button type='submit' className='w-full text-white py-3 bg-color_primary rounded-md'>Send Messege</button>
                    </div>
                     </div>
                    </form>
                    </div>
                </div>
              </div>
            </WidthContainer>
<WantToBeAgent></WantToBeAgent>
<Footer></Footer>
        </div>
    );
}

export default AgentDetails;
