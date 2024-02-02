import React, { useEffect, useRef, useState } from 'react';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import axios from 'axios';
import GridCard from '../../../../Components/Reuse/Cards/GridCard';
import AxiosBase from '../../../../Axios/AxiosBase';
import storage from '../../../../Authentication/Firebase/Firebase.storage.config';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateCurrentUser, updateProfile } from 'firebase/auth';
import auth from '../../../../Authentication/Firebase/Firebase.config';

const Profile = () => {
    const {user} = UserAuth();
    const [properties,setProperties] = useState([])
    const [tabIndex,setTabIndex] = useState(0);
    const [profileDetails,setProfileDetails] = useState({});
    const imageInput = useRef();
    const [changedImage,setChangedImage] = useState([])
    const tabs=['About Me','Edit Profile']
    const handleTab = (index)=>{
        setTabIndex(index)
    }

    const skills = ['React Js','Redux','Next Js','Php','Laravel','My Sql']
    const languages = ['Bangla','English','French']
    const socialAccounts   = [
        {
         platform:'Facebook',

        }
    ]

    useEffect(()=>{
       if(user){
        AxiosBase().get(`/user/listings/recent?email=${user.email}`)
        .then(res => setProperties(res.data))
        AxiosBase().post(`/user/profile/get`,{email:user.email})
        .then(res =>{
            setProfileDetails(res.data)
        })
       }
    },[user])

    const handleSave = async(e)=>{
        e.preventDefault();
        const form = e.target;
        const firstName =  form.firstName.value;
        const lastName = form.lastName.value;
        const about = form.about.value;
        const contact = {
            email:form.email.value,
            phone: form.phone.value,
            website:form.website.value,
            about: form.about.value,
            address: form.address.value,
            city:form.city.value
        }
        const updatedDoc = {
            firstName,
            lastName,about,contact
        }
        console.log(updatedDoc)
    }
    // YourModel.find().sort({ _id: -1 }).limit(5)
    const changeImage = ()=>{
    imageInput.current.click()
    }
    const handleChangedImage = (e)=>{
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setChangedImage([file,url])
    }

    const handleUpdateProfile = (e)=>{
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const aboutSelf = form.aboutSelf.value
        const contact = {
            email:form.email.value,
            phone:form.phone.value,
            social:{
                linkedin:form.linkedin.value,
                facebook:form.facebook.value,
                twitter: form.twitter.value,
                instagram:form.instagram.value

            },
            addressDetails:{
                address:form.address.value,
                city:form.city.value
            }
        }
        let imageUrl;
      
       if(changedImage[0]){
        
        const imageRef =   ref(storage,`/images/users/${(changedImage[0].name + '_'+  v4())}`)
         
                uploadBytes(imageRef,changedImage[0])
                .then((snapshot)=>{
                    getDownloadURL(imageRef)
                    .then(url=>{
                      imageUrl = url
                      const updatedProfile = {
                        firstName,lastName,
                        photo:imageUrl,
                        about:{
                            aboutSelf,
                            contact
                        }
                      }
                      updateProfile(auth.currentUser,{
                        displayName:firstName + ' ' + lastName,photoURL:url
                     
                      })
                      .then(res=>{
                        AxiosBase().put('/user/profile/update',{email:user.email,updatedProfile})
                        .then(res =>{
                          if(res.data.modifiedCount)
                          {
                              window.location.reload();
                          }

                        })
                        .catch(err=>{

                        })
                      })
                      .catch(err=>{

                      })

                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error.message);
                        reject(error); // Reject the promise with the error
                      });
                })
           
           
        }
        else{
            const updatedProfile = {
                firstName,lastName,
                about:{
                    aboutSelf,
                    contact
                }
              }
              updateProfile(auth.currentUser,{
                displayName:firstName + ' ' + lastName
             
              })
              .then(res=>{
                AxiosBase().put('/user/profile/update',{email:user.email,updatedProfile})
                .then(res =>{
                  if(res.data.modifiedCount)
                  {
                      window.location.reload();
                  }

                })
                .catch(err=>{

                })
              })
              .catch(err=>{

              })

        }

    }
    return (
        <div className='lg:p-5 p-2 font-jost space-y-10'>

            <div className='p-5 bg-white rounded-lg'><h1 className='text-xl font-semibold text-color_text_normal'>Dashboard / Profile</h1></div>
            <div className='p-5 bg-white rounded-lg  shadow-main'>
                <img src="https://griya.dexignzone.com/react/demo/static/media/cover.3b17b4bcd4008640868a.jpg" alt="" className='md:h-[250px] h-[200px]  w-full rounded-xl'/>
                <div className='flex md:flex-row flex-col items-cente gap-5 px-10'>
                    <div>
                        <img src={user?.photoURL || "https://griya.dexignzone.com/react/demo/static/media/profile.99a9e3bfca0a776976ac.png"} alt="" className='w-20 h-20 -mt-8 rounded-full
                        ' />
                       
                    </div>
                    <div className='space-y-1 mt-2'>
                            <h1 className='text-color_primary font-semibold text-xl'>{user?.displayName||'Mitchell C. Shay'}</h1>
                            <h2>{profileDetails?.about?.profession|| 'N/A'}</h2>
                        </div>
                        <div className='mt-2 space-y-1'>
                            <h2 className='text-gray-600 text-xl'>{user?.email}</h2>
                            <h3>Email</h3>
                        </div>
                </div>
            </div>
            <div className='lg:grid grid-cols-6 gap-5 md:space-y-0 space-y-5'>
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
                    {
                        tabIndex === 0 ? 
                        <div className='mt-5 space-y-3'>
                  <div className='space-y-2'>
                  <h1 className=' text-color_primary text-xl font-semibold'>About Me</h1>
                        <p>{
                            profileDetails?.about?.aboutSelf ? profileDetails?.about.aboutSelf :
                            'Write something about yourself from edit tab...'
                            }</p>
                  </div>
                  <div className='space-y-2'>
                  <h1 className=' text-color_primary text-xl font-semibold'>Social</h1>
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
                         profileDetails?.about?.languages?.length ?
                        profileDetails?.about?.languages.map((language,index)=>{
                            return <div className='  hover:bg-color_primary  hover:text-white px-4 py-1 rounded-full text-center hover:cursor-pointer' key={index}>{language}</div>
                        })
                        :
                        'N/A'
                    }
                     </div>
                  </div>
                  <div className='space-y-2'>
                  <h1 className=' text-color_primary text-xl font-semibold'>Personal Information</h1>
                       <div className='space-y-3'>
                        <h1 className='text-black font-semibold'>Email: <span className='text-[12px] text-gray-600'>{profileDetails?.about?.contact?.email||'N/A'}</span></h1>
                        <h1 className='text-black font-semibold'>Phone: <span className='text-[12px] text-gray-600'>{profileDetails?.about?.contact?.phone||'N/A'}</span></h1>
                        <h1 className='text-black font-semibold'>City: <span className='text-[12px] text-gray-600'>{profileDetails?.about?.contact?.addressDetails?.city||'N/A'}</span></h1>
                        <h1 className='text-black font-semibold'>Address: <span className='text-[12px] text-gray-600'>{profileDetails?.about?.contact?.addressDetails?.address||'N/A'}</span></h1>
                        
                       </div>
                  </div>
                    </div>
                    :
                    <form className='mt-5 space-y-3' onSubmit={handleUpdateProfile}>
                        <h1 className='text-xl text-color_text_normal font-semibold'>Edit Profile</h1>
                        <div className='flex items-center gap-3'>
                            <img src={changedImage[1] || user?.photoURL ||"https://griya.dexignzone.com/react/demo/static/media/cover.3b17b4bcd4008640868a.jpg"}  alt="" className='w-20 h-20 rounded-full' />
                            <div className='border-2 border-color_info text-black w-fit py-3 px-6 rounded-lg hover:bg-color_dark hover:text-white hover:cursor-pointer transition-all duration-200 ease-in-out ' onClick={changeImage}>Upload Photo</div>
                            <input type="file" ref={imageInput} className='hidden' onChange={handleChangedImage}/>
                        </div>
                        <div className='space-y-2'>
                            <div className='grid lg:grid-cols-2 gap-5 grid-cols-1'>
                            <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>First Name*</h1>
                        <input type="text" name='firstName' placeholder='Your First Name' defaultValue={profileDetails?.firstName||''}  className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Last Name*</h1>
                        <input type="text" name='lastName' placeholder='Your Last Name' defaultValue={profileDetails?.lastName||''} className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>
                            </div>
                            <div className='grid lg:grid-cols-2 gap-5 grid-cols-1'>
                            <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Contact Email*</h1>
                        <input type="text" name='email' placeholder='x@gmail.com' defaultValue={profileDetails?.about?.contact?.email} className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Phone Number*</h1>
                        <input type="text" name='phone' placeholder='01752765363' defaultValue={profileDetails?.about?.contact?.phone} className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>
                            </div>
                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
                            <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Linkedin*</h1>
                        <input type="url" name='linkedin' placeholder='https://example.com' defaultValue={profileDetails?.about?.contact?.social?.linkedin} className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Facebook*</h1>
                        <input type="url" name='facebook' placeholder='https://example.com' defaultValue={profileDetails?.about?.contact?.social?.facebook} className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>
                            </div>
                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
                            <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Twitter*</h1>
                        <input type="url" name='twitter' placeholder='https://example.com' defaultValue={profileDetails?.about?.contact?.social?.twitter} className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Instagram*</h1>
                        <input type="url" name='instagram' placeholder='https://example.com' defaultValue={profileDetails?.about?.contact?.social?.instagram} className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>
                            </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>About*</h1>
                        <textarea name='aboutSelf' placeholder='Write Something About Your Self' defaultValue={profileDetails?.about?.aboutSelf} className='h-[250px] w-full p-2 border rounded-lg  bg-white outline-color_primary'></textarea>
                        </div>

                        </div>
                        <div className='grid lg:grid-cols-2 gap-5 grid-cols-1'>
                            <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Address*</h1>
                        <input type="text" name='address' placeholder='Your Address' defaultValue={profileDetails?.about?.contact?.addressDetails?.address} className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>City*</h1>
                        <input type="text" name='city' placeholder='Your City Name' defaultValue={profileDetails?.about?.contact?.addressDetails?.city} className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                            
                      
                    </div>

                            </div>
                           <div>
                           <button type='submit' className='px-8 rounded-md py-3 bg-color_primary  text-white'>Save</button>
                        
                           </div>
                    </form>
                    }
                </div>
                <div className=' col-span-2 bg-white p-5 shadow-main rounded-lg  '>
                    <h1 className='text-xl font-semibold text-color_text_normal pb-3'>Latest Listing</h1>
                   <div className='md:space-y-3 lg:max-h-[700px] overflow-y-auto lg:grid-cols-none md:grid-cols-2 grid grid-cols-1 gap-5'>
                   {
                      properties.length-properties.length === 0 ? <div className='py-10'>
                      <h2 className='mt-20 text-xl font-bold text-center'>No Recent Listing</h2></div>:  properties.map((property,index)=><GridCard property={property} key={index}></GridCard>)
                    }
                   </div>
                </div>
                
            </div>
            
         
        </div>
    );
}

export default Profile;
