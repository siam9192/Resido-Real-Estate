import React, { useEffect, useState } from 'react';
import { TbShare3 } from "react-icons/tb";
import { FaLocationArrow, FaRegHeart } from "react-icons/fa";
import UserAuth from '../../Authentication/userAuth/userAuth';
import AxiosBase from '../../Axios/AxiosBase';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
const SideComponents = ({email}) => {
    const {user} = UserAuth();
    const [saveStatus,setSaveStatus] = useState('Save');
    const {id} = useParams();
    const [isSending,setSending] = useState(false);
    const [author,setAuthor] = useState({})
    const [featured,setFeatured] = useState([])
    const navigate = useNavigate();
    
    useEffect(()=>{
      if(user){
        AxiosBase().get(`/listing/single/isChecked?id=${id}&email=${user.email}`)
        .then(res=> {
            setSaveStatus(res.data.status)
        })
      }
    },[user])

    useEffect(()=>{
        AxiosBase().get('/property/recent')
        .then(res =>{
           setFeatured(res.data)
        })
    },[])
    useEffect(()=>{
        if(email){
            AxiosBase().get(`/find/property/author?email=${email}`,)
        .then(res =>{
            setAuthor(res.data)
        })
        }
    },[email])


    const sendMessage = (e)=>{
        e.preventDefault()
        setSending(true)
        const form = e.target;
        const from = form.email.value;
        const to = email;
        const phone = form.phone.value;
        const sub = form.sub.value;
        const description = form.description.value;
        const date ={
            time:{
              hour: new Date().getHours(),
              minute: new Date().getMinutes(),
              second: new Date().getSeconds()
            },
            day: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear()
           }
       if(!user){
       toast.error('Please Log in First')

       navigate('/login')
       
        return;
       }
        const message = {
            from,
            to,
            contact_phone:phone,
            sub,
            description,
            propertyId:id,
            status:'unread',
            date
        }
    //   AxiosBase().post('/listing/message/send',message)
    AxiosBase().post('/listing/message/send',message)
      .then(res=>{
        if(res.data.insertedId){
            setSending(false)
            Swal.fire({
                title: "Sending Successful",
                text: "Thank for your response!",
                icon: "success",
                iconColor: '#0d6efd',
                background:'#f3f7fd'
              });
            //   form.reset()

        }
        else{
            Swal.fire({
                title: "Sending unsuccessful=",
                text: "Something went wrong!",
                icon: "error",
                iconColor: '#0d6efd',
                background:'#f3f7fd'
              });
        }
      })
      .catch(err=>{
      
        setSending(false);
        Swal.fire({
            title: "Sending unsuccessful=",
            text: "Something went wrong!",
            icon: "error",
            iconColor: '#0d6efd',
            background:'#f3f7fd'
          });
      })
       
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

          <div className=' bg-color_primary p-5 rounded-t-lg'>
         
          <div className=' flex items-center gap-4'>
               
               <div>
                   <img src={author?.photo||'/images/defaultPic.png'} alt="" className='w-14 h-14 rounded-full'/>
               </div>
               <h1 className='text-3xl text-white font-bold'>{author?.name}</h1>
           </div>
          </div>
             <form className='bg-white p-5 space-y-3' onSubmit={sendMessage}>
             <div className='space-y-2'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Email</h3>
                        <input type="text" name='email' className='w-full py-4 px-2 border rounded-md bg-color_bg_green text-black '  value={user?.email||''} placeholder='Your Contact email' required/>
                        </div>
                        <div className='space-y-2'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Phone No.</h3>
                        <input type="text" name='phone' className='w-full py-4 px-2 border rounded-md bg-color_bg_green text-black '  placeholder='+01 990478787' required/>
                        </div>
                        <div className='space-y-2'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Subject.</h3>
                        <input type="text" name='sub' className='w-full py-4 px-2 border rounded-md bg-color_bg_green text-black '  placeholder='Message Subject' required/>
                        </div>
                        
                        <div className='space-y-2'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Description</h3>
                        <textarea type="text" name='description' className='w-full py-4 px-2 border rounded-md bg-color_bg_green text-black  min-h-[250px]'  placeholder='Im interested in this property'  required></textarea>

                        </div>
                        <button disabled={email===user?.email||isSending} className={`py-4 text-center w-full  font-semibold rounded-md ${email===user?.email ? 'bg-gray-200 text-black' : ' bg-color_primary text-white'}`}>{isSending? 'Just a moment..': 'Request Inquery'}</button>
             </form>
          
            </div>
            <div className='space-y-2'>
                <h1 className='text-xl font-semibold text-color_text_normal'>Featured Property</h1>
                <div className='space-y-2'>
                    {
                        featured.map((item,index)=>{
                            return<Link to={`/listings/property/details/${item._id}`}>
                             <div className='p-3 flex gap-2 bg-white rounded-md' key={index}>
                             <img src={item.images[0]} alt="" className='w-32 h-24 rounded-md'/>
                             <div className='space-y-1'>
                                <h1 className='text-xl font-semibold text-color_text_normal hover:text-color_primary hover:cursor-pointer'>{item.title}</h1>
                                <div className='flex items-center gap-2 text-[14px] text-gray-600'><FaLocationArrow></FaLocationArrow><p><h3>{item.details.address.address}</h3></p></div>
                                <div className='px-4 py-1 w-fit bg-[#e5f6f3] rounded-full text-color_success'>Buy</div>
                             </div>
                            </div>
                            </Link>
                        })
                    }
                </div>
             </div>
           
        </div>
    );
}

export default SideComponents;
