import React, { useEffect, useState } from 'react';
import { TbShare3 } from "react-icons/tb";
import { FaLocationArrow, FaRegHeart } from "react-icons/fa";
import UserAuth from '../../Authentication/userAuth/userAuth';
import AxiosBase from '../../Axios/AxiosBase';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const SideComponents = () => {
    const {user} = UserAuth();
    const [saveStatus,setSaveStatus] = useState('Save');
    const {id} = useParams();


    useEffect(()=>{
      if(user){
        AxiosBase().get(`/listing/single/isChecked?id=${id}&email=${user.email}`)
        .then(res=> {
            setSaveStatus(res.data.status)
        })
      }
    },[user])


    const sendMessage = (e)=>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const phone = form.phone.value;
        const description = form.description.value;
       if(!user){
       toast.error('Please Log in First')
        return;
       }
        const Message = {
            email,
            phone,
            description
        }
        console.log(Message)
    }
  
    const saveProperty = ()=>{
        if(!user){
            return;
        }
        const saved = {
            email:user?.email,
            listingId: id
        }
        AxiosBase().post('/listing/single/save/favourites',saved)

        .then(res =>{
            if(res.data.insertedId){
                toast.success('Saved successfully')
                setSaveStatus('Saved')
            }
        })
    }
    const arr = [1,1,1,1,1,1,]
    return (
        <div className='font-jost space-y-5'>
            <div className='p-5 flex items-center justify-between bg-white rounded-lg gap-3 text-black'>
                <button className='w-full flex items-center justify-center gap-2 py-3 text-color_success bg-[#e5f6f3] rounded-md border border-color_success'><TbShare3></TbShare3><p>Share</p></button>
                <button className='w-full flex items-center justify-center gap-2 py-3 bg-[#feeee5] rounded-md  border border-color_danger text-color_danger' disabled={saveStatus==='Saved'} onClick={saveProperty}><FaRegHeart></FaRegHeart><p>{saveStatus}</p></button>
            </div>
            <div className='rounded-lg'>
            <div className='bg-color_primary p-5 rounded-t-lg flex items-center gap-4'>
                <div>
                    <img src="https://secure.gravatar.com/avatar/2a3143731035ae410bc1f9ac463b7681?s=120&d=mm&r=g" alt="" className='w-14 h-14 rounded-full'/>
                </div>
                <h1 className='text-3xl text-white font-bold'>{user?.displayName}</h1>
            </div>
             <form className='bg-white p-5 space-y-3' onSubmit={sendMessage}>
             <div className='space-y-2'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Email</h3>
                        <input type="text" name='name' className='w-full py-4 px-2 border rounded-md bg-color_bg_green text-black ' readOnly={user?.email} value={user?.email||''} placeholder='Your Name' required/>
                        </div>
                        <div className='space-y-2'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Phone No.</h3>
                        <input type="text" name='name' className='w-full py-4 px-2 border rounded-md bg-color_bg_green text-black '  placeholder='+01 990478787' required/>
                        </div>
                        
                        <div className='space-y-2'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Description</h3>
                        <textarea type="text" name='name' className='w-full py-4 px-2 border rounded-md bg-color_bg_green text-black  min-h-[250px]'  placeholder='Im interested in this property'  required></textarea>

                        </div>
                        <button className='py-4 text-center w-full text-white font-semibold rounded-md bg-color_primary'>Send Message</button>
             </form>
          
            </div>
            <div className='space-y-2'>
                <h1 className='text-xl font-semibold text-color_text_normal'>Featured Property</h1>
                <div className='space-y-2'>
                    {
                        arr.map((item,index)=>{
                            return <div className='p-3 flex gap-2 bg-white rounded-md' key={index}>
                             <img src="https://resido-v2.smartdemowp.com/wp-content/uploads/2022/07/p-4.jpg" alt="" className='w-32 h-24 rounded-md'/>
                             <div className='space-y-1'>
                                <h1 className='text-xl font-semibold text-color_text_normal hover:text-color_primary hover:cursor-pointer'>Westchester Village</h1>
                                <div className='flex items-center gap-2 text-[14px] text-gray-600'><FaLocationArrow></FaLocationArrow><p><h3>{'3599 Huntz Lane '}</h3></p></div>
                                <div className='px-4 py-1 w-fit bg-[#e5f6f3] rounded-full text-color_success'>Buy</div>
                             </div>
                            </div>
                        })
                    }
                </div>
             </div>
             <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </div>
    );
}

export default SideComponents;
