import React, { useEffect, useState } from 'react';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import AxiosBase from '../../../../Axios/AxiosBase';
import { Helmet } from 'react-helmet';

const Message = () => {
    const [activeIndex,setActiveIndex] = useState(0)
    const [inboxMessages,setInboxMessages] = useState([])
    const {user} = UserAuth();
    const messages =    [
        {
          "name": "Elijah Turner",
          "email": "elijah.turner@example.com",
          "description": "Interested in exploring new technologies and enhancing my programming skills.",
          status:'read'
        },
        {
          "name": "Isabella Carter",
          "email": "isabella.carter@example.com",
          "description": "Passionate about environmental sustainability and seeking opportunities to make a positive impact.",
          status:'unread'
        },
        {
          "name": "Gabriel Brooks",
          "email": "gabriel.brooks@example.com",
          "description": "Aspiring graphic designer with a keen eye for detail and a love for creative expression.",
          status:'read'
        },
        {
          "name": "Zoe Richardson",
          "email": "zoe.richardson@example.com",
          "description": "Dedicated fitness enthusiast and nutrition advocate, aiming to inspire a healthy lifestyle.",
          status:'unread'
        },
        {
          "name": "Caleb Parker",
          "email": "caleb.parker@example.com",
          "description": "Experienced project manager with a track record of successfully delivering complex initiatives on time and within budget.",
          status:'read'
        },
        {
          "name": "Mia Thompson",
          "email": "mia.thompson@example.com",
          "description": "Curious traveler and amateur photographer, documenting the beauty of diverse cultures and landscapes.",
          status:'unread'
        },
        {
          "name": "David Lewis",
          "email": "david.lewis@example.com",
          "description": "Motivated social entrepreneur dedicated to creating sustainable solutions for community development.",
          status:'read'
        },
        {
          "name": "Avery White",
          "email": "avery.white@example.com",
          "description": "Tech enthusiast with a passion for artificial intelligence and machine learning, always eager to learn and",
          status:'read' 
        }
        ]
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
     useEffect(()=>{
      if(user){
      AxiosBase().get(`/users/inbox/messages/get?email=${user.email}`)
      .then(res =>{
        setInboxMessages(res.data);
      })
    
      }
     },[user])
    const updateStatus = (status,id,index)=>{
      if(status === 'unread'){
        AxiosBase().put('/update/messages/status',{id})
      .then(res =>{
       if(res.data.modifiedCount  > 0){
        const arr = [...inboxMessages];
       arr[index].status = 'read';
       setInboxMessages(arr)
       }
      
      })
      }
    }
    return (
    <>
    <Helmet>
     <title>Dashboard || Messages</title>
    </Helmet>
    <div className='py-10 px-5 font-jost'>
            <h1 className='text-2xl text-black font-semibold'>Message</h1>

            <div className='my-5  bg-white rounded-lg lg:flex '>
                <div className=' lg:w-[40%] border-r px-2'>
                   <div className='py-5 border-b space-y-2'>
                   <h1 className=' font-semibold text-xl'>Inbox</h1>
                   <input type="text" className=' w-full p-2 border rounded-lg' placeholder='Search' />
                   </div>
                   <div className='pt-2 space-y-3 h-[450px] overflow-y-auto'>
                    {
                        inboxMessages.map((message,index)=>{
                            return <div className={`space-y-2 hover:cursor-pointer ${index === activeIndex ? 'bg-gray-100 border-l-4 border-l-black' : 'bg-white'} p-5`} onClick={()=>
                              {
                                setActiveIndex(index)
                              updateStatus(message.status,message._id,index)
                              }
                            } key={index} >
                                 <div className='flex justify-between items-center'>
                                    <div className='space-y-1'>
                                    <div className='flex items-center gap-2'>
                                    <div className={`w-3 h-3 rounded-full ${message.status=='read'? ' bg-color_success': ' bg-color_danger'}`}></div>
                                    <h2 className=' font-semibold text-black'>{message.sender.name}</h2>
                                    </div>
                                   
                                 <h3 className='text-gray-600'>{message.email}</h3>
                                    </div>
                                    <h2 className='text-[14px]'>{message.date.day}-{monthNames[message.date.month]}-{message.date.year}</h2>
                                 
                                 </div>
                                 <p>{message.description.slice(0,90)}...</p>
                            </div>
                        })
                    }
                   </div>
                </div>
                <div className='lg:w-[60%] '>
                  {
                    inboxMessages.length ?
                    <>
                      <div className='py-6 px-3 border-b'>
                     <div className='flex items-center gap-2'>
                        <img src={inboxMessages[activeIndex]?.sender?.photo||"/images/defaultPic.png"} alt="" className='w-14 h-14 rounded-full' />
                        <div className='space-y-1'>
                            <h1 className='text-xl text-black font-semibold'>{inboxMessages[activeIndex].sender.name}</h1>
                            <h3>{inboxMessages[activeIndex].from}</h3>
                        </div>
                     </div>
                  
                    </div>
                    <div className='space-y-4 px-2 pt-3 border-t'>
                        <h1 className='text-2xl text-black font-semibold'>{inboxMessages[activeIndex].sub}</h1>
                        <p>{inboxMessages[activeIndex].description}</p>
                        <div className='space-y-1 py-2'>
                          <p className='font font-semibold'>{inboxMessages[activeIndex].sender.name}</p>
                          <p className='font font-semibold'>{inboxMessages[activeIndex].from}</p>
                          <p className='font font-semibold'>{inboxMessages[activeIndex].contact_phone}</p>
                        </div>
                        {/* <div className=' w-full border rounded-md'>
                            <div className='p-2 border-b'>
                                <h1>To : {inboxMessages[activeIndex].email}</h1>
                               
                            </div>
                            <div className='py-5 px-2'>
                                   <textarea  className='w-full min-h-[200px] border-none outline-none resize-none' placeholder='Replay messages'></textarea>
                                   <div className='flex justify-end text-white'>
                                        <button className=' bg-color_primary px-6 py-2'>Send</button>
                                    </div>
                                    </div>
                                   
                        </div> */}
                     </div>
                    </>
                    :
                    <div className=''>
                      No Messages
                    </div>
                  }
                </div>
            </div>
            
        </div>
    </>
    );
}

export default Message;
