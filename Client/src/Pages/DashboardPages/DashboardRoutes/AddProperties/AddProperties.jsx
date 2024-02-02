import React, { useRef, useState } from 'react';
import storage from '../../../../Authentication/Firebase/Firebase.storage.config';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid'
import LoadingPart from './LoadingPart';
import AxiosBase from '../../../../Axios/AxiosBase';
import UserAuth from '../../../../Authentication/userAuth/userAuth';
import Swal from 'sweetalert2';

const AddProperties = () => {
    const [amenities,setAmenities] = useState([]);
    const [images,setImages] = useState([]);
    const [selectedLocation,setSelectedLocation] = useState('');
    const [selectedListingIn,setSelectedListingIn] = useState('Sale')
    const imageInput = useRef();
    const {user} = UserAuth();
    const locations = [
        "Tokyo",
        "New York City",
        "London",
        "Paris",
        "Sydney",
        "Dubai",
        "Rio de Janeiro",
        "Delhi",
        "Beijing",
        "Los Angeles"
      ]
      const citiesWithCountries = {
        "Tokyo": "Japan",
        "New York City": "United States",
        "London": "United Kingdom",
        "Paris": "France",
        "Sydney": "Australia",
        "Dubai": "United Arab Emirates",
        "Rio de Janeiro": "Brazil",
        "Delhi": "India",
        "Beijing": "China",
        "Los Angeles": "United States"
      };
      
      const countriesArray = Object.values(citiesWithCountries);
      
   
      
     const propertyTypes = [
        "Apartment",
        "Condos",
        "Denver",
        "Flat",
        "House",
        "Offices",
        "Rental",
        "Studios",
        "Villas"
      ]
      const propertyListingIn = [
        'Sale','Rent'
      ]
      const features =  [
        "Air Conditioning",
        "Alarm System",
        "Car Parking",
        "Central Heating",
        "Free WiFi",
        "Gym",
        "Internet",
        "Laundry Room",
        "Pets Allowed",
        "Spa & Massage",
        "Swimming Pool",
        "Window Covering"
      ]
      const getValue = (e,name)=>{
    
      }
      const handleAmenities = (e)=>{
        const value = e.target.value;
        const array = amenities;
        if(e.target.checked){
            
            array.push(value);
            setAmenities([...array])
        }
        else{
         const index = array.indexOf(value);
         array.splice(index,1)
         setAmenities([...array])
        }
      }
      const rooms = [0,1,2,3,4,5,6,7,8]
      const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const type = form.propertyType.value;
        const listingIn = form.listingIn?.value;
        const rentType = form.rentType?.value || '';
        const rentAmount = parseInt(form.rentAmount?.value)||0;
        const salePrice = parseInt(form.salePrice?.value ) || 0
        const area = parseInt(form.area.value);
        const bedrooms = parseInt(form.bedrooms.value);
        const bathrooms = parseInt(form.bathrooms.value);
        const kitchens = parseInt(form.kitchen.value);
        const garages = parseInt(form.garages.value);
        const garageSize = parseInt(form.garageSize.value);
        const yearBuild = parseInt(form.yearBuild.value);
        const floorNumber = parseInt(form.floorNumber.value);
        const address = form.address.value;
        const country = form.country.value;
        const city = form.city.value;
        const details = {
            propertyType:type,listingIn,area,features:{bedrooms,bathrooms,kitchens,garages,garageSize,},yearBuild,floorNumber,amenities,
            
            address:{
              address,country,city
            },
          
            approveStatus:{
                isApproved:false,
                approve_status:'pending',
                agentEmail: null
            }
            
        
        }
        const propertyStatus = {
            isPause:false,
            listingIn,
            salePrice,
            rentType,
            rentAmount
        }

        const date ={
            time:{
              hour: new Date().getHours(),
              minute: new Date().getMinutes(),
              second: new Date().getSeconds()
            },
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear()
           }
     
         if(images.length < 4){
            return
        }
        document.getElementById('add_property').showModal()
        
        const imageUrls = []
         images.forEach((file)=>{
            const imageRef =   ref(storage,`/images/${(file.name + '_'+  v4())}`)
            const uploadPromise = new Promise ((resolve,reject)=>{
                uploadBytes(imageRef,file)
                .then((snapshot)=>{
                    getDownloadURL(imageRef)
                    .then(imageUrl=>{
                        resolve(imageUrl)
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error.message);
                        reject(error); // Reject the promise with the error
                      });
                })
                .catch(err=>{
                    console.log(err.message)
                })
               
            })
            imageUrls.push(uploadPromise)
            
         })
         Promise.all(imageUrls)
         .then(urls=>{
            const property = {
                userEmail:user.email,title,description,images:[...urls],views:0,details,propertyStatus,date
            }
           AxiosBase().post('/property/add',property)
           .then(res =>{
            if(res.data.insertedId){
                document.getElementById('add_property').close()
                Swal.fire({
                    title: "Added Successfully",
                    text: "Wait for our agent Approve!",
                    icon: "success",
                    iconColor: '#0d6efd',
                    background:'#f3f7fd'
                  });
                  form.reset()
                  setImages([])

            }
           })
           .catch(err =>{
            document.getElementById('add_property').close()
            Swal.fire({
                title: "Error",
                text: "Something went wrong!",
                icon: "error",
                iconColor: '#0d6efd',
                background:'#0c0c0c'
              });
           })
         })
         .catch(err=>{
            document.getElementById('add_property').close()
            Swal.fire({
                title: "Added Successfully",
                text: "Wait for our agent Approve!",
                icon: "success",
                iconColor: '#0d6efd',
                background:'#f3f7fd'
              });
         })
      }

   const handleImage = (e)=>{
//   const imageRef =   ref(storage,`/images/${(e.target.files[0].name + '_'+  v4())}`)
//   console.log(e.target.files[0].name + '_'+  v4(),e.target.files[0].name)
  
//   uploadBytes(imageRef,e.target.files[0])
//   .then(res =>{
//     getDownloadURL(imageRef)
        
//    .then(url=>{
//     console.log(url)
//    })
//    }

//   )
const file = e.target.files[0];
setImages([...images,file])
}
   const openImageInput = () => {
  imageInput.current.click()
   }
  const removeImage = (index)=>{
    const arr = [...images];
    arr.splice(index,1)
    setImages([...arr])
  }
    return (
        <div className='font-jost md:p-5 p-2'>
            <h1 className='lg:text-5xl text-3xl  text-black'>Add New Property</h1>

           <form onSubmit={handleSubmit}>
           <div className='space-y-10 pt-10'>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Overview</h1>
                  <div className='space-y-4 pt-5'>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Property Title*</h1>
                        <input type="text" name='title' placeholder='Your Property Name' className='w-full py-4 border rounded-lg px-2 outline-color_primary' required/>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Description*</h1>
                        <textarea type="text" name='description' placeholder='Write about  property' className='w-full py-4 border rounded-lg px-2 outline-color_primary min-h-[200px]' ></textarea>
                    </div>
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Property Type*</h1>
                        <select type="text" name='propertyType' className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                propertyTypes.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Listing In*</h1>
                        <select type="text" name='listingIn' className='w-full py-4 bg-white border rounded-lg px-2 outline-color_primary' onChange={(e)=>setSelectedListingIn(e.target.value)}>
                        {
                                propertyListingIn.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                 </div>
                 <div className='grid md:grid-cols-2 gap-5'>
            {
                selectedListingIn === 'Rent' &&      <div className='space-y-2'>
                <h1 className='text-black font-semibold'>Rent Type*</h1>
                <select type="text" name='rentType' className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                   <option value="Month">Monthly</option>
                   <option value="Year">Yearly</option>
                   <option value="Week">Weekly</option>
                </select>
            </div>
            }
                {
                    selectedListingIn === 'Rent' ?  <div className='space-y-2'>
                    <h1 className='text-black font-semibold'>Rent Amount*</h1>
                    <input type="text" name='rentAmount' placeholder='Property area size' className='w-full py-4 border rounded-lg px-2 outline-color_primary' required />
                   
                </div>
           
           : 
           <div className='space-y-2'>
           <h1 className='text-black font-semibold'>Sale Price*</h1>
           <input type="text" name='salePrice' placeholder='Price of Property' className='w-full py-4 border rounded-lg px-2 outline-color_primary' required />
          
       </div>
  
                }
                    
                    </div>
                  </div>
                </div>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Property Details</h1>
                  <div className='space-y-4 pt-5'>
               
                    <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Size In Sqft*</h1>
                        <input type="text" name='area' placeholder='Property area size' className='w-full py-4 border rounded-lg px-2 outline-color_primary' required />
                       
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Bedrooms*</h1>
                        <select type="text" name='bedrooms' className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                rooms.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                    
                 </div>
                 
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Bathrooms*</h1>
                        <select type="text" name='bathrooms' className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                rooms.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                       
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Kitchen*</h1>
                        <select type="text" name='kitchen' className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                rooms.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                 </div>
          
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Garages*</h1>
                        <select type="text" name='garages' className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                rooms.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Garage Size*</h1>
                        <input type="text" name='garageSize' className='w-full py-4 bg-white border rounded-lg px-2 outline-color_primary' placeholder='Sqft' required />
                        
                    </div>
                 </div>
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Year Build*</h1>
                        <input type="number" name='yearBuild' placeholder='Property Build Year' className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary' required/>
                            
                      
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Floor Numbers*</h1>
                        <select type="text" name='floorNumber' className='w-full py-4 bg-white border rounded-lg px-2 outline-color_primary' >
                        {
                                rooms.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                 </div>
                  </div>
                </div>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Photo & Video Attachment</h1>
                  <div className='space-y-4 pt-5'>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>File Attachment*</h1>
                        <div   className='w-full py-6 border rounded-lg px-2 outline-color_primary flex items-center gap-2  flex-wrap' >
                            {
                                images.map((image,index)=> <div className='w-fit py-1 px-3 bg-gray-200 rounded-full hover:cursor-pointer' key={index} onDoubleClick={()=>removeImage(index)}>{image.name.slice(0,9)}...</div>)
                            }
                        </div>
                        <input ref={imageInput} type="file" placeholder='Photos' className='w-full hidden py-4 border rounded-lg px-2 outline-color_primary' onChange={handleImage} />

                        <input type="text" placeholder='Video Url' className='w-full py-4 border rounded-lg px-2 outline-color_primary ' />
                        <div className='lg:flex items-center gap-4 pt-3 '>
                            <div className='bg-black text-white py-2 px-6 rounded-md w-fit hover:cursor-pointer' onClick={openImageInput}>+ Upload File</div>
                            <h3>Upload file .jpg, .png, .mp4</h3> <h2 className='text-color_primary'>Image Selected <span className='px-3 py-1 bg-black rounded-full text-white'>{images.length}</span> </h2>
                        </div>
                    </div>
                    
                
                  </div>
                </div>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Select Amenities</h1>
                  <div className='space-y-4 pt-5'>
                    <div className='grid md:grid-cols-4 grid-cols-2 gap-3'>
                    {
                        features.map((feature,index)=>{
                           return <div key={index} >
                            <div className={`py-3 flex  items-center gap-2  font-semibold `}
                       >
                               <input type="checkbox" value={feature} className='accent-color_dark w-4 h-4' onChange={handleAmenities}/>  <h2>{feature}</h2>
                            </div>
                           </div>
                        })
                    }
                    </div>
                    
                
                  </div>
                </div>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Address & Locations</h1>
                  <div className='space-y-4 pt-5'>
               
                    <div className=''>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Address*</h1>
                        <input type="text" name='address' placeholder='Property Address' className='w-full py-4 border rounded-lg px-2 outline-color_primary' required />
                       
                    </div>
                    
                 </div>
                 
              
                 
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Country*</h1>
                        <input type="text"  readOnly value={citiesWithCountries[selectedLocation]|| 'Select City'} name='country' className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'/>
                           
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>City*</h1>
                        <select type="text" name='city' className='w-full py-4 bg-white border rounded-lg px-2 outline-color_primary'  onChange={(e)=>setSelectedLocation(e.target.value)}>
                        {
                                locations.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                 </div>
                  </div>
                </div>

                <button type='submit' className='px-6 py-3 bg-color_primary text-white rounded-md'>Submit Property</button> <button>Cancel</button>
            </div>
    
           </form>
            <LoadingPart></LoadingPart>
        </div>
    );
}

export default AddProperties;
